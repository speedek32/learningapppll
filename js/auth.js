const Auth = (() => {
  let currentUser = null;  // { id, username, is_premium, token }

  function getToken() { return localStorage.getItem('passplus_token'); }
  function setToken(t) { localStorage.setItem('passplus_token', t); }
  function clearToken() { localStorage.removeItem('passplus_token'); }

  function getUser() { return currentUser; }
  function isLoggedIn() { return !!currentUser; }
  function isPremium() { return currentUser?.is_premium || Gamification.isAdFree(); }

  // Attach Authorization header + parse JSON, throw on error
  async function apiFetch(url, opts = {}) {
    const token = getToken();
    opts.headers = { 'Content-Type': 'application/json', ...(opts.headers || {}), ...(token ? { Authorization: `Bearer ${token}` } : {}) };
    const res  = await fetch(url, opts);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    return data;
  }

  // ── Init ───────────────────────────────────────────────────────
  async function init() {
    const token = getToken();
    if (!token) { renderSidebar(); return; }

    try {
      const data = await apiFetch('/api/auth/me');
      currentUser = { ...data, token };
      renderSidebar();
      if (currentUser.is_premium) Gamification.setAdFree();
      checkPremiumParam();
    } catch {
      clearToken();
      renderSidebar();
    }
  }

  function checkPremiumParam() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('premium') === 'success') {
      Gamification.setAdFree();
      if (currentUser) currentUser.is_premium = 1;
      renderSidebar();
      App.hidePremiumUI();
      alert('⭐ Dziękujemy! Zdaj+ Premium zostało aktywowane!');
      history.replaceState({}, '', '/');
    }
  }

  // ── Register ───────────────────────────────────────────────────
  async function register(username, email, password) {
    const data = await apiFetch('/api/auth/register', { method: 'POST', body: JSON.stringify({ username, email, password }) });
    setToken(data.token);
    currentUser = data;
    renderSidebar();
    return data;
  }

  // ── Login ──────────────────────────────────────────────────────
  async function login(email, password) {
    const data = await apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
    setToken(data.token);
    currentUser = data;
    if (data.is_premium) Gamification.setAdFree();
    renderSidebar();
    return data;
  }

  // ── Logout ─────────────────────────────────────────────────────
  function logout() {
    clearToken();
    currentUser = null;
    renderSidebar();
    App.goto('dashboard');
    App.updateDashboard();
  }

  // ── Sync result to server ──────────────────────────────────────
  async function syncResult(result) {
    if (!isLoggedIn()) return;
    try {
      await apiFetch('/api/results', {
        method: 'POST',
        body: JSON.stringify({
          category:   result.category,
          score:      result.score,
          total:      result.total,
          pass_score: result.passScore || 50,
          passed:     Math.round(result.score / result.total * 100) >= (result.passScore || 50)
        })
      });
    } catch { /* offline – skip sync */ }
  }

  // ── Buy premium ────────────────────────────────────────────────
  async function buyPremium() {
    if (!isLoggedIn()) {
      const hint = document.getElementById('authHint');
      hint.textContent = 'Zaloguj się żeby kupić Zdaj+ Premium.';
      hint.style.display = 'block';
      App.openModal('authModal');
      return;
    }
    try {
      const data = await apiFetch('/api/payment/create-session', { method: 'POST' });
      if (data.demo) {
        await apiFetch('/api/payment/activate-demo', { method: 'POST' });
        currentUser.is_premium = 1;
        Gamification.setAdFree();
        renderSidebar();
        App.hidePremiumUI();
        App.closeModal('premiumModal');
        alert('⭐ Zdaj+ Premium aktywowane! (tryb demo)');
      } else if (data.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      alert('Błąd: ' + e.message);
    }
  }

  // ── Leaderboard ────────────────────────────────────────────────
  async function loadLeaderboard(container) {
    container.innerHTML = '<p class="empty-msg">Ładowanie...</p>';
    try {
      const rows = await apiFetch('/api/leaderboard');
      if (!rows.length) { container.innerHTML = '<p class="empty-msg">Brak danych.</p>'; return; }

      const levels = ['🌱','📖','🔧','⭐','🎓','🏆','👑'];
      function lvlIcon(xp) {
        const thresholds = [0,100,300,600,1000,1500,2500];
        let i = 0;
        thresholds.forEach((t, idx) => { if (xp >= t) i = idx; });
        return levels[i];
      }

      container.innerHTML = rows.map((r, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}.`;
        const isMe  = currentUser?.username === r.username;
        return `<div class="lb-row${isMe ? ' lb-me' : ''}">
          <span class="lb-rank">${medal}</span>
          <span class="lb-name">${escHtml(r.username)} ${lvlIcon(r.xp)}</span>
          <span class="lb-xp">${r.xp} XP</span>
          <span class="lb-streak">🔥 ${r.streak}</span>
        </div>`;
      }).join('');
    } catch {
      container.innerHTML = '<p class="empty-msg">Brak połączenia z serwerem.</p>';
    }
  }

  // ── Sidebar UI ─────────────────────────────────────────────────
  function renderSidebar() {
    const el = document.getElementById('sidebarUser');
    if (!el) return;
    if (currentUser) {
      el.innerHTML = `
        <div class="sidebar-user-info">
          <span class="sidebar-avatar">${currentUser.username[0].toUpperCase()}</span>
          <span class="sidebar-username">${escHtml(currentUser.username)}</span>
          ${currentUser.is_premium ? '<span class="premium-star" title="Zdaj+ Premium">⭐</span>' : ''}
        </div>
        <button class="btn-logout" id="btnLogout">Wyloguj</button>`;
      document.getElementById('btnLogout').addEventListener('click', () => {
        if (confirm('Wylogować się?')) logout();
      });
    } else {
      el.innerHTML = `<button class="btn-login-sidebar" onclick="App.openModal('authModal')">Zaloguj / Zarejestruj</button>`;
    }

    // Show admin nav only for admins
    document.querySelectorAll('.nav-admin').forEach(el => {
      el.style.display = currentUser?.is_admin ? '' : 'none';
    });
  }

  function escHtml(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  return { init, login, register, logout, isLoggedIn, getUser, isPremium, syncResult, buyPremium, loadLeaderboard, apiFetch };
})();
