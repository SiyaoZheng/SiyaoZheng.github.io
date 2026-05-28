# Auto Research Mini Protocol

- 固定底层（substrate）：dataset / tokenizer / trainer 不改动。
- 只允许修改候选补丁（patch），例如 lr、temperature、dropout、optimizer。
- 每次实验：
  - propose patch
  - train(短时预算)
  - 评估 val_bpb（越小越好）
  - improve 则 keep，否則 discard
  - 把每次运行写入 progress 日志（JSONL）
- 每次运行都保留 `best.json`，用于复盘当前 running best

