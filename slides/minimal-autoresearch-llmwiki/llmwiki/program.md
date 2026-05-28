# LLM Wiki Mini Protocol

目标是把杂乱输入变成可复查知识库：

- `raw/`：原始语料（PDF转录、文章、会议记录、笔记）
- `sources/`：每条原文对应一个 source page
- `entities/`：人/组织/项目名片
- `concepts/`：概念页（定义、边界、争议）
- `topics/`：主题整合页
- `index.md`：导航入口，按 source/page 列表
- `log.md`：每次 ingest 的审计日志（什么进来了、改了哪些页面）

每次 ingest 一个 source 时：
1) 生成/更新 source page
2) 为高频实体与概念更新对应页面
3) 追加 `index.md` 与 `log.md`

