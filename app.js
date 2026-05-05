(() => {
  const data = window.GAME_DATA;
  const app = document.getElementById('app');

  const state = {
    screen: 'title', selectedCharacter: null, questionIndex: 0, trust: 100, affection: 50,
    anger: 0, laugh: 0, chaos: 0, safeCount: 0, jokeCount: 0, chaosCount: 0,
    lastCard: null, lastReaction: '', expression: 'normal', lockCards: false, canNext: false, copyStatus: ''
  };

  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const tname = { safe: '安全', joke: '半ボケ', chaos: '全力ボケ' };

  function resetBattle(charId) { Object.assign(state, { screen: 'game', selectedCharacter: charId, questionIndex: 0, trust: 100, affection: 50, anger: 0, laugh: 0, chaos: 0, safeCount: 0, jokeCount: 0, chaosCount: 0, lastCard: null, lastReaction: '', expression: 'normal', lockCards: false, canNext: false, copyStatus: '' }); render(); }
  function getChar() { return data.characters.find(c => c.id === state.selectedCharacter); }
  function imgPath() { return `assets/characters/${state.selectedCharacter}_${state.expression}.png`; }

  function resultType() {
    if (state.trust >= 70 && state.affection >= 70) return 'good';
    if (state.trust >= 40 && state.affection >= 70) return 'weird_liked';
    if (state.trust >= 70 && state.affection < 40) return 'business_survive';
    if (state.trust < 40 && state.affection < 40) return 'danger';
    return 'normal';
  }
  function titleJudge() {
    if (state.trust >= 80 && state.affection >= 70) return '誠実なる言い逃れ職人';
    if (state.trust < 30 && state.affection >= 70) return 'なぜか許される人';
    if (state.laugh >= 35 && state.chaos < 25) return '謝罪芸人';
    if (state.chaos >= 50) return '説明不能の異常存在';
    if (state.anger >= 50) return '信用残高マイナスの妖精';
    if (state.safeCount >= 4) return '正直すぎる生還者';
    if (state.jokeCount >= 4) return '空気で渡る綱渡り師';
    if (state.chaosCount >= 4) return '時空を越えた問題社員';
    if (state.trust >= 60 && state.affection < 40) return '業務だけは守った人';
    return '普通に怒られた人';
  }
  const finalExp = { good: 'smile', weird_liked: 'confused', business_survive: 'normal', danger: 'angry', normal: 'confused' };

  function chooseCard(cardIndex) {
    if (state.lockCards) return;
    const q = data.questions[state.questionIndex]; const card = q.cards[cardIndex]; const cid = state.selectedCharacter;
    state.lockCards = true; state.lastCard = card; state.canNext = false;
    state.trust = clamp(state.trust + card.effects.trust, 0, 100);
    state.affection = clamp(state.affection + card.affection[cid], 0, 100);
    state.anger = Math.max(0, state.anger + card.effects.anger);
    state.laugh = Math.max(0, state.laugh + card.effects.laugh);
    state.chaos = Math.max(0, state.chaos + card.effects.chaos);
    if (card.type === 'safe') state.safeCount++; if (card.type === 'joke') state.jokeCount++; if (card.type === 'chaos') state.chaosCount++;
    state.expression = card.expression[cid]; state.lastReaction = card.reaction[cid]; render();
    setTimeout(() => { state.canNext = true; render(); }, 1000);
  }

  function nextStep() { state.lastCard = null; state.lastReaction = ''; state.lockCards = false; state.canNext = false; state.questionIndex++; if (state.questionIndex >= data.questions.length) { state.screen = 'result'; state.expression = finalExp[resultType()]; } render(); }

  async function copyResult() {
    const c = getChar(); const type = resultType(); const comment = data.resultComments[c.id][type];
    const txt = `「${data.title}」\n相手：${c.name}\n称号：${titleJudge()}\n信用残高：${state.trust}\n好感度：${state.affection}\n総評：${comment}`;
    try { await navigator.clipboard.writeText(txt); state.copyStatus = 'コピーしました'; } catch { state.copyStatus = 'コピーに失敗しました'; }
    render();
  }

  function portrait(charName) {
    return `<div class="portrait"><img src="${imgPath()}" alt="${charName}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"><div class="fallback" style="display:none">${charName}<br>画像準備中</div></div>`;
  }

  function render() {
    if (state.screen === 'title') {
      app.innerHTML = `<div class="center"><h1 class="title">${data.title}</h1><p class="subtitle">${data.subtitle}</p><button class="btn" id="start">はじめる</button></div>`;
      document.getElementById('start').onclick = () => { state.screen = 'select'; render(); };
      return;
    }
    if (state.screen === 'select') {
      app.innerHTML = `<h2 class="center">対戦相手を選択</h2><div class="char-grid">${data.characters.map(c => `<button class="card" data-id="${c.id}"><div class="char-name">${c.name}</div><div class="role">${c.role}</div><p>${c.description}</p><div class="small">得意タイプ：${c.specialty}</div></button>`).join('')}</div>`;
      [...app.querySelectorAll('[data-id]')].forEach(b => b.onclick = () => resetBattle(b.dataset.id));
      return;
    }
    if (state.screen === 'game') {
      const q = data.questions[state.questionIndex]; const c = getChar();
      app.innerHTML = `<div class="top"><div class="stage">${state.questionIndex + 1}/${data.questions.length}</div>
      <div class="meters"><div>信用残高 ${state.trust}</div><div class="meter"><div class="fill trust" style="width:${state.trust}%"></div></div>
      <div>好感度 ${state.affection}</div><div class="meter"><div class="fill affection" style="width:${state.affection}%"></div></div></div></div>
      <div class="character-area">${portrait(c.name)}<div class="bubble"><strong>${q.title}</strong><br>${q.situation}</div>${state.lastReaction ? `<div class="bubble">${state.lastReaction}</div>` : ''}</div>
      ${state.lastCard ? '<div class="flash">言い訳発動！</div>' : ''}
      <div class="cards">${q.cards.map((card, i) => `<button class="excuse ${card.type} ${state.lastCard && state.lastCard.id === card.id ? 'selected' : ''} ${state.lockCards && (!state.lastCard || state.lastCard.id !== card.id) ? 'locked' : ''}" data-i="${i}" ${state.lockCards ? 'disabled' : ''}><div class="type">${tname[card.type]}</div><strong>${card.name}</strong><p>${card.text}</p><div class="fx">${card.type === 'safe' ? '堅実・低リスク' : card.type === 'joke' ? '笑い狙い・中リスク' : '予測不能・高リスク'}</div></button>`).join('')}</div>
      ${state.canNext ? '<button class="btn" id="nextBtn">次へ</button>' : ''}`;
      [...app.querySelectorAll('[data-i]')].forEach(b => b.onclick = () => chooseCard(Number(b.dataset.i)));
      const n = document.getElementById('nextBtn'); if (n) n.onclick = nextStep;
      return;
    }
    if (state.screen === 'result') {
      const c = getChar(); const type = resultType(); const title = titleJudge(); const comment = data.resultComments[c.id][type];
      app.innerHTML = `<h2 class="center">結果発表</h2>${portrait(c.name)}
      <div class="result-stat"><span>信用残高</span><strong>${state.trust}</strong></div>
      <div class="result-stat"><span>好感度</span><strong>${state.affection}</strong></div>
      <div class="result-stat"><span>称号</span><strong>${title}</strong></div>
      <div class="bubble">${comment}</div>
      <div style="display:grid;gap:8px;margin-top:12px"><button class="btn" id="retry">もう一度同じ相手に挑む</button><button class="btn secondary" id="backSel">キャラ選択に戻る</button><button class="btn" id="copy">結果をコピー</button><div class="copy-status">${state.copyStatus || ''}</div></div>`;
      document.getElementById('retry').onclick = () => resetBattle(c.id);
      document.getElementById('backSel').onclick = () => { state.screen = 'select'; render(); };
      document.getElementById('copy').onclick = copyResult;
    }
  }
  render();
})();
