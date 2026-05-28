# minimal-llmwiki

这是一个最小化本地 LLM Wiki，核心是“新语料进入后能快速更新多个页面”：

1) 把文件放到 `raw/`（或直接用 `--source` 指向任意文本文件）
2) 运行 ingest，把 source page / entity / concept / topic 更新到工作区
3) `index.md` 和 `log.md` 自动同步

快速体验：

```bash
cd /Users/siyaozheng/Documents/教学/talks/tongji/minimal-llmwiki
python3 ingest.py --source raw/demo-note.md
python3 -m http.server --directory . 8877
```

然后在浏览器打开 `http://localhost:8877/index.md` 或 `index.html`（如有）查看结果。

