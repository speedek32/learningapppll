const Multiplayer = (() => {
  let socket = null;
  let gameState = null;  // { questions, answers, current, myScore }

  function getSocket() {
    if (!socket) socket = io();
    return socket;
  }

  // ── Open 1v1 lobby ─────────────────────────────────────────────
  function openLobby() {
    if (!Auth.isLoggedIn()) {
      const hint = document.getElementById('authHint');
      hint.textContent = 'Zaloguj się żeby wyzwać znajomego.';
      hint.style.display = 'block';
      App.openModal('authModal');
      return;
    }
    App.openModal('multiModal');
    showLobbyScreen();
  }

  function showLobbyScreen() {
    document.getElementById('multiContent').innerHTML = `
      <div class="multi-lobby">
        <div class="multi-tabs">
          <button class="multi-tab active" id="tabCreate">🎯 Stwórz pokój</button>
          <button class="multi-tab" id="tabJoin">🔗 Dołącz do pokoju</button>
        </div>

        <div id="multiCreate">
          <p class="hint" style="margin-bottom:1rem;">Wybierz kategorię, stwórz pokój i podaj kod znajomemu.</p>
          <div class="form-group">
            <label>Kategoria egzaminu</label>
            <select id="multiCategory" class="input-field" style="margin-bottom:0.75rem;"></select>
          </div>
          <button class="btn-primary" id="btnCreateRoom" style="width:100%;">🎯 Stwórz pokój</button>
        </div>

        <div id="multiJoin" style="display:none;">
          <p class="hint" style="margin-bottom:1rem;">Wpisz kod który dostałeś od znajomego.</p>
          <div class="form-group">
            <input type="text" id="multiCode" class="input-field" placeholder="np. ABC123" maxlength="6"
              style="text-transform:uppercase;letter-spacing:0.2em;font-size:1.2rem;text-align:center;" />
          </div>
          <button class="btn-primary" id="btnJoinRoom" style="width:100%;margin-top:0.5rem;">🔗 Dołącz</button>
        </div>
      </div>`;

    // Populate category select
    if (typeof Tests !== 'undefined') {
      const sel = document.getElementById('multiCategory');
      Tests.getCategories().forEach(c => {
        if (c.id === 'custom' || !c.questions.length) return;
        const o = document.createElement('option');
        o.value = c.id; o.textContent = c.name;
        sel.appendChild(o);
      });
    }

    document.getElementById('tabCreate').addEventListener('click', () => {
      document.getElementById('multiCreate').style.display = '';
      document.getElementById('multiJoin').style.display = 'none';
      document.getElementById('tabCreate').classList.add('active');
      document.getElementById('tabJoin').classList.remove('active');
    });

    document.getElementById('tabJoin').addEventListener('click', () => {
      document.getElementById('multiCreate').style.display = 'none';
      document.getElementById('multiJoin').style.display = '';
      document.getElementById('tabJoin').classList.add('active');
      document.getElementById('tabCreate').classList.remove('active');
    });

    document.getElementById('btnCreateRoom').addEventListener('click', createRoom);
    document.getElementById('btnJoinRoom').addEventListener('click', joinRoom);
  }

  function createRoom() {
    const catId = document.getElementById('multiCategory').value;
    const cat   = Tests.getCategories().find(c => c.id === catId);
    if (!cat) return;

    getSocket().emit('create_room', {
      username:     Auth.getUser().username,
      categoryName: cat.name,
      questions:    cat.questions
    });

    getSocket().once('room_created', ({ code }) => {
      document.getElementById('multiContent').innerHTML = `
        <div style="text-align:center;padding:1.5rem;">
          <p style="font-size:0.9rem;color:var(--text-muted);margin-bottom:0.75rem;">Twój kod pokoju:</p>
          <div class="room-code">${code}</div>
          <p class="hint" style="margin-top:0.75rem;">Wyślij ten kod znajomemu. Gra rozpocznie się automatycznie gdy dołączy.</p>
          <div class="waiting-dots">⏳ Czekam na gracza<span class="dot-anim">...</span></div>
        </div>`;
    });

    setupGameListeners(null);
  }

  function joinRoom() {
    const code = document.getElementById('multiCode').value.trim().toUpperCase();
    if (code.length !== 6) { alert('Kod pokoju musi mieć 6 znaków.'); return; }

    getSocket().emit('join_room', { username: Auth.getUser().username, code });
    getSocket().once('room_error', msg => alert(msg));
    setupGameListeners(code);
  }

  function setupGameListeners() {
    const s = getSocket();

    s.off('player_joined'); s.off('countdown'); s.off('game_start');
    s.off('score_update'); s.off('game_over'); s.off('waiting_opponent'); s.off('opponent_left');

    s.on('player_joined', ({ players }) => {
      const list = document.querySelector('.waiting-dots');
      if (list) list.innerHTML = `✅ ${players.join(' vs ')} – czekam na start...`;
    });

    s.on('countdown', n => {
      document.getElementById('multiContent').innerHTML = `
        <div style="text-align:center;padding:3rem;">
          <div style="font-size:5rem;font-weight:900;color:var(--primary);">${n}</div>
          <p style="color:var(--text-muted);">Gra zaczyna się...</p>
        </div>`;
    });

    s.on('game_start', ({ questions, category }) => {
      App.closeModal('multiModal');
      startMultiGame(questions, category);
    });

    s.on('score_update', scores => {
      const el = document.getElementById('multiScoreboard');
      if (!el) return;
      el.innerHTML = scores.map(p =>
        `<div class="multi-score-row ${p.username === Auth.getUser().username ? 'me' : ''}">
          <span>${escHtml(p.username)}</span>
          <span>${p.score} pkt (${p.answered} pytań)</span>
        </div>`
      ).join('');
    });

    s.on('waiting_opponent', () => {
      const el = document.getElementById('multiStatus');
      if (el) el.innerHTML = '⏳ Czekam na przeciwnika...';
    });

    s.on('game_over', ({ results, total }) => {
      showMultiResult(results, total);
    });

    s.on('opponent_left', () => {
      alert('Przeciwnik opuścił grę.');
      document.getElementById('multiplayerGame')?.remove();
      App.goto('tests');
    });
  }

  // ── In-game UI ─────────────────────────────────────────────────
  function startMultiGame(questions, category) {
    gameState = { questions, answers: [], current: 0, myScore: 0 };

    const overlay = document.createElement('div');
    overlay.id = 'multiplayerGame';
    overlay.className = 'multi-overlay';
    overlay.innerHTML = `
      <div class="multi-game">
        <div class="multi-header">
          <span>⚔️ 1v1 – ${escHtml(category)}</span>
          <div id="multiScoreboard" class="multi-scoreboard"></div>
          <span id="multiStatus"></span>
        </div>
        <div class="question-card" id="multiQuestionCard">
          <div class="question-number" id="multiQNum">Pytanie 1/${questions.length}</div>
          <div class="question-text" id="multiQText"></div>
          <div class="options-list" id="multiOptions"></div>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    renderMultiQuestion();
  }

  function renderMultiQuestion() {
    const { questions, current } = gameState;
    if (current >= questions.length) {
      getSocket().emit('done', { score: gameState.myScore });
      return;
    }
    const q = questions[current];
    document.getElementById('multiQNum').textContent = `Pytanie ${current + 1}/${questions.length}`;
    document.getElementById('multiQText').textContent = q.q;

    const letters = ['A','B','C','D'];
    const opts = document.getElementById('multiOptions');
    opts.innerHTML = q.opts.map((opt, i) =>
      `<button class="option-btn" data-idx="${i}">
        <span class="option-letter">${letters[i]}</span>
        <span>${escHtml(opt)}</span>
      </button>`
    ).join('');

    opts.querySelectorAll('.option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        opts.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
        const idx     = parseInt(btn.dataset.idx);
        const correct = idx === q.ans;
        btn.classList.add(correct ? 'correct' : 'wrong');
        if (!correct) opts.querySelectorAll('.option-btn')[q.ans].classList.add('correct');
        if (correct) gameState.myScore++;

        getSocket().emit('answer', { idx: current, correct });
        gameState.current++;
        setTimeout(renderMultiQuestion, 800);
      });
    });
  }

  function showMultiResult(results, total) {
    document.getElementById('multiplayerGame')?.remove();
    const me     = Auth.getUser().username;
    const myRes  = results.find(r => r.username === me);
    const winner = results[0];
    const won    = winner.username === me;

    const div = document.createElement('div');
    div.className = 'multi-overlay';
    div.innerHTML = `
      <div class="multi-game" style="max-width:480px;">
        <h2 style="text-align:center;margin-bottom:1rem;">${won ? '🏆 Wygrałeś!' : '😔 Przegrałeś'}</h2>
        <div class="result-details" style="margin-bottom:1.5rem;">
          ${results.map((r, i) =>
            `<div class="result-detail">
              <strong>${i === 0 ? '🥇' : '🥈'} ${escHtml(r.username)}</strong>
              <small>${r.score}/${total} pkt</small>
            </div>`
          ).join('')}
        </div>
        <button class="btn-primary" style="width:100%;" id="btnCloseResult">Powrót do menu</button>
      </div>`;
    document.body.appendChild(div);
    document.getElementById('btnCloseResult').addEventListener('click', () => {
      div.remove();
      App.goto('tests');
    });
  }

  function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  return { openLobby };
})();
