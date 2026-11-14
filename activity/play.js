(function () {
  const select = globalThis.ActivitySelect;
  const config = globalThis.ACTIVITY_CONFIG;
  const app = document.getElementById('app');
  const bar = document.getElementById('bar');
  const focus = document.getElementById('focus');
  const note = document.getElementById('note');
  let round = null;
  let index = 0;
  let correct = 0;
  let picked = new Set();
  let locked = false;

  function readHistory() {
    try { return JSON.parse(localStorage.getItem(config.historyKey) || '[]'); }
    catch (error) { return []; }
  }

  function writeHistory(question, ok) {
    try {
      const history = readHistory();
      history.push({
        n: question.number,
        d: question.domain || null,
        t: question.task || null,
        ok: ok,
        c: null,
        m: 'arcade',
        mock: false,
        at: Date.now()
      });
      localStorage.setItem(config.historyKey, JSON.stringify(history.slice(-5000)));
    } catch (error) { /* private mode keeps the round in memory */ }
  }

  function explanationFor(question) {
    if (question.explanation) return question.explanation;
    if (typeof C01_EXPLANATIONS !== 'undefined' && C01_EXPLANATIONS[String(question.number)]) {
      return C01_EXPLANATIONS[String(question.number)];
    }
    return '';
  }

  function areaName(key) {
    if (config.tasks[key]) return 'Task ' + key + ' · ' + config.tasks[key];
    if (key.charAt(0) === 'D') return config.domains[key.slice(1)] || key;
    return key;
  }

  function describe(current) {
    switch (current.source) {
      case 'history':
        return 'Your weakest areas right now: ' + current.keys.map(areaName).join(', ') + '.';
      case 'fallback':
        return 'No answer history in this browser yet. Starting from your score report: Domain 2 training and metrics, then Domain 1.';
      case 'domain':
        return areaName(current.keys[0]) + '.';
      case 'pinned':
        return 'One question from the MLA bank.';
      case 'all':
        return 'Every multiple-choice question in the MLA bank.';
      default: {
        const unexpected = current.source;
        throw new Error('Unhandled round source: ' + unexpected);
      }
    }
  }

  function el(tag, attrs, kids) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(function (pair) {
      const name = pair[0];
      const value = pair[1];
      if (name === 'class') node.className = value;
      else if (name === 'text') node.textContent = value;
      else if (value != null) node.setAttribute(name, value);
    });
    (kids || []).forEach(function (kid) { if (kid) node.append(kid); });
    return node;
  }

  function startRound() {
    const bank = typeof EXAM_DATA === 'undefined' ? [] : EXAM_DATA;
    const only = new URLSearchParams(location.search).get('n');
    const pinned = only && bank.find(function (item) { return String(item.number) === only && select.isPlayable(item); });
    round = pinned
      ? { keys: [], source: 'pinned', questions: [pinned] }
      : select.buildRound(bank, readHistory(), config, Math.random, focus.value);
    index = 0;
    correct = 0;
    note.textContent = describe(round);
    show();
  }

  function show() {
    bar.style.width = (round.questions.length ? (index / round.questions.length) * 100 : 0) + '%';
    app.replaceChildren();
    if (!round.questions.length) {
      app.append(el('div', { class: 'card' }, [
        el('h2', { text: 'No questions in this set' }),
        el('p', { text: 'Try All questions, or answer a few in the simulator so weak spots can be ranked.' })
      ]));
      return;
    }
    if (index >= round.questions.length) return finish();
    const question = round.questions[index];
    const keys = select.correctKeys(question);
    picked = new Set();
    locked = false;
    const card = el('div', { class: 'card' });
    const multi = keys.length > 1;
    card.append(
      el('div', { class: 'label', text: 'Question #' + question.number + (question.domain ? ' · ' + (config.domains[question.domain] || '') : '') }),
      el('p', { class: 'stem', text: question.question }),
      el('p', { class: 'label', text: multi ? 'Choose ' + keys.length + ', then lock in.' : 'Tap one answer.' })
    );
    Object.keys(question.options).forEach(function (key) {
      const button = el('button', { class: 'opt', type: 'button', 'data-key': key });
      button.append(el('b', { text: key }), document.createTextNode('  ' + question.options[key]));
      button.addEventListener('click', function () { choose(question, key, multi); });
      card.append(button);
    });
    const feedback = el('div', { id: 'fb' });
    card.append(feedback);
    if (multi) {
      const lock = el('button', { class: 'next', id: 'lock', type: 'button', text: 'Lock in' });
      lock.addEventListener('click', function () { grade(question); });
      card.append(lock);
    }
    app.append(card, el('p', { class: 'score', text: index + ' / ' + round.questions.length + ' done · ' + correct + ' right' }));
  }

  function choose(question, key, multi) {
    if (locked) return;
    if (!multi) {
      picked = new Set([key]);
      grade(question);
      return;
    }
    if (picked.has(key)) picked.delete(key);
    else picked.add(key);
    app.querySelectorAll('.opt').forEach(function (button) {
      button.classList.toggle('on', picked.has(button.getAttribute('data-key')));
    });
  }

  function grade(question) {
    if (locked) return;
    locked = true;
    const keys = select.correctKeys(question);
    const ok = select.answersMatch(question, Array.from(picked));
    if (ok) correct += 1;
    writeHistory(question, ok);
    app.querySelectorAll('.opt').forEach(function (button) {
      button.disabled = true;
      const key = button.getAttribute('data-key');
      if (keys.includes(key)) button.classList.add('right');
      else if (picked.has(key)) button.classList.add('wrong');
    });
    const lock = document.getElementById('lock');
    if (lock) lock.disabled = true;
    const why = explanationFor(question);
    const box = el('div', { class: ok ? 'why' : 'why miss' });
    box.append(el('b', { text: ok ? 'Right' : 'Answer: ' + keys.join(', ') }));
    if (why) box.append(document.createTextNode(why));
    const next = el('button', { class: 'next', id: 'nx', type: 'button', text: 'Next' });
    next.addEventListener('click', function () { index += 1; show(); });
    document.getElementById('fb').append(box, next);
    const score = app.querySelector('.score');
    if (score) score.textContent = (index + 1) + ' / ' + round.questions.length + ' done · ' + correct + ' right';
    next.focus();
  }

  function finish() {
    bar.style.width = '100%';
    const missed = round.questions.length - correct;
    app.append(el('div', { class: 'card done' }, [
      el('div', { class: 'label', text: 'Round done' }),
      el('div', { class: 'big', text: missed === 0 ? 'Perfect' : missed + ' miss' + (missed === 1 ? '' : 'es') }),
      el('p', { text: correct + ' of ' + round.questions.length + ' right. These answers are now in My Progress.' }),
      el('button', { class: 'next', id: 'again', type: 'button', text: 'Next round' })
    ]));
    document.getElementById('again').addEventListener('click', startRound);
  }

  document.addEventListener('keydown', function (event) {
    const letter = event.key.toUpperCase();
    if (letter >= 'A' && letter <= 'E') {
      const button = app.querySelector('.opt[data-key="' + letter + '"]');
      if (button && !button.disabled) button.click();
    } else if (event.key === 'Enter') {
      const next = document.getElementById('nx') || document.getElementById('lock') || document.getElementById('again');
      if (next && !next.disabled) next.click();
    }
  });

  focus.addEventListener('change', startRound);
  startRound();
})();
