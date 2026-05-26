const Notes = (() => {
  let editingId = null;
  let currentViewId = null;
  let pendingFile = null;

  function render(filter = '') {
    const notes = Storage.getNotes();
    const grid = document.getElementById('notesGrid');
    const q = filter.toLowerCase();
    const filtered = q
      ? notes.filter(n => n.title.toLowerCase().includes(q) || (n.content || '').toLowerCase().includes(q) || (n.tags || []).join(' ').toLowerCase().includes(q))
      : notes;

    if (!filtered.length) {
      grid.innerHTML = `<p class="empty-msg">${filter ? 'Brak wyników.' : 'Brak notatek. Kliknij „Nowa notatka" aby dodać.'}</p>`;
      return;
    }

    grid.innerHTML = filtered.map(note => {
      const tags = (note.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
      const preview = note.type === 'image'
        ? '<em>📷 Obraz</em>'
        : (note.content || '').slice(0, 120);
      return `
        <div class="note-card" data-id="${note.id}">
          <span class="note-type-badge">${note.type === 'image' ? '🖼️' : note.type === 'file' ? '📄' : '📝'}</span>
          <div class="note-card-title">${escHtml(note.title)}</div>
          <div class="note-card-preview">${escHtml(preview)}</div>
          <div class="note-tags">${tags}</div>
          <div class="note-card-meta">
            <span>${Storage.formatDate(note.createdAt)}</span>
            <button class="btn-icon danger" data-del="${note.id}" title="Usuń">🗑️</button>
          </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.note-card').forEach(card => {
      card.addEventListener('click', e => {
        if (!e.target.dataset.del) viewNote(card.dataset.id);
      });
    });

    grid.querySelectorAll('[data-del]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (confirm('Usunąć tę notatkę?')) {
          Storage.deleteNote(btn.dataset.del);
          render(filter);
          App.updateDashboard();
        }
      });
    });
  }

  function viewNote(id) {
    const note = Storage.getNotes().find(n => n.id === id);
    if (!note) return;
    currentViewId = id;
    document.getElementById('viewNoteTitle').textContent = note.title;
    const body = document.getElementById('viewNoteBody');
    if (note.type === 'image') {
      body.innerHTML = `<img src="${note.dataUrl}" style="max-width:100%;border-radius:8px;" /><p style="margin-top:0.75rem;font-size:0.85rem;color:var(--text-muted);">Plik: ${escHtml(note.filename || '')}</p>`;
    } else {
      const tags = (note.tags || []).map(t => `<span class="tag">${t}</span>`).join('');
      body.innerHTML = `
        <div class="note-tags" style="margin-bottom:0.75rem;">${tags}</div>
        <pre style="white-space:pre-wrap;font-family:inherit;font-size:0.9rem;line-height:1.6;">${escHtml(note.content || '')}</pre>
        <p style="margin-top:0.75rem;font-size:0.82rem;color:var(--text-muted);">Dodano: ${Storage.formatDate(note.createdAt)}</p>`;
    }
    App.openModal('viewNoteModal');
  }

  function openAddModal() {
    editingId = null;
    pendingFile = null;
    document.getElementById('noteModalTitle').textContent = 'Nowa notatka';
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteContent').value = '';
    document.getElementById('noteTags').value = '';
    document.getElementById('filePreview').style.display = 'none';
    document.getElementById('filePreview').innerHTML = '';
    switchTab('text');
    App.openModal('noteModal');
  }

  function switchTab(name) {
    document.querySelectorAll('#noteModal .tab').forEach(t => t.classList.toggle('active', t.dataset.tab === name));
    document.getElementById('tabText').classList.toggle('active', name === 'text');
    document.getElementById('tabFile').classList.toggle('active', name === 'file');
  }

  function saveNote() {
    const title = document.getElementById('noteTitle').value.trim();
    if (!title) { alert('Podaj tytuł notatki.'); return; }

    const activeTab = document.querySelector('#noteModal .tab.active')?.dataset.tab || 'text';
    const tags = document.getElementById('noteTags').value.split(',').map(t => t.trim()).filter(Boolean);

    let note;
    if (activeTab === 'file' && pendingFile) {
      note = { ...pendingFile, id: editingId || Storage.uid(), title, tags, createdAt: new Date().toISOString() };
    } else {
      const content = document.getElementById('noteContent').value.trim();
      if (!content) { alert('Wpisz treść notatki.'); return; }
      note = { id: editingId || Storage.uid(), title, content, type: 'text', tags, createdAt: new Date().toISOString() };
    }

    Storage.saveNote(note);
    Gamification.addXP('note_added');
    App.closeModal('noteModal');
    render(document.getElementById('notesSearch').value);
    App.updateDashboard();
  }

  function handleFile(file) {
    if (!file) return;
    const reader = new FileReader();
    const preview = document.getElementById('filePreview');

    if (file.type.startsWith('image/')) {
      reader.onload = e => {
        pendingFile = { type: 'image', dataUrl: e.target.result, filename: file.name, content: '' };
        preview.style.display = 'block';
        preview.innerHTML = `<img src="${e.target.result}" style="max-width:100%;border-radius:8px;margin-top:0.5rem;" /><p class="hint" style="margin-top:0.4rem;">${escHtml(file.name)}</p>`;
      };
      reader.readAsDataURL(file);
    } else if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      reader.onload = e => {
        pendingFile = { type: 'file', content: e.target.result, filename: file.name };
        preview.style.display = 'block';
        preview.innerHTML = `<pre>${escHtml(e.target.result.slice(0, 500))}${e.target.result.length > 500 ? '…' : ''}</pre>`;
      };
      reader.readAsText(file);
    } else {
      alert('Nieobsługiwany format. Użyj .txt, .jpg, .png lub .gif');
    }
  }

  function escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  // Wire up events
  document.getElementById('btnAddNote').addEventListener('click', openAddModal);
  document.getElementById('btnSaveNote').addEventListener('click', saveNote);

  document.querySelectorAll('#noteModal .tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  document.getElementById('notesSearch').addEventListener('input', e => render(e.target.value));

  document.getElementById('btnDeleteNoteConfirm').addEventListener('click', () => {
    if (currentViewId && confirm('Usunąć tę notatkę?')) {
      Storage.deleteNote(currentViewId);
      App.closeModal('viewNoteModal');
      render();
      App.updateDashboard();
    }
  });

  const dropZone = document.getElementById('fileDropZone');
  const fileInput = document.getElementById('fileInput');

  dropZone.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', e => handleFile(e.target.files[0]));

  dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('drag-over'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
  dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    handleFile(e.dataTransfer.files[0]);
  });

  return { render };
})();
