const assert = require('node:assert/strict');
const { createActivitySelect } = require('./select');
const { ACTIVITY_CONFIG } = require('./config');

const select = createActivitySelect();
const stay = () => 0.999999;
const config = ACTIVITY_CONFIG;

function question(number, extra) {
  return Object.assign({
    number,
    domain: 1,
    question: 'Stem ' + number,
    options: { A: 'alpha', B: 'beta', C: 'gamma', D: 'delta' },
    correct_answer: 'A'
  }, extra);
}

function testKeysAndPlayable() {
  assert.deepEqual(select.correctKeys({ correct_answer: ['B', 'A'] }), ['B', 'A']);
  assert.deepEqual(select.correctKeys({ correct_answer: 'CD' }), ['C', 'D']);
  assert.equal(select.isPlayable(question(1)), true);
  assert.equal(select.isPlayable(question(2, { question_type: 'HOTSPOT_ORDER' })), false);
  assert.equal(select.isPlayable(question(3, { mock: true })), false);
  assert.equal(select.answersMatch(question(1, { correct_answer: ['B', 'A'] }), ['A', 'B']), true);
  assert.equal(select.answersMatch(question(1), ['B']), false);
}

function testWeakRanking() {
  const history = [
    { n: 1, d: 4, ok: false },
    { n: 2, d: 4, ok: false },
    { n: 3, d: 4, ok: true },
    { n: 4, d: 1, ok: true },
    { n: 5, d: 1, ok: true },
    { n: 6, d: 1, ok: false },
    { n: 7, d: 2, ok: false }
  ];
  assert.deepEqual(select.weakAreaKeys(history, config), ['D4', 'D1']);
}

function testFallbackRound() {
  const bank = [
    question(10, { domain: 1 }),
    question(11, { domain: 2, task: '2.2' }),
    question(12, { domain: 3 }),
    question(13, { question_type: 'HOTSPOT_MATCH' })
  ];
  const round = select.buildRound(bank, [], config, stay, 'weak');
  assert.equal(round.source, 'fallback');
  assert.deepEqual(round.keys, ['2.2', '2.3', 'D1']);
  assert.deepEqual(round.questions.map(item => item.number), [10, 11]);
}

function testMissedQuestionsLeadTheSlice() {
  const bank = [1, 2, 3, 4, 5, 6].map(number => question(number, { domain: number >= 5 ? 4 : 1 }));
  const history = [
    { n: 5, d: 4, ok: false },
    { n: 5, d: 4, ok: false },
    { n: 5, d: 4, ok: false }
  ];
  const tight = Object.assign({}, config, { roundSize: 2, missedCap: 1, areaCount: 1 });
  const round = select.buildRound(bank, history, tight, stay, 'weak');
  assert.equal(round.source, 'history');
  assert.deepEqual(round.keys, ['D4']);
  assert.equal(round.questions.length, 2);
  assert.ok(round.questions.some(item => item.number === 5));
}

function testDomainFocus() {
  const bank = [question(1, { domain: 2 }), question(2, { domain: 4 })];
  const round = select.buildRound(bank, [], config, stay, '2');
  assert.equal(round.source, 'domain');
  assert.deepEqual(round.questions.map(item => item.number), [1]);
}

testKeysAndPlayable();
testWeakRanking();
testFallbackRound();
testMissedQuestionsLeadTheSlice();
testDomainFocus();
console.log('activity select: 5 tests passed');
