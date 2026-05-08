# AGENTS.md

Project instructions for Adrian's personal website.

## Scope

- Keep changes focused on the requested website task.
- Preserve the existing static-site structure unless Adrian asks for a broader refactor.
- Do not add Claude memory, plugin, or session-context blocks to this file.

## Visual System

The site is **Editorial × Tech-utility** — Monocle / NYT Magazine for content
type, Karpathy / Datadog for metadata density. Confirmed direction (May 2026).

### Typography — three fonts, two strict roles

| Role | Font | Used for |
|---|---|---|
| Serif (content) | `Noto Serif SC` (CN) · `Source Serif 4` (EN) | Name, lede, section titles, pub titles, course names, CV roles |
| Mono (metadata) | `JetBrains Mono` | Section numbers (`01`/`02`), years, `L01`–`L09`, eyebrow tags, ribbon, course meta, contact labels, footer |

Weights: display 900 · sec-title 700 · pub-title 500 · body 400.
Body line-height 1.85. Letter-spacing 0.01em body / 0.03em large display.

**Never** sans-serif as primary content type. Mono is the only "non-serif" allowed, and only on metadata/data labels.

EN pages still load `Noto Serif SC` for inline Chinese citations (e.g. `《政治学研究》`); don't strip it from the EN font stack.

### Color tokens

```css
--bg:      #ffffff;     /* never cream/ivory */
--fg:      #0a0a0a;
--ink:     #1a1a1a;
--muted:   #6b6b6b;
--faint:   #9a9a9a;
--rule:    #e6e6e6;
--rule-2:  #c8c8c8;
--accent:  #1e3a8a;     /* deep cobalt */
--accent-h:#0f1e4d;
```

Single accent — links and `::selection` only. Never as background fill or section divider.

### Layout

- Single column, 680px measure, centered.
- 1px `--rule` hairline borders only. **No shadows. No rounded cards** (radius 0).
- Section pattern: `border-top` + 4ch mono section number + serif title + mono subhead.
- Pub list: 4ch year column + body column. Pub link is the venue title itself, inline (no chip pills).
- CV list: 9ch year column + body column.
- Lecture list: 4ch `LXX` mono number + serif title (the title is the link).

### Anti-slop checklist

These are bugs in this project, even if they're AI-default elsewhere:

- ❌ Purple / violet gradients (was the old blog accent)
- ❌ Rounded cards with a left-border colour accent
- ❌ Drop shadows of any opacity
- ❌ Ivory / cream backgrounds (academic trope)
- ❌ Emoji icons (🚀 ✨ 🎯 …)
- ❌ Sans-serif body text
- ❌ Pub-link "chip pills" — `[页面] [Publisher] [仓库]` pattern
- ❌ Invented metrics ("10× faster", "99.9% uptime")

## Structure

```
index.html              CN root
en/index.html           EN root
blog/                   CN blog landing + posts
en/blog/                EN blog landing + posts
slides/lectureXX/       External generator (Quarto/RevealJS)
```

The EN root mirrors the CN root. Both blog roots mirror.

## Path discipline

All internal links use **relative paths** — `blog/`, `../`, `index.html`. Never absolute (`/blog/`, `/en/`). Absolute paths break the OD design-tool preview pane.

## Bilingual visibility

EN visibility is gated. When the EN site is hidden from CN navigation, the
following are commented (not deleted):

- ribbon `EN` link in CN pages
- footer `English` link in CN pages
- `<link rel="alternate" hreflang="en">` in CN `<head>`

To re-enable, uncomment all three. EN pages themselves are left intact.

## ICP / 备案 footer

The site is hosted on Aliyun ECS (PRC mainland), so MIIT ICP filing is mandatory and must appear on **every** public page — including blog post pages, not just landings.

Current state:

- **MIIT ICP**: `沪ICP备2026018408号-1` (the `-1` suffix is required from first filing per 信息产业部令第33号; bare `沪ICP备2026018408号` without `-1` is non-compliant).
- Linked to `https://beian.miit.gov.cn/` with `target="_blank" rel="noopener noreferrer"`.
- 公安备案: **pending review**. The site is intentionally deployed in this gap because 公安部 审核 needs a live URL. When the 14-digit 公安备案号 issues, add the 警徽 SVG/PNG + number linking to `https://beian.mps.gov.cn/` to every footer.

Edit footers directly in markup. **Do not** introduce a build-time script for this — the previous `scripts/add_icp_footer.py` was deleted because its templates always drift behind the actual footer markup whenever the design changes.

## Other defaults

- Email is obfuscated by an inline JS scriptlet in the contact section. Don't flatten to plaintext.
- Plausible analytics only (`siyaozheng.org`). No Google Analytics, no other trackers.
- Verify paths and existing assets before editing.

## Commands

- Use `python3`, not `python`, for local scripts.
- Run `python3 scripts/check_site.py` before deploying static-site changes.


<claude-mem-context>
# Memory Context

# [website] recent context, 2026-04-23 7:39pm GMT+8

No previous sessions found.
</claude-mem-context>
