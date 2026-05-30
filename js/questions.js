const Questions = (() => {

  let editingId = null;

  function init() {
    // Tab switching
    document.querySelectorAll('[data-topics-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-topics-tab]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const isTopics = btn.dataset.topicsTab === 'topics';
        document.getElementById('topicsTabPanel').classList.toggle('active', isTopics);
        document.getElementById('questionsTabPanel').classList.toggle('active', !isTopics);
        document.getElementById('btnAddTopic').style.display    = isTopics ? '' : 'none';
        document.getElementById('btnAddQuestion').style.display = isTopics ? 'none' : '';
        if (!isTopics) render();
      });
    });

    // Show "Nowy temat" by default (topics tab active)
    document.getElementById('btnAddTopic').style.display = '';
    document.getElementById('btnAddQuestion').style.display = 'none';

    document.getElementById('btnAddQuestion').addEventListener('click', openAdd);
    document.getElementById('btnSaveQuestion').addEventListener('click', save);
  }

  async function render() {
    const el = document.getElementById('questionsContent');
    if (!el) return;

    if (!Auth.getUser()) {
      el.innerHTML = `
        <div class="card" style="text-align:center;padding:2rem;">
          <p style="color:var(--text-muted);margin-bottom:1rem;">Zaloguj się, żeby tworzyć własne pytania.</p>
          <button class="btn-primary" onclick="App.openModal('authModal')">Zaloguj się</button>
        </div>`;
      return;
    }

    el.innerHTML = `<p class="empty-msg">Ładowanie pytań...</p>`;

    try {
      const questions = await Auth.apiFetch('/api/questions');
      renderList(el, questions);
    } catch (e) {
      el.innerHTML = `<p class="empty-msg">Błąd: ${esc(e.message)}</p>`;
    }
  }

  function renderList(el, questions) {
    const isAdmin = !!Auth.getUser()?.is_admin;

    if (!questions.length) {
      el.innerHTML = `
        <div class="card" style="text-align:center;padding:2rem;">
          <p style="color:var(--text-muted);margin-bottom:0.5rem;font-weight:700;">Brak pytań</p>
          <p style="color:var(--text-muted);font-size:0.875rem;">Kliknij „+ Nowe pytanie" aby dodać własne pytanie do quizu.</p>
        </div>`;
      return;
    }

    el.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:0.5rem;">
        <span style="color:var(--text-muted);font-size:0.85rem;">${questions.length} ${questions.length === 1 ? 'pytanie' : 'pytań'}</span>
        <button class="btn-primary" id="btnStartCustomQuiz">▶ Rozpocznij quiz z tych pytań</button>
      </div>
      <div class="questions-list">
        ${questions.map((q, i) => `
          <div class="question-row card" style="margin-bottom:0.5rem;">
            <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;">
              <div style="flex:1;min-width:0;">
                <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.4rem;flex-wrap:wrap;">
                  <span class="ticket-cat">${esc(q.category)}</span>
                  ${isAdmin && q.username ? `<span style="color:var(--text-muted);font-size:0.75rem;">@${esc(q.username)}</span>` : ''}
                </div>
                <div style="font-weight:600;font-size:0.9rem;margin-bottom:0.5rem;">${esc(q.question)}</div>
                <div style="display:flex;flex-direction:column;gap:0.2rem;">
                  ${q.options.map((opt, idx) => `
                    <div style="font-size:0.82rem;color:${idx === q.answer ? 'var(--success)' : 'var(--text-muted)'};">
                      ${idx === q.answer ? '✓' : '○'} ${esc(opt)}
                    </div>
                  `).join('')}
                </div>
                ${q.explanation ? `<div style="margin-top:0.4rem;font-size:0.78rem;color:var(--text-muted);font-style:italic;">${esc(q.explanation)}</div>` : ''}
              </div>
              <div style="display:flex;gap:0.4rem;flex-shrink:0;">
                <button class="btn-icon" data-q-edit="${q.id}" title="Edytuj">✏️</button>
                <button class="btn-icon danger" data-q-del="${q.id}" title="Usuń">🗑️</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>`;

    el.querySelectorAll('[data-q-edit]').forEach(btn =>
      btn.addEventListener('click', () => openEdit(btn.dataset.qEdit, questions))
    );
    el.querySelectorAll('[data-q-del]').forEach(btn =>
      btn.addEventListener('click', () => del(btn.dataset.qDel))
    );

    const startBtn = document.getElementById('btnStartCustomQuiz');
    if (startBtn) startBtn.addEventListener('click', () => startQuiz(questions));
  }

  function openAdd() {
    editingId = null;
    document.getElementById('questionModalTitle').textContent = 'Nowe pytanie';
    document.getElementById('qCategory').value    = '';
    document.getElementById('qQuestion').value    = '';
    document.getElementById('qExplanation').value = '';
    document.querySelectorAll('.q-opt-input').forEach(i => i.value = '');
    document.querySelectorAll('.q-radio').forEach(r => r.checked = false);
    const err = document.getElementById('questionError');
    if (err) err.style.display = 'none';
    App.openModal('questionModal');
  }

  function openEdit(id, questions) {
    const q = questions.find(q => String(q.id) === String(id));
    if (!q) return;
    editingId = id;
    document.getElementById('questionModalTitle').textContent = 'Edytuj pytanie';
    document.getElementById('qCategory').value    = q.category;
    document.getElementById('qQuestion').value    = q.question;
    document.getElementById('qExplanation').value = q.explanation || '';
    const inputs = document.querySelectorAll('.q-opt-input');
    const radios = document.querySelectorAll('.q-radio');
    inputs.forEach((inp, i) => inp.value = q.options[i] || '');
    radios.forEach(r => r.checked = parseInt(r.value) === q.answer);
    const err = document.getElementById('questionError');
    if (err) err.style.display = 'none';
    App.openModal('questionModal');
  }

  async function save() {
    const errEl = document.getElementById('questionError');
    errEl.style.display = 'none';

    const category    = document.getElementById('qCategory').value.trim() || 'Własne';
    const question    = document.getElementById('qQuestion').value.trim();
    const explanation = document.getElementById('qExplanation').value.trim();
    const optInputs   = [...document.querySelectorAll('.q-opt-input')];
    const options     = optInputs.map(i => i.value.trim()).filter(v => v);
    const checkedRadio = document.querySelector('.q-radio:checked');
    const answer      = checkedRadio ? parseInt(checkedRadio.value) : -1;

    if (!question)        { showErr('Wpisz treść pytania.');           return; }
    if (options.length < 2) { showErr('Podaj co najmniej 2 odpowiedzi.'); return; }
    if (answer < 0)       { showErr('Zaznacz poprawną odpowiedź.');    return; }
    if (answer >= options.length) { showErr('Zaznaczona odpowiedź jest pusta.'); return; }

    const btn = document.getElementById('btnSaveQuestion');
    btn.disabled = true;
    btn.textContent = 'Zapisanie...';

    try {
      if (editingId) {
        await Auth.apiFetch(`/api/questions/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify({ category, question, options, answer, explanation }),
        });
      } else {
        await Auth.apiFetch('/api/questions', {
          method: 'POST',
          body: JSON.stringify({ category, question, options, answer, explanation }),
        });
      }
      App.closeModal('questionModal');
      render();
    } catch (e) {
      showErr(e.message || 'Błąd zapisu.');
    } finally {
      btn.disabled = false;
      btn.textContent = 'Zapisz pytanie';
    }
  }

  async function del(id) {
    if (!confirm('Usunąć to pytanie?')) return;
    try {
      await Auth.apiFetch(`/api/questions/${id}`, { method: 'DELETE' });
      render();
    } catch (e) {
      alert(e.message || 'Błąd usuwania.');
    }
  }

  function startQuiz(questions) {
    if (!questions.length) return;
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, Math.min(questions.length, 20));
    Tests.startCustomQuiz(shuffled);
    App.goto('tests');
  }

  function showErr(msg) {
    const el = document.getElementById('questionError');
    if (!el) return;
    el.textContent = msg;
    el.style.display = 'block';
  }

  function esc(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  return { init, render };
})();
