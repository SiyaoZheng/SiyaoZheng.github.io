# Student Instructions

Run your agent in this directory.

The agent's single source of truth is `llms.txt`.

The agent should read `llms.txt`, analyze `dev.csv`, rank every unit in `hidden_x.csv`, and write:

- `outputs/analysis_result.json`
- `outputs/policy_scores.csv`

After the run finishes, package the submission:

```bash
python package_submission.py --participant-id YOUR_ID
```

Upload the generated `submission_YOUR_ID.zip` through the class submission page.

See `SUBMIT.md` for browser and command-line upload options.
