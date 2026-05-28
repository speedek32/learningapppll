const Profile = (() => {
  function render() {
    const container = document.getElementById('profileContent');
    const user      = Auth.getUser();
    const gd        = Gamification.getData();
    const glevel    = Gamification.getLevel(gd.xp);
    const results   = Storage.getResults();
    const settings  = Storage.getSettings();

    const avgByCategory = {};
    results.forEach(r => {
      const pct = Math.round(r.score / r.total * 100);
      if (!avgByCategory[r.category]) avgByCategory[r.category] = { sum: 0, count: 0 };
      avgByCategory[r.category].sum   += pct;
      avgByCategory[r.category].count += 1;
    });

    const categoryRows = Object.entries(avgByCategory)
      .sort((a, b) => b[1].sum / b[1].count - a[1].sum / a[1].count)
      .map(([cat, { sum, count }]) => {
        const avg  = Math.round(sum / count);
        const pass = avg >= 50;
        return `<div class="profile-cat-row">
          <span class="profile-cat-name">${escHtml(cat)}</span>
          <span class="profile-cat-count">${count} ${count === 1 ? 'test' : 'testy/testów'}</span>
          <span class="profile-cat-avg ${pass ? 'pass' : 'fail'}">${avg}%</span>
        </div>`;
      }).join('');

    const major = settings.exam ? escHtml(settings.exam) : '<span class="empty-msg" style="font-size:0.9rem;">Nie ustawiono — uzupełnij w Ustawieniach</span>';

    const userBlock = user
      ? `<div class="profile-avatar">${escHtml(user.username[0].toUpperCase())}</div>
         <div class="profile-name">${escHtml(user.username)}${user.is_premium ? ' <span class="premium-star" title="Pass+ Premium">⭐</span>' : ''}</div>
         <div class="profile-email" style="color:var(--text-muted);font-size:0.88rem;">${escHtml(user.email || '')}</div>`
      : `<div class="profile-avatar">?</div>
         <div class="profile-name" style="color:var(--text-muted);">Niezalogowany</div>`;

    container.innerHTML = `
      <div class="profile-hero">
        ${userBlock}
      </div>

      <div class="profile-grid">
        <div class="card profile-stat-card">
          <div class="profile-stat-icon">🔥</div>
          <div class="profile-stat-value">${gd.streak}</div>
          <div class="profile-stat-label">Dni z rzędu</div>
        </div>
        <div class="card profile-stat-card">
          <div class="profile-stat-icon">${glevel.icon}</div>
          <div class="profile-stat-value" style="font-size:1rem;">${glevel.name}</div>
          <div class="profile-stat-label">${gd.xp} XP</div>
        </div>
        <div class="card profile-stat-card">
          <div class="profile-stat-icon">📋</div>
          <div class="profile-stat-value">${results.length}</div>
          <div class="profile-stat-label">Testów razem</div>
        </div>
        <div class="card profile-stat-card">
          <div class="profile-stat-icon">✅</div>
          <div class="profile-stat-value">${results.filter(r => Math.round(r.score / r.total * 100) >= 50).length}</div>
          <div class="profile-stat-label">Zdanych testów</div>
        </div>
      </div>

      <div class="card" style="margin-bottom:1rem;">
        <h2>🎓 Kierunek zawodowy</h2>
        <p class="profile-major">${major}</p>
      </div>

      <div class="card" style="margin-bottom:1.5rem;">
        <h2>📊 Wyniki per egzamin</h2>
        ${categoryRows.length
          ? `<div class="profile-cat-list">${categoryRows}</div>`
          : '<p class="empty-msg">Nie rozwiązałeś jeszcze żadnego testu.</p>'
        }
      </div>

      ${user
        ? `<button class="btn-danger profile-logout" id="profileLogoutBtn">Wyloguj się</button>`
        : `<button class="btn-primary" style="width:100%;" onclick="App.openModal('authModal')">👤 Zaloguj / Zarejestruj się</button>`
      }
    `;

    if (user) {
      document.getElementById('profileLogoutBtn').addEventListener('click', () => {
        if (confirm('Wylogować się?')) Auth.logout();
      });
    }
  }

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  return { render };
})();
