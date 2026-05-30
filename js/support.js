const Support = (() => {

  const CATEGORY_LABELS = {
    general:  'Ogólne',
    bug:      'Błąd',
    account:  'Konto',
    premium:  'Premium',
    content:  'Treści',
    other:    'Inne',
  };

  const STATUS_LABELS = {
    open:        'Otwarte',
    in_progress: 'W trakcie',
    closed:      'Zamknięte',
  };

  function init() {
    document.getElementById('btnNewTicket').addEventListener('click', () => {
      if (!Auth.getUser()) {
        App.openModal('authModal');
        return;
      }
      clearForm();
      App.openModal('ticketModal');
    });

    document.getElementById('btnSubmitTicket').addEventListener('click', submitTicket);
  }

  async function render() {
    const container = document.getElementById('supportContent');
    const user = Auth.getUser();

    if (!user) {
      container.innerHTML = `
        <div class="card" style="text-align:center;padding:2rem;">
          <p style="color:var(--text-muted);margin-bottom:1rem;">Zaloguj się, żeby wysłać zgłoszenie lub zobaczyć swoje sprawy.</p>
          <button class="btn-primary" onclick="App.openModal('authModal')">Zaloguj się</button>
        </div>`;
      return;
    }

    container.innerHTML = `<p class="empty-msg">Ładowanie zgłoszeń...</p>`;

    try {
      const tickets = await Auth.apiFetch('/api/tickets');
      renderList(container, tickets);
    } catch {
      container.innerHTML = `<p class="empty-msg">Błąd ładowania zgłoszeń.</p>`;
    }
  }

  function renderList(container, tickets) {
    if (!tickets.length) {
      container.innerHTML = `
        <div class="card" style="text-align:center;padding:2rem;">
          <p style="color:var(--text-muted);margin-bottom:0.5rem;font-size:1.1rem;font-weight:700;">Brak zgłoszeń</p>
          <p style="color:var(--text-muted);font-size:0.875rem;">Masz problem? Kliknij „Nowe zgłoszenie".</p>
        </div>`;
      return;
    }

    container.innerHTML = `
      <div class="tickets-list">
        ${tickets.map(t => `
          <div class="ticket-row" data-id="${t.id}" onclick="Support.openThread(${t.id})">
            <div class="ticket-row-main">
              <span class="ticket-status ticket-status--${t.status}">${STATUS_LABELS[t.status] || t.status}</span>
              <span class="ticket-subject">${escHtml(t.subject)}</span>
              <span class="ticket-cat">${CATEGORY_LABELS[t.category] || t.category}</span>
            </div>
            <div class="ticket-row-meta">
              <span>${formatDate(t.created_at)}</span>
              <span>${t.reply_count} ${t.reply_count === 1 ? 'odpowiedź' : 'odpowiedzi'}</span>
            </div>
          </div>
        `).join('')}
      </div>`;
  }

  async function openThread(id) {
    const modal = document.getElementById('ticketThreadModal');
    const title = document.getElementById('ticketThreadTitle');
    const body  = document.getElementById('ticketThreadBody');
    const footer = document.getElementById('ticketThreadFooter');

    body.innerHTML = `<p class="empty-msg">Ładowanie...</p>`;
    footer.innerHTML = '';
    title.textContent = 'Zgłoszenie';
    App.openModal('ticketThreadModal');

    try {
      const ticket = await Auth.apiFetch(`/api/tickets/${id}`);
      title.textContent = escHtml(ticket.subject);

      const isAdmin = Auth.getUser()?.is_admin;

      body.innerHTML = `
        <div class="ticket-meta-bar">
          <span class="ticket-status ticket-status--${ticket.status}">${STATUS_LABELS[ticket.status]}</span>
          <span style="color:var(--text-muted);font-size:0.8rem;">${CATEGORY_LABELS[ticket.category] || ticket.category} · ${formatDate(ticket.created_at)}</span>
        </div>

        <div class="ticket-thread">
          <div class="ticket-msg ticket-msg--user">
            <div class="ticket-msg-header">
              <span class="ticket-msg-author">${escHtml(ticket.username)}</span>
              <span class="ticket-msg-time">${formatDate(ticket.created_at)}</span>
            </div>
            <div class="ticket-msg-body">${escHtml(ticket.message)}</div>
          </div>

          ${ticket.replies.map(r => `
            <div class="ticket-msg ${r.is_admin ? 'ticket-msg--admin' : 'ticket-msg--user'}">
              <div class="ticket-msg-header">
                <span class="ticket-msg-author">${escHtml(r.username)}${r.is_admin ? ' <span class="admin-badge">Admin</span>' : ''}</span>
                <span class="ticket-msg-time">${formatDate(r.created_at)}</span>
              </div>
              <div class="ticket-msg-body">${escHtml(r.message)}</div>
            </div>
          `).join('')}
        </div>
      `;

      if (ticket.status !== 'closed' || isAdmin) {
        footer.innerHTML = `
          <textarea id="replyText" class="input-field" style="flex:1;resize:none;min-height:60px;" placeholder="Twoja odpowiedź..."></textarea>
          <div style="display:flex;gap:0.5rem;align-items:center;">
            ${isAdmin ? `
              <select id="replyStatus" class="input-field" style="width:auto;">
                <option value="">Nie zmieniaj statusu</option>
                <option value="open">Otwarte</option>
                <option value="in_progress">W trakcie</option>
                <option value="closed">Zamknij</option>
              </select>` : ''}
            <button class="btn-primary" onclick="Support.sendReply(${id})">Wyślij</button>
          </div>`;
        footer.style.flexDirection = 'column';
        footer.style.alignItems    = 'stretch';
        footer.style.gap           = '0.5rem';
      } else {
        footer.innerHTML = `<span style="color:var(--text-muted);font-size:0.875rem;">Zgłoszenie zamknięte.</span>`;
      }
    } catch {
      body.innerHTML = `<p class="empty-msg">Błąd ładowania zgłoszenia.</p>`;
    }
  }

  async function sendReply(ticketId) {
    const msg = document.getElementById('replyText')?.value?.trim();
    if (!msg) return;

    const statusEl = document.getElementById('replyStatus');

    try {
      await Auth.apiFetch(`/api/tickets/${ticketId}/reply`, {
        method: 'POST',
        body: JSON.stringify({ message: msg }),
      });

      if (statusEl?.value) {
        await Auth.apiFetch(`/api/tickets/admin/${ticketId}/status`, {
          method: 'PATCH',
          body: JSON.stringify({ status: statusEl.value }),
        });
      }

      openThread(ticketId);
    } catch (e) {
      alert(e.message || 'Błąd wysyłania odpowiedzi');
    }
  }

  async function submitTicket() {
    const subject  = document.getElementById('ticketSubject').value.trim();
    const category = document.getElementById('ticketCategory').value;
    const message  = document.getElementById('ticketMessage').value.trim();
    const errEl    = document.getElementById('ticketError');

    errEl.style.display = 'none';

    if (!subject || !message) {
      errEl.textContent = 'Wypełnij temat i wiadomość.';
      errEl.style.display = 'block';
      return;
    }

    const btn = document.getElementById('btnSubmitTicket');
    btn.disabled = true;
    btn.textContent = 'Wysyłanie...';

    try {
      await Auth.apiFetch('/api/tickets', {
        method: 'POST',
        body: JSON.stringify({ subject, category, message }),
      });
      App.closeModal('ticketModal');
      clearForm();
      render();
    } catch (e) {
      errEl.textContent = e.message || 'Błąd wysyłania zgłoszenia.';
      errEl.style.display = 'block';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Wyślij zgłoszenie';
    }
  }

  function clearForm() {
    document.getElementById('ticketSubject').value  = '';
    document.getElementById('ticketMessage').value  = '';
    document.getElementById('ticketCategory').value = 'general';
    const e = document.getElementById('ticketError');
    if (e) e.style.display = 'none';
  }

  function formatDate(str) {
    if (!str) return '';
    const d = new Date(str);
    return d.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  function escHtml(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
  }

  return { init, render, openThread, sendReply };
})();
