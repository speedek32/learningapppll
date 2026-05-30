const Admin = (() => {

  const STATUS_LABELS = { open: 'Otwarte', in_progress: 'W trakcie', closed: 'Zamknięte' };
  const CATEGORY_LABELS = { general: 'Ogólne', bug: 'Błąd', account: 'Konto', premium: 'Premium', content: 'Treści', other: 'Inne' };

  let activeTab = 'tickets';

  function init() {
    document.querySelectorAll('[data-admin-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-admin-tab]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('adminTicketsTab').classList.toggle('active', btn.dataset.adminTab === 'tickets');
        document.getElementById('adminUsersTab').classList.toggle('active', btn.dataset.adminTab === 'users');
        activeTab = btn.dataset.adminTab;
        if (activeTab === 'tickets') renderTickets();
        else renderUsers();
      });
    });
  }

  async function render() {
    await renderTickets();
  }

  async function renderTickets() {
    const el = document.getElementById('adminTicketsTab');
    el.innerHTML = `<p class="empty-msg">Ładowanie...</p>`;

    try {
      const tickets = await Auth.apiFetch('/api/tickets/admin/all');

      if (!tickets.length) {
        el.innerHTML = `<p class="empty-msg">Brak zgłoszeń.</p>`;
        return;
      }

      el.innerHTML = `
        <div class="admin-tickets-list">
          ${tickets.map(t => `
            <div class="ticket-row ticket-row--admin" onclick="Support.openThread(${t.id})">
              <div class="ticket-row-main">
                <span class="ticket-status ticket-status--${t.status}">${STATUS_LABELS[t.status] || t.status}</span>
                <span class="ticket-subject">${escHtml(t.subject)}</span>
                <span class="ticket-cat">${CATEGORY_LABELS[t.category] || t.category}</span>
              </div>
              <div class="ticket-row-meta">
                <span style="font-weight:600;">${escHtml(t.username)}</span>
                <span style="color:var(--text-muted);font-size:0.78rem;">${escHtml(t.email)}</span>
                <span>${formatDate(t.created_at)}</span>
                <span>${t.reply_count} odp.</span>
              </div>
            </div>
          `).join('')}
        </div>`;
    } catch (e) {
      el.innerHTML = `<p class="empty-msg">Błąd: ${e.message}</p>`;
    }
  }

  async function renderUsers() {
    const el = document.getElementById('adminUsersTab');
    el.innerHTML = `<p class="empty-msg">Ładowanie...</p>`;

    try {
      const users = await Auth.apiFetch('/api/tickets/admin/users');

      el.innerHTML = `
        <div class="admin-users-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Użytkownik</th>
                <th>Email</th>
                <th>XP</th>
                <th>Testy</th>
                <th>Zgłoszenia</th>
                <th>Premium</th>
                <th>Admin</th>
                <th>Dołączył</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td style="color:var(--text-muted);">${u.id}</td>
                  <td><strong>${escHtml(u.username)}</strong></td>
                  <td style="color:var(--text-muted);font-size:0.8rem;">${escHtml(u.email)}</td>
                  <td>${u.xp ?? 0}</td>
                  <td>${u.total_tests ?? 0}</td>
                  <td>${u.ticket_count}</td>
                  <td>
                    <button class="admin-toggle ${u.is_premium ? 'admin-toggle--on' : ''}"
                      onclick="Admin.togglePremium(${u.id}, ${u.is_premium ? 0 : 1}, this)">
                      ${u.is_premium ? 'TAK' : 'NIE'}
                    </button>
                  </td>
                  <td>
                    <button class="admin-toggle ${u.is_admin ? 'admin-toggle--on' : ''}"
                      onclick="Admin.toggleAdmin(${u.id}, ${u.is_admin ? 0 : 1}, this)">
                      ${u.is_admin ? 'TAK' : 'NIE'}
                    </button>
                  </td>
                  <td style="color:var(--text-muted);font-size:0.78rem;">${formatDate(u.created_at)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>`;
    } catch (e) {
      el.innerHTML = `<p class="empty-msg">Błąd: ${e.message}</p>`;
    }
  }

  async function togglePremium(userId, newVal, btn) {
    try {
      await Auth.apiFetch(`/api/tickets/admin/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({ is_premium: newVal }),
      });
      btn.textContent = newVal ? 'TAK' : 'NIE';
      btn.classList.toggle('admin-toggle--on', !!newVal);
      btn.setAttribute('onclick', `Admin.togglePremium(${userId}, ${newVal ? 0 : 1}, this)`);
    } catch (e) { alert(e.message); }
  }

  async function toggleAdmin(userId, newVal, btn) {
    if (!confirm(newVal ? `Nadać uprawnienia admina użytkownikowi ${userId}?` : `Odebrać uprawnienia admina?`)) return;
    try {
      await Auth.apiFetch(`/api/tickets/admin/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({ is_admin: newVal }),
      });
      btn.textContent = newVal ? 'TAK' : 'NIE';
      btn.classList.toggle('admin-toggle--on', !!newVal);
      btn.setAttribute('onclick', `Admin.toggleAdmin(${userId}, ${newVal ? 0 : 1}, this)`);
    } catch (e) { alert(e.message); }
  }

  function formatDate(str) {
    if (!str) return '';
    const d = new Date(str);
    return d.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  return { init, render, renderTickets, renderUsers, togglePremium, toggleAdmin };
})();
