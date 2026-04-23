#!/usr/bin/env python3
"""Lightweight static-site checks for the GitHub Pages deployment."""

from __future__ import annotations

import json
import posixpath
import re
import subprocess
import sys
import urllib.parse
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REQUIRED_FILES = ("index.html", "CNAME", "robots.txt", "sitemap.xml", ".nojekyll")
SKIP_SCHEMES = ("http", "https", "mailto", "tel", "javascript", "data", "blob")


class LinkCollector(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.links: list[tuple[str, str]] = []
        self.refresh_urls: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = {name.lower(): value for name, value in attrs if value is not None}
        for attr in ("href", "src"):
            value = attr_map.get(attr)
            if value:
                self.links.append((attr, value))

        if tag.lower() == "meta" and attr_map.get("http-equiv", "").lower() == "refresh":
            match = re.search(r"url\s*=\s*([^;]+)", attr_map.get("content", ""), re.I)
            if match:
                self.refresh_urls.append(match.group(1).strip("'\" "))


def deployable_files() -> set[str]:
    result = subprocess.run(
        ["git", "ls-files", "--cached", "--others", "--exclude-standard", "-z"],
        cwd=ROOT,
        check=True,
        capture_output=True,
    )
    files = result.stdout.decode("utf-8").split("\0")
    return {path for path in files if path}


def fail(message: str, errors: list[str]) -> None:
    errors.append(message)


def normalize_target(base_file: str, raw_url: str) -> str | None:
    parsed = urllib.parse.urlsplit(raw_url.strip())
    if parsed.scheme.lower() in SKIP_SCHEMES:
        return None
    if parsed.netloc:
        return None
    if not parsed.path:
        return None

    path = urllib.parse.unquote(parsed.path)
    if path.startswith("/"):
        candidate = path.lstrip("/")
    else:
        candidate = posixpath.join(posixpath.dirname(base_file), path)

    normalized = posixpath.normpath(candidate)
    if normalized == ".":
        return "index.html"
    if normalized.startswith("../"):
        return normalized
    return normalized


def target_exists(target: str, files: set[str]) -> bool:
    target = target.rstrip("/")
    candidates = [target]
    if not target or target.endswith("/"):
        candidates.append(posixpath.join(target, "index.html"))
    elif "." not in posixpath.basename(target):
        candidates.append(posixpath.join(target, "index.html"))

    return any(candidate in files for candidate in candidates)


def check_required_files(files: set[str], errors: list[str]) -> None:
    for path in REQUIRED_FILES:
        if path not in files:
            fail(f"Missing required deployment file: {path}", errors)


def check_json(files: set[str], errors: list[str]) -> None:
    for path in sorted(p for p in files if p.endswith(".json")):
        try:
            json.loads((ROOT / path).read_text(encoding="utf-8"))
        except Exception as exc:  # noqa: BLE001 - report the exact parse failure.
            fail(f"Invalid JSON in {path}: {exc}", errors)


def check_html_links(files: set[str], errors: list[str]) -> None:
    html_files = sorted(path for path in files if path.endswith(".html"))
    for path in html_files:
        parser = LinkCollector()
        try:
            parser.feed((ROOT / path).read_text(encoding="utf-8"))
        except Exception as exc:  # noqa: BLE001 - HTMLParser should not stop CI silently.
            fail(f"Could not parse HTML in {path}: {exc}", errors)
            continue

        urls = [url for _, url in parser.links] + parser.refresh_urls
        for url in urls:
            target = normalize_target(path, url)
            if target is None:
                continue
            if target.startswith("../"):
                fail(f"{path} links outside the site root: {url}", errors)
            elif not target_exists(target, files):
                fail(f"{path} links to missing local target: {url} -> {target}", errors)


def check_sitemap_and_robots(errors: list[str]) -> None:
    cname = (ROOT / "CNAME").read_text(encoding="utf-8").strip()
    expected_origin = f"https://{cname}"
    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    expected_sitemap = f"Sitemap: {expected_origin}/sitemap.xml"

    if expected_sitemap not in robots:
        fail(f"robots.txt must contain '{expected_sitemap}'", errors)

    try:
        root = ET.parse(ROOT / "sitemap.xml").getroot()
    except ET.ParseError as exc:
        fail(f"Invalid sitemap.xml: {exc}", errors)
        return

    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    locations = [node.text or "" for node in root.findall(".//sm:loc", namespace)]
    if not locations:
        fail("sitemap.xml does not contain any <loc> entries", errors)

    for loc in locations:
        if not loc.startswith(expected_origin):
            fail(f"sitemap.xml loc does not match CNAME domain: {loc}", errors)


def main() -> int:
    errors: list[str] = []
    files = deployable_files()

    check_required_files(files, errors)
    check_json(files, errors)
    check_html_links(files, errors)
    check_sitemap_and_robots(errors)

    if errors:
        print("Static site checks failed:")
        for error in errors:
            print(f"- {error}")
        return 1

    print(f"Static site checks passed for {len(files)} deployable files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
