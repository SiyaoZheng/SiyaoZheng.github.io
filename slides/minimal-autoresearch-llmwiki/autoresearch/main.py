"""Minimal local Auto Research runner."""

from __future__ import annotations

import argparse
import csv
import json
import random
from datetime import datetime, timezone
from pathlib import Path

from prepare import BASELINE_SCORE, METRIC_NAME, RANDOM_SEED, SUBSTRATE
from train import run_train


def parse_args():
  parser = argparse.ArgumentParser()
  parser.add_argument("--iterations", type=int, default=20, help="number of experiments")
  parser.add_argument("--seed", type=int, default=RANDOM_SEED, help="rng seed")
  parser.add_argument("--out", type=Path, default=Path("runs"), help="output directory")
  parser.add_argument("--sleep", action="store_true", help="sleep for each training run")
  parser.add_argument("--jsonl", default="progress.jsonl", help="jsonl output file")
  return parser.parse_args()


def propose_patch(rng: random.Random) -> dict[str, float]:
  return {
    "lr": round(rng.uniform(0.002, 0.020), 4),
    "temperature": round(rng.uniform(0.30, 1.20), 2),
    "dropout": round(rng.uniform(0.00, 0.35), 3),
    "optimizer": rng.choice(["adamw", "sgd", "lion"]),
  }


def main():
  args = parse_args()
  rng = random.Random(args.seed)
  out_dir = args.out
  out_dir.mkdir(parents=True, exist_ok=True)

  jsonl_path = out_dir / args.jsonl
  csv_path = out_dir / "progress.csv"
  state_path = out_dir / "best.json"

  best_score = BASELINE_SCORE
  best_patch = {"name": "baseline"}

  csv_rows = []

  print("== run start ==")
  print(f"metric: {METRIC_NAME} (lower is better)")
  print(f"substrate: {json.dumps(SUBSTRATE, ensure_ascii=False)}")

  with jsonl_path.open("w", encoding="utf-8") as fjsonl:
    for i in range(1, args.iterations + 1):
      patch = propose_patch(rng)
      if not args.sleep:
        # keep fast by default; still keeps realistic metadata
        pass
      score, meta = run_train(i, patch)
      decision = "keep" if score < best_score else "discard"
      if decision == "keep":
        best_score = score
        best_patch = patch.copy()

      row = {
        "iter": i,
        "patch_id": f"exp-{i:03d}",
        "score": score,
        "decision": decision,
        "best_score": best_score,
      }
      row.update(meta)

      fjsonl.write(json.dumps(row, ensure_ascii=False) + "\n")
      csv_rows.append(row)
      print(
        f"[{i:02d}] score={score:.4f} decision={decision:7} "
        f"best={best_score:.4f} patch={patch}"
      )

  with csv_path.open("w", newline="", encoding="utf-8") as fcsv:
    writer = csv.DictWriter(fcsv, fieldnames=csv_rows[0].keys())
    writer.writeheader()
    writer.writerows(csv_rows)

  state = {
    "updated_at": datetime.now(timezone.utc).isoformat(),
    "best_score": best_score,
    "best_patch": best_patch,
    "total_experiments": args.iterations,
  }
  state_path.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

  print("== done ==")
  print(f"jsonl: {jsonl_path}")
  print(f"csv: {csv_path}")
  print(f"best: {state_path}")


if __name__ == "__main__":
  main()

