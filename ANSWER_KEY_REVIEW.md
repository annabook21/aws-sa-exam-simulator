# MLA-C01 answer-key review (2026-10-30)

Scope: all 271 Claude-written questions that appear in MLA-C01 mode (C01_ALSO list, #309–503, including the held-out Final Mock).
The original community bank (#1–145) was reviewed separately in earlier passes (see `exam_c01_explanations.js`, `C01_DOC_NOTES`).

## Method

| Group | Questions | How it was checked |
|---|---|---|
| Questions written before 2026-10-30 that have a `source` | 99 (#162–340 subset) | Re-fetched every cited AWS page on 2026-10-30 and checked the keyed answer and every distractor against the page text |
| Questions written on 2026-10-30 (#341–503) | 136 sourced + 26 concept | Keys were written from pages fetched that day. Second pass = adversarial ambiguity check (could any other option also be defended?) plus re-doing every calculation. **This pass is not independent of the writer.** |
| Earlier "standard ML concept" questions | 10 | Read for ambiguity |

## Results

- **Wrong answer keys found: 0.**
- **Ambiguity fixed: 1.** #214 (interpretable model vs. deep network + Clarify SHAP): the scenario now states that regulators require an inherently interpretable model and do not accept post-hoc explanations, so only A works. Cross-referenced with #379, where SHAP is correct.
- **Availability notes added: 3.** #221 (Amazon A2I closed to new customers), #358 and #422 (Ground Truth closed to new customers).
- **Wording note, no change:** #266 uses the condition key `sagemaker:VolumeKmsKey` as written in AWS's prose; AWS's JSON example on the same page uses `sagemaker:VolumeKmsKeyArn`.
- **Source no longer online:** #340 (Lookout for Equipment ended 2026-10-07; its documentation now returns 404). Kept because the C01 guide lists it, and the explanation already notes the closure.
- **Not verified against a page:** #176's option B (lowering the threshold) is a real technique, but the keyed SMOTE answer matches the usual exam framing for "can't collect more data". Left unchanged.

## Limits

- The questions were written by Claude, not AWS. Even a correct answer key doesn't guarantee that the question style matches the real exam.
- For #341–503, the same author checked the work on the same day.
