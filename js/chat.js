const Chat = (() => {
  let messages = [];
  let currentTopicId = null;
  let isTyping = false;
  let ollamaAvailable = null; // null=unknown, true/false

  // ── Provider: Ollama (server-side) ────────────────────────────

  async function checkOllama() {
    try {
      const data = await Auth.apiFetch('/api/ai/health');
      ollamaAvailable = data.ok;
      return data;
    } catch {
      ollamaAvailable = false;
      return { ok: false };
    }
  }

  async function callOllama(systemPrompt, msgs) {
    const data = await Auth.apiFetch('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ system: systemPrompt, messages: msgs.slice(-20) }),
    });
    return data.reply;
  }

  // ── Provider: Gemini ──────────────────────────────────────────

  async function callGemini(apiKey, model, systemPrompt, msgs) {
    const contents = msgs.slice(-20).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: { temperature: 0.7, maxOutputTokens: 1500 }
        })
      }
    );
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Błąd HTTP ${res.status}`);
    }
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '(brak odpowiedzi)';
  }

  // ── Provider: OpenAI ─────────────────────────────────────────

  async function callOpenAI(apiKey, model, systemPrompt, msgs) {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: systemPrompt }, ...msgs.slice(-20)],
        temperature: 0.7,
        max_tokens: 1500
      })
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error?.message || `Błąd HTTP ${res.status}`);
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content || '(brak odpowiedzi)';
  }

  // ── Main send ─────────────────────────────────────────────────

  async function sendMessage() {
    if (isTyping) return;
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    const settings = Storage.getSettings();
    const provider = settings.provider || 'ollama';

    input.value = '';
    appendBubble('user', text);
    messages.push({ role: 'user', content: text });

    const topicContext = buildTopicContext();
    const examContext = settings.exam
      ? `Uczeń przygotowuje się do egzaminu zawodowego: ${settings.exam}.` : '';
    const systemPrompt = `Jesteś asystentem do nauki egzaminów zawodowych w Polsce (egzaminy OKE/CKE). ${examContext} ${topicContext} Odpowiadaj PO POLSKU, jasno i zwięźle. Używaj przykładów. Jeśli wyjaśniasz pojęcia techniczne, podawaj definicje. Możesz używać Markdown (pogrubienie, listy, kod).`;

    const thinkingEl = appendThinking();
    isTyping = true;

    try {
      let reply;

      if (provider === 'ollama') {
        reply = await callOllama(systemPrompt, messages);

      } else if (provider === 'gemini') {
        if (!settings.apiKey) { thinkingEl.remove(); messages.pop(); promptForKey('Gemini'); return; }
        reply = await callGemini(settings.apiKey, settings.model || 'gemini-2.0-flash', systemPrompt, messages);

      } else if (provider === 'openai') {
        if (!settings.apiKey) { thinkingEl.remove(); messages.pop(); promptForKey('OpenAI'); return; }
        reply = await callOpenAI(settings.apiKey, settings.model || 'gpt-4o-mini', systemPrompt, messages);

      } else {
        throw new Error('Nieznany dostawca AI. Sprawdź ustawienia.');
      }

      thinkingEl.remove();
      messages.push({ role: 'assistant', content: reply });
      appendBubble('assistant', reply, true);

    } catch (err) {
      thinkingEl.remove();
      appendBubble('assistant', `❌ ${err.message}`);
      messages.pop();
    } finally {
      isTyping = false;
    }
  }

  function promptForKey(name) {
    alert(`Brak klucza ${name} API!\nPrzejdź do Ustawień i podaj swój klucz.`);
    App.goto('settings');
  }

  // ── Chat helpers ──────────────────────────────────────────────

  function buildTopicContext() {
    if (!currentTopicId) return '';
    const topic = Storage.getTopics().find(t => t.id === currentTopicId);
    if (!topic) return '';
    return `Aktualny temat nauki: "${topic.name}". ${topic.desc ? 'Opis: ' + topic.desc : ''}`;
  }

  function appendBubble(role, text, markdown = false) {
    const msgs = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = `chat-bubble ${role}`;
    const content = markdown ? renderMarkdown(text) : escHtml(text).replace(/\n/g, '<br>');
    div.innerHTML = `<div class="bubble-content">${content}</div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  function appendThinking() {
    const msgs = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'chat-bubble assistant';
    div.innerHTML = `<div class="chat-thinking"><span></span><span></span><span></span></div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    return div;
  }

  function renderMarkdown(text) {
    return text
      .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/^### (.+)$/gm, '<h4>$1</h4>')
      .replace(/^## (.+)$/gm, '<h3>$1</h3>')
      .replace(/^# (.+)$/gm, '<h2>$1</h2>')
      .replace(/^\* (.+)$/gm, '<li>$1</li>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
  }

  function escHtml(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // ── Init & status ─────────────────────────────────────────────

  async function init() {
    populateTopicSelect();
    await updateStatusBadge();
  }

  async function updateStatusBadge() {
    const el = document.getElementById('chatAIStatus');
    if (!el) return;
    const provider = Storage.getSettings().provider || 'ollama';

    if (provider === 'ollama') {
      el.innerHTML = '🔄 Sprawdzam połączenie z AI...';
      el.style.color = 'var(--text-muted)';
      const health = await checkOllama();
      if (health.ok) {
        el.innerHTML = `✅ <strong>Zdaj+ AI gotowy</strong> – model: <code>${health.active}</code>`;
        el.style.color = 'var(--success)';
      } else {
        el.innerHTML = '❌ <strong>AI niedostępny.</strong> Sprawdź czy Ollama działa na serwerze, lub zmień dostawcę w Ustawieniach.';
        el.style.color = 'var(--danger)';
      }
    } else if (provider === 'gemini') {
      el.innerHTML = '🆓 Używasz <strong>Google Gemini API</strong>.';
      el.style.color = 'var(--primary)';
    } else if (provider === 'openai') {
      el.innerHTML = '💳 Używasz <strong>OpenAI API</strong>.';
      el.style.color = 'var(--primary)';
    }
  }

  function populateTopicSelect() {
    const sel = document.getElementById('chatTopicSelect');
    const topics = Storage.getTopics();
    const current = sel.value;
    sel.innerHTML = '<option value="">Wybierz temat (opcjonalnie)</option>';
    topics.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t.id;
      opt.textContent = t.name;
      sel.appendChild(opt);
    });
    if (current) sel.value = current;
  }

  function setTopic(id) {
    currentTopicId = id;
    const topic = Storage.getTopics().find(t => t.id === id);
    if (!topic) return;
    document.getElementById('chatTopicSelect').value = id;
    const hint = document.createElement('div');
    hint.className = 'chat-bubble assistant';
    hint.innerHTML = `<div class="bubble-content">📌 Temat: <strong>${escHtml(topic.name)}</strong>${topic.desc ? `<br><span style="font-size:0.85em;color:var(--text-muted)">${escHtml(topic.desc)}</span>` : ''}<br><br>Możesz teraz zadawać pytania dotyczące tego tematu!</div>`;
    document.getElementById('chatMessages').appendChild(hint);
    document.getElementById('chatMessages').scrollTop = 99999;
  }

  function newChat() {
    messages = [];
    currentTopicId = null;
    document.getElementById('chatTopicSelect').value = '';
    document.getElementById('chatMessages').innerHTML = `
      <div class="chat-bubble assistant">
        <div class="bubble-content">
          Cześć! Jestem Twoim asystentem do nauki egzaminów zawodowych.<br><br>
          Zapytaj mnie o dowolny temat – wyjaśnię pojęcia, pomogę zrozumieć zagadnienia i przygotować się do testu.<br><br>
          <span id="chatAIStatus" style="font-size:0.88em;"></span>
        </div>
      </div>`;
    updateStatusBadge();
  }

  // Events
  document.getElementById('btnSendChat').addEventListener('click', sendMessage);
  document.getElementById('btnNewChat').addEventListener('click', newChat);
  document.getElementById('chatInput').addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  });
  document.getElementById('chatTopicSelect').addEventListener('change', e => {
    currentTopicId = e.target.value || null;
  });

  return { init, setTopic, newChat };
})();
