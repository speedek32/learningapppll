const App = (() => {
  let currentSection = 'dashboard';

  function init() {
    setupNav();
    setupTheme();
    setupModals();
    setupPremium();
    setupAuth();
    setupNotifications();
    Gamification.init();
    Auth.init();
    Support.init();
    Admin.init();
    goto('dashboard');
    loadSettings();
    updateDashboard();
  }

  function setupNav() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        goto(item.dataset.section);
        closeMobileSidebar();
      });
    });

    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.addEventListener('click', e => {
        e.preventDefault();
        goto(item.dataset.section);
      });
    });

    document.getElementById('sidebarToggle').addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      const main = document.getElementById('main');
      sidebar.classList.toggle('collapsed');
      main.classList.toggle('sidebar-collapsed');
    });

    document.getElementById('mobileMenuBtn').addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      const backdrop = document.getElementById('sidebarBackdrop');
      sidebar.classList.add('mobile-open');
      backdrop.classList.add('open');
    });

    document.getElementById('sidebarBackdrop').addEventListener('click', () => {
      closeMobileSidebar();
    });
  }

  function closeMobileSidebar() {
    document.getElementById('sidebar').classList.remove('mobile-open');
    document.getElementById('sidebarBackdrop').classList.remove('open');
  }

  function goto(section) {
    document.querySelectorAll('.nav-item').forEach(i => {
      i.classList.toggle('active', i.dataset.section === section);
    });
    document.querySelectorAll('.mobile-nav-item').forEach(i => {
      i.classList.toggle('active', i.dataset.section === section);
    });
    document.querySelectorAll('.section').forEach(s => {
      s.classList.toggle('active', s.id === 'section-' + section);
    });
    currentSection = section;

    if (section === 'dashboard') updateDashboard();
    if (section === 'profile')   Profile.render();
    if (section === 'topics')    Topics.render();
    if (section === 'chat')      Chat.init();
    if (section === 'tests')     Tests.showMenu();
    if (section === 'settings')  loadSettings();
    if (section === 'support')   Support.render();
    if (section === 'admin')     Admin.render();
  }

  function setupTheme() {
    const btn = document.getElementById('themeToggle');
    const saved = localStorage.getItem('egzaminpro_theme') || 'dark';
    applyTheme(saved);

    btn.addEventListener('click', () => {
      const isDark = document.body.classList.contains('theme-dark');
      const next = isDark ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('egzaminpro_theme', next);
    });
  }

  function applyTheme(theme) {
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add('theme-' + theme);
    document.getElementById('themeToggle').textContent =
      theme === 'dark' ? '☀️ Jasny tryb' : '🌙 Ciemny tryb';
  }

  function setupModals() {
    document.querySelectorAll('[data-modal]').forEach(btn => {
      btn.addEventListener('click', () => closeModal(btn.dataset.modal));
    });
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) closeModal(overlay.id);
      });
    });
  }

  function openModal(id) {
    document.getElementById(id).classList.add('open');
  }

  function closeModal(id) {
    document.getElementById(id).classList.remove('open');
  }

  function setupPremium() {
    document.getElementById('btnActivatePremium').addEventListener('click', () => {
      Auth.buyPremium();
    });

    document.getElementById('adClose').addEventListener('click', () => {
      document.getElementById('adBanner').style.display = 'none';
    });

    if (Gamification.isAdFree()) hidePremiumUI();
  }

  function hidePremiumUI() {
    document.getElementById('btnUpgrade').style.display = 'none';
  }

  function setupAuth() {
    const tabLogin    = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const formLogin   = document.getElementById('formLogin');
    const formReg     = document.getElementById('formRegister');

    tabLogin.addEventListener('click', () => {
      tabLogin.classList.add('active'); tabRegister.classList.remove('active');
      formLogin.style.display = ''; formReg.style.display = 'none';
    });
    tabRegister.addEventListener('click', () => {
      tabRegister.classList.add('active'); tabLogin.classList.remove('active');
      formLogin.style.display = 'none'; formReg.style.display = '';
    });

    document.getElementById('btnLogin').addEventListener('click', async () => {
      const email = document.getElementById('loginEmail').value.trim();
      const pass  = document.getElementById('loginPassword').value;
      const errEl = document.getElementById('loginError');
      errEl.style.display = 'none';
      try {
        await Auth.login(email, pass);
        closeModal('authModal');
        // Show hint if there was one
        document.getElementById('authHint').style.display = 'none';
        updateDashboard();
      } catch (e) {
        errEl.textContent = e.message;
        errEl.style.display = 'block';
      }
    });

    document.getElementById('btnRegister').addEventListener('click', async () => {
      const username = document.getElementById('regUsername').value.trim();
      const email    = document.getElementById('regEmail').value.trim();
      const pass     = document.getElementById('regPassword').value;
      const errEl    = document.getElementById('regError');
      errEl.style.display = 'none';
      try {
        await Auth.register(username, email, pass);
        closeModal('authModal');
        document.getElementById('authHint').style.display = 'none';
        updateDashboard();
      } catch (e) {
        errEl.textContent = e.message;
        errEl.style.display = 'block';
      }
    });

    // Enter key in password fields
    document.getElementById('loginPassword').addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('btnLogin').click();
    });
    document.getElementById('regPassword').addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('btnRegister').click();
    });
  }

  function setupNotifications() {
    const btn = document.getElementById('btnRequestNotif');
    const status = document.getElementById('notifStatus');

    function refreshNotifStatus() {
      const s = Gamification.getNotificationStatus();
      if (s === 'granted') {
        status.innerHTML = '✅ Powiadomienia są włączone.';
        status.style.color = 'var(--success)';
        btn.style.display = 'none';
      } else if (s === 'denied') {
        status.innerHTML = '❌ Powiadomienia są zablokowane w ustawieniach przeglądarki.';
        status.style.color = 'var(--danger)';
        btn.style.display = 'none';
      } else if (s === 'unsupported') {
        status.innerHTML = '⚠️ Ta przeglądarka nie obsługuje powiadomień.';
        btn.style.display = 'none';
      } else {
        status.innerHTML = '💤 Powiadomienia są wyłączone.';
      }
    }

    btn.addEventListener('click', async () => {
      await Gamification.requestNotifications();
      refreshNotifStatus();
    });

    refreshNotifStatus();
  }

  function updateDashboard() {
    const topics = Storage.getTopics();
    const results = Storage.getResults();
    const settings = Storage.getSettings();

    document.getElementById('statPassed').textContent = results.filter(r => Math.round(r.score / r.total * 100) >= 50).length;
    document.getElementById('statTopics').textContent = topics.length;
    document.getElementById('statStudied').textContent = topics.filter(t => t.studied).length;

    const scores = results.map(r => Math.round(r.score / r.total * 100));
    document.getElementById('statBestScore').textContent =
      scores.length ? Math.max(...scores) + '%' : '—';

    if (settings.name) {
      document.querySelector('#section-dashboard .section-header h1').textContent =
        `Witaj, ${settings.name}! 👋`;
    }

    const recentEl = document.getElementById('recentTests');
    if (results.length) {
      recentEl.innerHTML = results.slice(0, 5).map(r => {
        const pct = Math.round(r.score / r.total * 100);
        const pass = pct >= 50;
        return `<div class="history-item">
          <span class="history-score ${pass ? 'pass' : 'fail'}">${pct}%</span>
          <span class="history-meta">${r.category} • ${Storage.formatDate(r.date)}</span>
          <span>${r.score}/${r.total}</span>
        </div>`;
      }).join('');
    } else {
      recentEl.innerHTML = '<p class="empty-msg">Nie rozwiązałeś jeszcze żadnego testu.</p>';
    }

    // Gamification card
    const gd = Gamification.getData();
    const glevel = Gamification.getLevel(gd.xp);
    const gnext = Gamification.getNextLevel(gd.xp);
    const gpct = gnext ? Math.round(((gd.xp - glevel.min) / (gnext.min - glevel.min)) * 100) : 100;
    document.getElementById('dashGamification').innerHTML = `
      <div class="gami-stats">
        <div class="gami-stat"><strong>🔥 ${gd.streak}</strong><small>Dni z rzędu</small></div>
        <div class="gami-stat"><strong>${glevel.icon}</strong><small>${glevel.name}</small></div>
        <div class="gami-stat"><strong>${gd.xp}</strong><small>XP</small></div>
        <div class="gami-stat"><strong>${gd.totalTests || 0}</strong><small>Testów</small></div>
      </div>
      <div style="font-size:0.82rem;color:var(--text-muted);margin-bottom:0.4rem;">
        ${gnext ? `Do poziomu <strong>${gnext.icon} ${gnext.name}</strong>: ${gnext.min - gd.xp} XP` : '🏆 Osiągnięty maksymalny poziom!'}
      </div>
      <div class="progress-bar-wrap"><div class="progress-bar" style="width:${gpct}%;background:${glevel.color}"></div></div>`;

    // Leaderboard
    const lbContainer = document.getElementById('leaderboardContainer');
    if (lbContainer) Auth.loadLeaderboard(lbContainer);

    const topicsEl = document.getElementById('topicsPreview');
    const unstudierd = topics.filter(t => !t.studied).slice(0, 5);
    if (unstudierd.length) {
      topicsEl.innerHTML = unstudierd.map(t => {
        const prio = { low: '🟢', medium: '🟡', high: '🔴' }[t.priority] || '🟡';
        return `<div style="padding:0.4rem 0;border-bottom:1px solid var(--border);font-size:0.88rem;">
          ${prio} ${t.name}</div>`;
      }).join('');
    } else if (topics.length) {
      topicsEl.innerHTML = '<p class="empty-msg">Wszystkie tematy opanowane! 🎉</p>';
    } else {
      topicsEl.innerHTML = '<p class="empty-msg">Brak tematów.</p>';
    }
  }

  function loadSettings() {
    const s = Storage.getSettings();
    document.getElementById('settingsApiKey').value = s.apiKey || '';
    document.getElementById('settingsModel').value = s.model || 'gemini-1.5-flash';
    document.getElementById('settingsExam').value = s.exam || '';
    document.getElementById('settingsName').value = s.name || '';
    const provider = s.provider || 'local';
    document.getElementById('settingsProvider').value = provider;
    updateProviderUI(provider);
  }

  function updateProviderUI(provider) {
    document.getElementById('providerInfoBuiltin').style.display = provider === 'local'   ? '' : 'none';
    document.getElementById('providerInfoGemini').style.display  = provider === 'gemini'  ? '' : 'none';
    document.getElementById('providerInfoOpenAI').style.display  = provider === 'openai'  ? '' : 'none';

    const needsKey = provider !== 'local';
    const keyInput = document.getElementById('settingsApiKey');
    keyInput.disabled = !needsKey;
    keyInput.placeholder = provider === 'gemini' ? 'AIza...' : provider === 'openai' ? 'sk-...' : 'Nie wymagany dla lokalnego AI';
    document.getElementById('apiKeyLabel').textContent =
      provider === 'gemini' ? 'Klucz Google Gemini API' :
      provider === 'openai' ? 'Klucz OpenAI API' : 'Klucz API (niepotrzebny dla lokalnego AI)';
    document.getElementById('modelGroup').style.display = needsKey ? '' : 'none';
  }

  document.getElementById('settingsProvider').addEventListener('change', e => {
    const p = e.target.value;
    updateProviderUI(p);
    if (p === 'gemini') document.getElementById('settingsModel').value = 'gemini-1.5-flash';
    if (p === 'openai') document.getElementById('settingsModel').value = 'gpt-4o-mini';
  });

  document.getElementById('btnSaveSettings').addEventListener('click', () => {
    const s = Storage.getSettings();
    s.apiKey = document.getElementById('settingsApiKey').value.trim();
    s.model = document.getElementById('settingsModel').value;
    s.provider = document.getElementById('settingsProvider').value;
    Storage.saveSettings(s);
    const msg = document.getElementById('settingsSaved');
    msg.style.display = 'block';
    setTimeout(() => msg.style.display = 'none', 2500);
  });

  document.getElementById('btnSaveProfile').addEventListener('click', () => {
    const s = Storage.getSettings();
    s.name = document.getElementById('settingsName').value.trim();
    s.exam = document.getElementById('settingsExam').value.trim();
    Storage.saveSettings(s);
    updateDashboard();
    alert('Profil zapisany!');
  });

  document.getElementById('btnClearData').addEventListener('click', () => {
    if (confirm('Czy na pewno chcesz usunąć wszystkie dane? Tej operacji nie można cofnąć.')) {
      Storage.clearAll();
      updateDashboard();
      alert('Dane zostały usunięte.');
    }
  });

  return { init, goto, openModal, closeModal, updateDashboard, hidePremiumUI, closeMobileSidebar };
})();

document.addEventListener('DOMContentLoaded', () => App.init());
