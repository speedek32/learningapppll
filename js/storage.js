const Storage = (() => {
  const KEY = 'egzaminpro_';

  function get(k) {
    try { return JSON.parse(localStorage.getItem(KEY + k)) || null; } catch { return null; }
  }

  function set(k, v) {
    localStorage.setItem(KEY + k, JSON.stringify(v));
  }

  function getNotes()    { return get('notes')    || []; }
  function getTopics()   { return get('topics')   || []; }
  function getResults()  { return get('results')  || []; }
  function getSettings() { return get('settings') || { apiKey: '', model: 'gemini-1.5-flash', provider: 'local', name: '', exam: '' }; }
  function getChats()    { return get('chats')    || []; }

  function saveNote(note) {
    const notes = getNotes();
    const idx = notes.findIndex(n => n.id === note.id);
    if (idx >= 0) notes[idx] = note; else notes.unshift(note);
    set('notes', notes);
  }

  function deleteNote(id) {
    set('notes', getNotes().filter(n => n.id !== id));
  }

  function saveTopic(topic) {
    const topics = getTopics();
    const idx = topics.findIndex(t => t.id === topic.id);
    if (idx >= 0) topics[idx] = topic; else topics.unshift(topic);
    set('topics', topics);
  }

  function deleteTopic(id) {
    set('topics', getTopics().filter(t => t.id !== id));
  }

  function saveResult(result) {
    const results = getResults();
    results.unshift(result);
    if (results.length > 50) results.length = 50;
    set('results', results);
  }

  function saveSettings(s) { set('settings', s); }

  function saveChat(chat) {
    const chats = getChats();
    const idx = chats.findIndex(c => c.id === chat.id);
    if (idx >= 0) chats[idx] = chat; else chats.unshift(chat);
    if (chats.length > 20) chats.length = 20;
    set('chats', chats);
  }

  function clearAll() {
    ['notes','topics','results','chats'].forEach(k => localStorage.removeItem(KEY + k));
  }

  function uid() {
    return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  return { get, set, getNotes, getTopics, getResults, getSettings, getChats,
           saveNote, deleteNote, saveTopic, deleteTopic, saveResult, saveSettings, saveChat,
           clearAll, uid, formatDate };
})();
