"""Minimal LLM Wiki ingestion workflow."""

from __future__ import annotations

import argparse
import re
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path


STOPWORDS = {
  "the", "and", "that", "with", "from", "this", "which", "would", "could", "have",
  "there", "their", "were", "been", "about", "these", "those", "then", "than", "them",
  "when", "where", "what", "will", "your", "also", "but", "into", "our", "for", "and",
}


def parse_args():
  p = argparse.ArgumentParser()
  p.add_argument("--workspace", type=Path, default=Path("."))
  p.add_argument("--source", nargs="+", type=Path, required=True)
  return p.parse_args()


def slugify(text: str) -> str:
  text = text.strip().lower().replace("'", "")
  text = re.sub(r"[^a-z0-9一-鿿]+", "-", text)
  return re.sub(r"-+", "-", text).strip("-")


def extract_entities(text: str, top_n: int = 6) -> list[str]:
  candidates = re.findall(r"[A-Z][A-Za-z][A-Za-z0-9_-]+", text)
  items = [c for c in candidates if len(c) > 3 and c.lower() not in STOPWORDS]
  return [x for x, _ in Counter(items).most_common(top_n)]


def extract_concepts(text: str, top_n: int = 6) -> list[str]:
  words = re.findall(r"[a-zA-Z][a-zA-Z0-9_-]{2,}", text.lower())
  keywords = [
    w for w in words
    if len(w) > 4 and w not in STOPWORDS and w not in {"this", "that", "with", "from", "from", "will"}
  ]
  common = Counter(keywords).most_common(top_n * 2)
  selected = []
  for w, _ in common:
    if w not in selected:
      selected.append(w)
    if len(selected) >= top_n:
      break
  return selected


def write_if_changed(path: Path, content: str) -> None:
  path.parent.mkdir(parents=True, exist_ok=True)
  previous = path.read_text(encoding="utf-8") if path.exists() else ""
  if previous != content:
    path.write_text(content, encoding="utf-8")


def write_source_page(workspace: Path, source_path: Path, text: str, entities: list[str], concepts: list[str]) -> str:
  stem = slugify(source_path.stem) or "source"
  out = workspace / "sources" / f"{stem}.md"
  excerpt = "\n".join(text.strip().splitlines()[:10])
  entities_lines = "\n".join([f"- {x}" for x in entities]) if entities else "- (empty)"
  concepts_lines = "\n".join([f"- {x}" for x in concepts]) if concepts else "- (empty)"
  content = f"""# Source: {source_path.name}\n\n**ingested_at:** {datetime.now(timezone.utc).isoformat()}\n\n## excerpt\n\n{excerpt}\n\n## entities\n\n{entities_lines}\n\n## concepts\n\n{concepts_lines}\n"""
  write_if_changed(out, content)
  return out.name


def touch_related_page(directory: Path, title: str, source_file: str, section_name: str, detail: str) -> Path:
  page_name = f"{slugify(title)}.md"
  page_path = directory / page_name
  heading = title if title else "unnamed"
  if page_path.exists():
    body = page_path.read_text(encoding="utf-8")
    if source_file in body:
      return page_path
    body = body.rstrip() + f"\n- linked: {source_file}\n"
    body += f"- update: {detail}\n"
    page_path.write_text(body + "\n", encoding="utf-8")
    return page_path

  body = f"""# {heading}\n\n## definitions\n\nTBD\n\n## updates\n\n- linked: {source_file}\n- update: {detail}\n"""
  page_path.write_text(body, encoding="utf-8")
  return page_path


def update_index(workspace: Path) -> None:
  source_dir = workspace / "sources"
  files = sorted([p for p in source_dir.glob("*.md")])
  lines = ["# mini-llmwiki index", "", "|source page|updated|", "|---|---|"]
  for file in files:
    content = file.read_text(encoding="utf-8")
    updated = "unknown"
    for line in content.splitlines():
      if line.startswith("**ingested_at:**"):
        updated = line.replace("**ingested_at:**", "").strip()
    lines.append(f"|[{file.name}](sources/{file.name})|{updated}|")
  (workspace / "index.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def update_log(workspace: Path, source_file: str, touched: list[str]) -> None:
  log = workspace / "log.md"
  now = datetime.now(timezone.utc).isoformat(timespec="seconds")
  item = f"- {now} | ingest {source_file} | pages: {', '.join(touched)}\n"
  if log.exists():
    log.write_text(log.read_text(encoding="utf-8") + item, encoding="utf-8")
  else:
    log.write_text("# mini-llmwiki log\n\n" + item, encoding="utf-8")


def main():
  args = parse_args()
  workspace = args.workspace.expanduser().resolve()

  touched_pages = []
  for source in args.source:
    p = source if source.is_absolute() else workspace / source
    text = p.read_text(encoding="utf-8")
    entities = extract_entities(text)
    concepts = extract_concepts(text)

    source_page = write_source_page(workspace, p, text, entities, concepts)
    touched_pages.append(f"sources/{source_page}")

    for ent in entities:
      touched_pages.append(str(
        touch_related_page(workspace / "entities", ent, source_page, ent, "entity mention in source")
      ).replace(str(workspace) + "/", ""))

    for c in concepts:
      touched_pages.append(str(
        touch_related_page(workspace / "concepts", c, source_page, c, "mentioned term update")
      ).replace(str(workspace) + "/", ""))

    topic_title = source.stem.replace("_", " ").title()
    touched_pages.append(str(
      touch_related_page(workspace / "topics", f"Topic: {topic_title}", source_page, topic_title, "aggregated topic map")
    ).replace(str(workspace) + "/", ""))

  update_index(workspace)
  touched_pages.append("index.md")
  update_log(workspace, ", ".join(str(s) for s in args.source), touched_pages)
  print("ingest complete")
  print("touched: " + ", ".join(touched_pages))


if __name__ == "__main__":
  main()
