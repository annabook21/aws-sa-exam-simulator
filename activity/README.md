# Exam activity

Plays multiple-choice items from the MLA bank (`EXAM_DATA`). Hotspot and mock items are skipped. With answer history in `localStorage` key `mlaHistory.v1`, the round prefers questions you last got wrong, then unseen questions from the weakest areas. With no history it uses Domain 2 tasks 2.2 and 2.3, then Domain 1, which is the same fallback as My Progress.

Open `arcade_mla.html` from the site root. `arcade_mla.html?n=23` opens that question number.

```javascript
const { createActivitySelect } = require('./select');
const { ACTIVITY_CONFIG } = require('./config');
const select = createActivitySelect();
const round = select.buildRound(questions, history, ACTIVITY_CONFIG, () => 0.999999, 'weak');
// round.questions is the items to show. round.source is history, fallback, domain, or all.
```

`node activity/select.test.js` checks the picker. A `random` function that returns just under 1 leaves shuffle order unchanged, which is what the tests use.
