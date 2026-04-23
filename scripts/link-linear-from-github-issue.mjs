#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const LINEAR_GRAPHQL_ENDPOINT =
  process.env.LINEAR_GRAPHQL_ENDPOINT || "https://api.linear.app/graphql";
const GITHUB_API_URL = process.env.GITHUB_API_URL || "https://api.github.com";

export const GENERATED_BLOCK_START = "<!-- linear-pr-linker:start -->";
export const GENERATED_BLOCK_END = "<!-- linear-pr-linker:end -->";

const LINEAR_MAGIC_WORDS = [
  "contributes to",
  "related to",
  "part of",
  "references",
  "complete",
  "completes",
  "completed",
  "completing",
  "implements",
  "implemented",
  "implementing",
  "resolves",
  "resolved",
  "resolving",
  "resolve",
  "closing",
  "closes",
  "closed",
  "close",
  "fixes",
  "fixed",
  "fixing",
  "fix",
  "towards",
  "toward",
  "refs",
  "ref",
];

const OWNER_REPO = String.raw`([A-Za-z0-9_.-]+)\/([A-Za-z0-9_.-]+)`;
const ISSUE_REF_RE = new RegExp(
  [
    String.raw`https:\/\/github\.com\/${OWNER_REPO}\/issues\/(\d+)`,
    String.raw`${OWNER_REPO}#(\d+)`,
    String.raw`#(\d+)`,
  ].join("|"),
  "gi",
);

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function sameRepo(leftOwner, leftRepo, rightOwner, rightRepo) {
  return (
    leftOwner.toLowerCase() === rightOwner.toLowerCase() &&
    leftRepo.toLowerCase() === rightRepo.toLowerCase()
  );
}

function issueUrl(owner, repo, number) {
  return `https://github.com/${owner}/${repo}/issues/${number}`;
}

export function extractGitHubIssueUrls(text, defaultOwner, defaultRepo) {
  const words = LINEAR_MAGIC_WORDS.map(escapeRegExp).join("|");
  const keywordRe = new RegExp(
    String.raw`(?:^|[\s(])(?:${words})\b\s+([^\n\r]+)`,
    "gi",
  );
  const urls = new Map();

  for (const keywordMatch of text.matchAll(keywordRe)) {
    const lineRemainder = keywordMatch[1];

    for (const issueMatch of lineRemainder.matchAll(ISSUE_REF_RE)) {
      let owner = defaultOwner;
      let repo = defaultRepo;
      let number = issueMatch[7];

      if (issueMatch[1] && issueMatch[2] && issueMatch[3]) {
        owner = issueMatch[1];
        repo = issueMatch[2];
        number = issueMatch[3];
      } else if (issueMatch[4] && issueMatch[5] && issueMatch[6]) {
        owner = issueMatch[4];
        repo = issueMatch[5];
        number = issueMatch[6];
      }

      if (!sameRepo(owner, repo, defaultOwner, defaultRepo)) {
        continue;
      }

      urls.set(issueUrl(defaultOwner, defaultRepo, number), {
        owner: defaultOwner,
        repo: defaultRepo,
        number,
      });
    }
  }

  return [...urls.values()];
}

export function removeGeneratedBlock(body) {
  const blockRe = new RegExp(
    String.raw`\n*${escapeRegExp(GENERATED_BLOCK_START)}[\s\S]*?${escapeRegExp(
      GENERATED_BLOCK_END,
    )}\n*`,
    "g",
  );

  return body.replace(blockRe, "\n").trimEnd();
}

export function updatePullRequestBody(originalBody, linearIssueIdentifiers) {
  const uniqueIdentifiers = [...new Set(linearIssueIdentifiers)].sort();
  const bodyWithoutGeneratedBlock = removeGeneratedBlock(originalBody || "");
  const missingIdentifiers = uniqueIdentifiers.filter((identifier) => {
    const idRe = new RegExp(
      String.raw`(^|[^A-Z0-9-])${escapeRegExp(identifier)}\b`,
    );
    return !idRe.test(bodyWithoutGeneratedBlock);
  });

  if (missingIdentifiers.length === 0) {
    return bodyWithoutGeneratedBlock;
  }

  const refsLine = `Refs ${missingIdentifiers.join(", ")}`;
  const generatedBlock = [
    GENERATED_BLOCK_START,
    refsLine,
    GENERATED_BLOCK_END,
  ].join("\n");

  if (!bodyWithoutGeneratedBlock.trim()) {
    return generatedBlock;
  }

  return `${bodyWithoutGeneratedBlock.trimEnd()}\n\n${generatedBlock}`;
}

async function linearGraphql(query, variables) {
  const token = process.env.LINEAR_API_KEY || process.env.LINEAR_ACCESS_TOKEN;
  if (!token) {
    throw new Error("Missing LINEAR_API_KEY secret.");
  }

  const authorization =
    process.env.LINEAR_AUTH_SCHEME === "bearer" && !/^Bearer\s+/i.test(token)
      ? `Bearer ${token}`
      : token;

  const response = await fetch(LINEAR_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `Linear API request failed with HTTP ${response.status}: ${JSON.stringify(
        payload,
      )}`,
    );
  }

  if (payload.errors?.length) {
    throw new Error(`Linear API returned errors: ${JSON.stringify(payload.errors)}`);
  }

  return payload.data;
}

async function githubRequest(path, options = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("Missing GITHUB_TOKEN.");
  }

  const response = await fetch(`${GITHUB_API_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": "linear-pr-linker",
      "X-GitHub-Api-Version": "2022-11-28",
      ...options.headers,
    },
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(
      `GitHub API request failed with HTTP ${response.status}: ${JSON.stringify(
        payload,
      )}`,
    );
  }

  return payload;
}

async function findLinearIssuesForGitHubIssueUrl(url) {
  const query = `
    query AttachmentsForURL($url: String!) {
      attachmentsForURL(url: $url) {
        nodes {
          id
          issue {
            id
            identifier
            title
          }
        }
      }
    }
  `;

  const data = await linearGraphql(query, { url });
  return data.attachmentsForURL.nodes
    .map((attachment) => attachment.issue)
    .filter(Boolean);
}

async function main() {
  if (!process.env.GITHUB_EVENT_PATH) {
    throw new Error("Missing GITHUB_EVENT_PATH.");
  }

  const event = JSON.parse(await readFile(process.env.GITHUB_EVENT_PATH, "utf8"));
  const pr = event.pull_request;
  const repository = event.repository;

  if (!pr || !repository) {
    console.log("No pull_request payload found; nothing to do.");
    return;
  }

  const [owner, repo] = repository.full_name.split("/");
  const searchText = [pr.title || "", pr.body || ""].join("\n");
  const githubIssueRefs = extractGitHubIssueUrls(searchText, owner, repo);

  if (githubIssueRefs.length === 0) {
    console.log("No GitHub issue references found after recognized magic words.");
    return;
  }

  console.log(
    `Found GitHub issue references: ${githubIssueRefs
      .map((issue) => `#${issue.number}`)
      .join(", ")}`,
  );

  const identifiers = new Set();
  for (const issueRef of githubIssueRefs) {
    const url = issueUrl(issueRef.owner, issueRef.repo, issueRef.number);
    console.log(`Looking up Linear attachment for ${url}`);
    const linearIssues = await findLinearIssuesForGitHubIssueUrl(url);

    for (const issue of linearIssues) {
      if (issue.identifier) {
        identifiers.add(issue.identifier);
        console.log(`Matched ${url} to ${issue.identifier}: ${issue.title}`);
      }
    }
  }

  if (identifiers.size === 0) {
    console.log("No synced Linear issues found for the referenced GitHub issues.");
    return;
  }

  const updatedBody = updatePullRequestBody(pr.body || "", identifiers);
  if (updatedBody === (pr.body || "")) {
    console.log("PR body already contains the matching Linear issue references.");
    return;
  }

  if (process.env.DRY_RUN === "true") {
    console.log("DRY_RUN=true; would update PR body to:");
    console.log(updatedBody);
    return;
  }

  await githubRequest(`/repos/${owner}/${repo}/pulls/${pr.number}`, {
    method: "PATCH",
    body: JSON.stringify({ body: updatedBody }),
  });

  console.log(
    `Updated PR #${pr.number} with Linear reference(s): ${[...identifiers].join(
      ", ",
    )}`,
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
