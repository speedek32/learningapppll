const Topics = (() => {
  let editingId = null;

  function render(filter = '') {
    const topics = Storage.getTopics();
    const list = document.getElementById('topicsList');
    const q = filter.toLowerCase();
    const filtered = q
      ? topics.filter(t => t.name.toLowerCase().includes(q) || (t.desc || '').toLowerCase().includes(q))
      : topics;

    if (!filtered.length) {
      list.innerHTML = `<p class="empty-msg">${filter ? 'Brak wyników.' : 'Brak tematów. Kliknij „Nowy temat" aby dodać.'}</p>`;
      return;
    }

    const studied = filtered.filter(t => t.studied).length;
    const pct = filtered.length ? Math.round(studied / filtered.length * 100) : 0;

    list.innerHTML = `
      <div style="margin-bottom:1rem;">
        <div style="display:flex;justify-content:space-between;font-size:0.85rem;color:var(--text-muted);margin-bottom:0.3rem;">
          <span>Postęp nauki</span>
          <span>${studied}/${filtered.length} (${pct}%)</span>
        </div>
        <div class="progress-bar-wrap"><div class="progress-bar" style="width:${pct}%"></div></div>
      </div>
      ${filtered.map(topic => {
        const priorityLabel = { low: '🟢 Niski', medium: '🟡 Średni', high: '🔴 Wysoki' }[topic.priority] || '🟡 Średni';
        const priorityClass = `priority-${topic.priority || 'medium'}`;
        return `
          <div class="topic-item ${topic.studied ? 'studied' : ''}" data-id="${topic.id}">
            <button class="topic-check" data-toggle="${topic.id}" title="${topic.studied ? 'Oznacz jako nieopanowany' : 'Oznacz jako opanowany'}">
              ${topic.studied ? '✓' : ''}
            </button>
            <div class="topic-body">
              <div class="topic-name">${escHtml(topic.name)}</div>
              ${topic.desc ? `<div class="topic-desc">${escHtml(topic.desc)}</div>` : ''}
              <span class="topic-priority ${priorityClass}">${priorityLabel}</span>
            </div>
            <div class="topic-actions">
              <button class="btn-icon" data-chat="${topic.id}" title="Zapytaj AI">🤖</button>
              <button class="btn-icon" data-edit="${topic.id}" title="Edytuj">✏️</button>
              <button class="btn-icon danger" data-delete="${topic.id}" title="Usuń">🗑️</button>
            </div>
          </div>`;
      }).join('')}`;

    list.querySelectorAll('[data-toggle]').forEach(btn => {
      btn.addEventListener('click', () => toggleStudied(btn.dataset.toggle));
    });

    list.querySelectorAll('[data-edit]').forEach(btn => {
      btn.addEventListener('click', () => openEdit(btn.dataset.edit));
    });

    list.querySelectorAll('[data-delete]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (confirm('Usunąć ten temat?')) {
          Storage.deleteTopic(btn.dataset.delete);
          render(filter);
          App.updateDashboard();
        }
      });
    });

    list.querySelectorAll('[data-chat]').forEach(btn => {
      btn.addEventListener('click', () => {
        Chat.setTopic(btn.dataset.chat);
        App.goto('chat');
      });
    });
  }

  function toggleStudied(id) {
    const topics = Storage.getTopics();
    const topic = topics.find(t => t.id === id);
    if (!topic) return;
    topic.studied = !topic.studied;
    Storage.saveTopic(topic);
    if (topic.studied) Gamification.addXP('topic_studied');
    render(document.getElementById('topicsSearch').value);
    App.updateDashboard();
  }

  function openEdit(id) {
    const topic = Storage.getTopics().find(t => t.id === id);
    if (!topic) return;
    editingId = id;
    document.getElementById('topicModalTitle').textContent = 'Edytuj temat';
    document.getElementById('topicName').value = topic.name;
    document.getElementById('topicDesc').value = topic.desc || '';
    document.getElementById('topicPriority').value = topic.priority || 'medium';
    App.openModal('topicModal');
  }

  function openAdd() {
    editingId = null;
    document.getElementById('topicModalTitle').textContent = 'Nowy temat';
    document.getElementById('topicName').value = '';
    document.getElementById('topicDesc').value = '';
    document.getElementById('topicPriority').value = 'medium';
    App.openModal('topicModal');
  }

  function saveTopic() {
    const name = document.getElementById('topicName').value.trim();
    if (!name) { alert('Podaj nazwę tematu.'); return; }

    const topic = {
      id: editingId || Storage.uid(),
      name,
      desc: document.getElementById('topicDesc').value.trim(),
      priority: document.getElementById('topicPriority').value,
      studied: editingId ? (Storage.getTopics().find(t => t.id === editingId)?.studied || false) : false,
      createdAt: new Date().toISOString()
    };

    Storage.saveTopic(topic);
    Gamification.addXP(editingId ? 'topic_added' : 'topic_added');
    App.closeModal('topicModal');
    render(document.getElementById('topicsSearch').value);
    App.updateDashboard();
  }

  function escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  document.getElementById('btnAddTopic').addEventListener('click', openAdd);
  document.getElementById('btnSaveTopic').addEventListener('click', saveTopic);
  document.getElementById('topicsSearch').addEventListener('input', e => render(e.target.value));

  return { render };
})();
