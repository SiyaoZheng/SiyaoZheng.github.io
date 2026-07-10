# Online Submission

After your agent creates `outputs/analysis_result.json` and `outputs/policy_scores.csv`, package the submission:

```bash
python package_submission.py --participant-id YOUR_ID
```

Then upload `submission_YOUR_ID.zip`.

## Browser Upload

Open the submission page provided by the instructor.

For local testing, the default page is:

```text
http://127.0.0.1:8765
```

Enter the same `YOUR_ID` used inside `analysis_result.json`.

## Command-Line Upload

Replace `SUBMISSION_URL` with the instructor's upload endpoint:

```bash
SUBMISSION_URL="http://127.0.0.1:8765/submit"
curl -F participant_id=YOUR_ID -F file=@submission_YOUR_ID.zip "$SUBMISSION_URL"
```

If the instructor provides a submission token:

```bash
curl -F participant_id=YOUR_ID \
  -F token=CLASS_TOKEN \
  -F file=@submission_YOUR_ID.zip \
  "$SUBMISSION_URL"
```

The server returns a JSON receipt. A valid receipt has `"accepted": true`.

