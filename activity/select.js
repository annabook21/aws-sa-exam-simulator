// Picks a short round from the exam bank. Same ranking as the simulator's
// weak-spot set: last-wrong questions first, then unseen questions from the
// weakest areas. With no history, the caller supplies fallback area keys.
function createActivitySelect() {
  function correctKeys(question) {
    const answer = question && question.correct_answer;
    if (Array.isArray(answer)) return answer.map(String);
    if (typeof answer === 'string' && answer.length > 1) return answer.split('');
    if (answer == null || answer === '') return [];
    return [String(answer)];
  }

  function isPlayable(question) {
    if (!question || question.question_type || question.mock) return false;
    const options = question.options;
    if (!options || Array.isArray(options) || typeof options !== 'object') return false;
    const keys = Object.keys(options);
    if (keys.length < 2) return false;
    if (!keys.every(key => typeof options[key] === 'string')) return false;
    const wanted = correctKeys(question);
    return wanted.length > 0 && wanted.every(key => typeof options[key] === 'string');
  }

  function weakAreaKeys(history, config) {
    const stats = {};
    (history || []).forEach(row => {
      if (!row) return;
      const key = row.t || (row.d ? 'D' + row.d : null);
      if (!key) return;
      const stat = stats[key] || { key, n: 0, miss: 0 };
      stat.n += 1;
      if (!row.ok) stat.miss += 1;
      stats[key] = stat;
    });
    return Object.values(stats)
      .filter(stat => stat.n >= config.minAttempts)
      .map(stat => ({ key: stat.key, score: (stat.miss + 1) / (stat.n + 2) }))
      .sort((a, b) => b.score - a.score || (a.key < b.key ? -1 : a.key > b.key ? 1 : 0))
      .map(stat => stat.key);
  }

  function shuffle(items, random) {
    const copy = items.slice();
    const roll = random || Math.random;
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(roll() * (i + 1));
      const held = copy[i];
      copy[i] = copy[j];
      copy[j] = held;
    }
    return copy;
  }

  function answersMatch(question, picked) {
    const wanted = correctKeys(question).slice().sort();
    const given = (picked || []).map(String).slice().sort();
    if (wanted.length !== given.length) return false;
    return wanted.every((key, index) => key === given[index]);
  }

  function buildRound(questions, history, config, random, focus) {
    const playable = (questions || []).filter(isPlayable);
    const practice = (history || []).filter(row => row && !row.mock).slice(-config.historyWindow);
    const last = {};
    practice.forEach(row => { last[row.n] = !!row.ok; });
    const seen = new Set(practice.map(row => row.n));
    const choice = focus || 'weak';
    let keys = [];
    let source = 'all';
    if (choice === 'weak') {
      const ranked = weakAreaKeys(practice, config);
      keys = ranked.length ? ranked.slice(0, config.areaCount) : config.fallbackAreas.slice();
      source = ranked.length ? 'history' : 'fallback';
    } else if (choice !== 'all') {
      keys = ['D' + choice];
      source = 'domain';
    }
    const scope = source === 'domain'
      ? playable.filter(question => String(question.domain) === String(choice))
      : playable;
    const inArea = question => source === 'all'
      || keys.includes(question.task)
      || keys.includes('D' + question.domain);
    const missed = shuffle(scope.filter(question => last[question.number] === false), random)
      .slice(0, config.missedCap);
    const used = new Set(missed.map(question => question.number));
    const fresh = shuffle(scope.filter(question => inArea(question) && !seen.has(question.number) && !used.has(question.number)), random);
    const again = shuffle(scope.filter(question => inArea(question) && seen.has(question.number) && !used.has(question.number)), random);
    return {
      keys,
      source,
      questions: shuffle(missed.concat(fresh, again).slice(0, config.roundSize), random)
    };
  }

  return { correctKeys, isPlayable, weakAreaKeys, answersMatch, buildRound };
}

if (typeof module === 'object' && module.exports) module.exports = { createActivitySelect };
else globalThis.ActivitySelect = createActivitySelect();
