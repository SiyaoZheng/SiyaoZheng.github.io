import assert from "node:assert/strict";
import { test } from "node:test";

import {
  extractGitHubIssueUrls,
  GENERATED_BLOCK_END,
  GENERATED_BLOCK_START,
  removeGeneratedBlock,
  updatePullRequestBody,
} from "./link-linear-from-github-issue.mjs";

test("extracts same-repo issue references after magic words", () => {
  const refs = extractGitHubIssueUrls(
    "Fixes #123, refs acme/widgets#456 and related to https://github.com/acme/widgets/issues/789",
    "acme",
    "widgets",
  );

  assert.deepEqual(
    refs.map((ref) => ref.number),
    ["123", "456", "789"],
  );
});

test("ignores cross-repo issue references", () => {
  const refs = extractGitHubIssueUrls(
    "Fixes acme/other#123 and https://github.com/acme/other/issues/456",
    "acme",
    "widgets",
  );

  assert.deepEqual(refs, []);
});

test("does not extract bare issue mentions without magic words", () => {
  const refs = extractGitHubIssueUrls("See #123 for context", "acme", "widgets");

  assert.deepEqual(refs, []);
});

test("appends a generated refs block", () => {
  const updated = updatePullRequestBody("Existing body", ["ENG-123"]);

  assert.equal(
    updated,
    [
      "Existing body",
      "",
      GENERATED_BLOCK_START,
      "Refs ENG-123",
      GENERATED_BLOCK_END,
    ].join("\n"),
  );
});

test("keeps updates idempotent", () => {
  const body = [
    "Existing body",
    "",
    GENERATED_BLOCK_START,
    "Refs ENG-123",
    GENERATED_BLOCK_END,
  ].join("\n");

  assert.equal(updatePullRequestBody(body, ["ENG-123"]), body);
});

test("does not duplicate user-authored Linear references", () => {
  assert.equal(
    updatePullRequestBody("Already has refs ENG-123", ["ENG-123"]),
    "Already has refs ENG-123",
  );
});

test("replaces a stale generated refs block", () => {
  const body = [
    "Existing body",
    "",
    GENERATED_BLOCK_START,
    "Refs ENG-123",
    GENERATED_BLOCK_END,
  ].join("\n");

  assert.equal(
    updatePullRequestBody(body, ["ENG-456"]),
    [
      "Existing body",
      "",
      GENERATED_BLOCK_START,
      "Refs ENG-456",
      GENERATED_BLOCK_END,
    ].join("\n"),
  );
});

test("removes only the generated block", () => {
  const body = [
    "Top",
    "",
    GENERATED_BLOCK_START,
    "Refs ENG-123",
    GENERATED_BLOCK_END,
    "",
    "Bottom",
  ].join("\n");

  assert.equal(removeGeneratedBlock(body), "Top\nBottom");
});
