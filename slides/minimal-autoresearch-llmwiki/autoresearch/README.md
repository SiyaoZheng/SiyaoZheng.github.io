# minimal-autoresearch

在电脑上快速跑一个最小化 Auto Research（纯 Python，标准库）：

```bash
cd /Users/siyaozheng/Documents/教学/talks/tongji/minimal-autoresearch
python3 main.py --iterations 20 --out runs
```

输出：
- `runs/progress.jsonl`：逐实验日志
- `runs/progress.csv`：同日志的表格版
- `runs/best.json`：当前最佳 patch 和得分

运行说明：
- `prepare.py`：固定底层配置与默认阈值
- `train.py`：模拟一次训练评估过程（返回 val_bpb）
- `main.py`：运行 optimize loop（propose -> train -> eval -> keep/discard）

你可以把 `--iterations` 改小（比如 5）做演示快照。

