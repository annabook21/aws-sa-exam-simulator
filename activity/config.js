// Round settings for the MLA exam activity. The fallback areas match the
// score-report note in progress_mla.html: Domain 2 training and metrics, then Domain 1.
const ACTIVITY_CONFIG = {
  historyKey: 'mlaHistory.v1',
  roundSize: 8,
  missedCap: 4,
  historyWindow: 400,
  minAttempts: 3,
  areaCount: 3,
  fallbackAreas: ['2.2', '2.3', 'D1'],
  domains: {
    1: 'Domain 1 · Data preparation',
    2: 'Domain 2 · Model development',
    3: 'Domain 3 · Deployment & orchestration',
    4: 'Domain 4 · Monitoring & security'
  },
  tasks: {
    '1.1': 'Ingest & store data',
    '1.2': 'Transform & feature engineering',
    '1.3': 'Data quality, bias & PII',
    '2.1': 'Choosing algorithms & services',
    '2.2': 'Training & tuning',
    '2.3': 'Metrics & evaluation',
    '3.1': 'Deployment options',
    '3.3': 'Pipelines & CI/CD',
    '4.1': 'Monitoring',
    '4.2': 'Security & networking'
  }
};

if (typeof module === 'object' && module.exports) module.exports = { ACTIVITY_CONFIG };
else globalThis.ACTIVITY_CONFIG = ACTIVITY_CONFIG;
