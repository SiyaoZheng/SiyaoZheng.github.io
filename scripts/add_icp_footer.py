#!/usr/bin/env python3
"""Add or update the MIIT ICP filing link in the static-site footers."""

from __future__ import annotations

import argparse
import sys
from dataclasses import dataclass
from html import escape
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
MIIT_URL = "https://beian.miit.gov.cn/"


@dataclass(frozen=True)
class FooterPatch:
    path: str
    current: str
    template: str

    def replacement(self, icp_link: str) -> str:
        return self.template.format(icp_link=icp_link)


PATCHES = (
    FooterPatch(
        path="index.html",
        current='            <p>&copy; 2026 郑思尧 · <a href="/en/">English</a></p>',
        template=(
            '            <p>&copy; 2026 郑思尧 · <a href="/en/">English</a>'
            " · {icp_link}</p>"
        ),
    ),
    FooterPatch(
        path="blog/index.html",
        current=(
            '        <p>&copy; 2026 郑思尧 &middot; <a href="/">首页</a>'
            ' &middot; <a class="lang-switch" href="/en/blog/">English</a></p>'
        ),
        template=(
            '        <p>&copy; 2026 郑思尧 &middot; <a href="/">首页</a>'
            ' &middot; <a class="lang-switch" href="/en/blog/">English</a>'
            " &middot; {icp_link}</p>"
        ),
    ),
    FooterPatch(
        path="en/index.html",
        current='            <p>&copy; 2026 Siyao Zheng &middot; <a href="/">中文</a></p>',
        template=(
            '            <p>&copy; 2026 Siyao Zheng &middot; <a href="/">中文</a>'
            " &middot; {icp_link}</p>"
        ),
    ),
    FooterPatch(
        path="en/blog/index.html",
        current=(
            '        <p>&copy; 2026 Siyao Zheng &middot; <a href="/en/">Home</a>'
            ' &middot; <a href="/">中文</a></p>'
        ),
        template=(
            '        <p>&copy; 2026 Siyao Zheng &middot; <a href="/en/">Home</a>'
            ' &middot; <a href="/">中文</a> &middot; {icp_link}</p>'
        ),
    ),
)


def build_icp_link(icp_number: str) -> str:
    value = icp_number.strip()
    if not value:
        raise ValueError("ICP number cannot be empty.")
    if "<" in value or ">" in value:
        raise ValueError("ICP number must be plain text, not HTML.")
    return (
        f'<a href="{MIIT_URL}" target="_blank" rel="noopener noreferrer">'
        f"{escape(value, quote=False)}</a>"
    )


def apply_patch(patch: FooterPatch, icp_link: str, dry_run: bool) -> bool:
    file_path = ROOT / patch.path
    text = file_path.read_text(encoding="utf-8")

    replacement = patch.replacement(icp_link)
    if replacement in text:
        print(f"unchanged: {patch.path}")
        return False

    if patch.current not in text:
        raise RuntimeError(f"Expected footer not found in {patch.path}")

    if dry_run:
        print(f"would update: {patch.path}")
        return True

    file_path.write_text(text.replace(patch.current, replacement, 1), encoding="utf-8")
    print(f"updated: {patch.path}")
    return True


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Add or update the ICP filing link in all public footers."
    )
    parser.add_argument("--icp-number", required=True, help="Plain-text ICP filing number.")
    parser.add_argument("--dry-run", action="store_true", help="Show intended edits only.")
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    try:
        icp_link = build_icp_link(args.icp_number)
        changed = [apply_patch(patch, icp_link, args.dry_run) for patch in PATCHES]
    except Exception as exc:  # noqa: BLE001 - surface exact operational failure.
        print(f"ICP footer update failed: {exc}", file=sys.stderr)
        return 1

    if not any(changed):
        print("No footer changes needed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
