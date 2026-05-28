"""Mini Auto Research training step simulation."""

from __future__ import annotations

import hashlib
import random
import time

from prepare import BASELINE_SCORE, TRAIN_BUDGET_SECONDS


def _score_from_patch(patch: dict[str, float]) -> float:
    """Map a patch proposal into expected improvement."""
    lr = patch["lr"]
    dropout = patch["dropout"]
    temperature = patch["temperature"]

    # Hand-tuned toy inductive biases:
    # - learning-rate around 0.010
    # - temperature around 0.8
    # - lower dropout is often a little better in this toy setup
    lr_gain = max(0, 0.12 - abs(lr - 0.010))
    temp_gain = max(0, 0.25 - abs(temperature - 0.80)) * 1.2
    dropout_penalty = max(0, dropout - 0.20) * 1.2

    return lr_gain + temp_gain - dropout_penalty


def run_train(patch_id: int, patch: dict[str, float], budget: float = TRAIN_BUDGET_SECONDS) -> tuple[float, dict]:
    """Execute one mini training run and return a score and metadata."""
    # Tiny deterministic jitter so repeated runs are stable.
    patch_key = str(patch).encode("utf-8")
    rng = random.Random(int(hashlib.sha1(patch_key).hexdigest()[:8], 16))

    start = time.time()
    simulated_seconds = min(budget, 0.12)
    time.sleep(simulated_seconds)

    expected_gain = _score_from_patch(patch)
    noise = rng.uniform(-0.25, 0.15)
    score = BASELINE_SCORE - expected_gain - noise
    score = max(0.08, round(score, 4))

    meta = {
      "patch_id": patch_id,
      "runtime_seconds": round(time.time() - start, 4),
      "expected_gain": round(expected_gain, 4),
      "noise": round(noise, 4),
    }
    return score, meta

