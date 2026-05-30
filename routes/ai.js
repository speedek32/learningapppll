const express = require('express');
const router  = express.Router();

const OLLAMA_URL   = process.env.OLLAMA_URL   || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'qwen2.5:3b';

// GET /api/ai/health — check if Ollama is reachable
router.get('/health', async (req, res) => {
  try {
    const r = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(3000) });
    if (!r.ok) return res.json({ ok: false });
    const data = await r.json();
    const models = (data.models || []).map(m => m.name);
    res.json({ ok: true, models, active: OLLAMA_MODEL });
  } catch {
    res.json({ ok: false });
  }
});

// POST /api/ai/chat — proxy to Ollama
router.post('/chat', async (req, res) => {
  const { messages, system } = req.body || {};
  if (!messages?.length) return res.status(400).json({ error: 'Brak wiadomości' });

  const payload = {
    model: OLLAMA_MODEL,
    stream: false,
    messages: [
      { role: 'system', content: system || 'Jesteś pomocnym asystentem do nauki egzaminów zawodowych w Polsce. Odpowiadaj po polsku.' },
      ...messages.slice(-20)
    ]
  };

  try {
    const r = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(120_000)
    });

    if (!r.ok) {
      const txt = await r.text();
      console.error('[Ollama] HTTP', r.status, txt);
      return res.status(502).json({ error: `Ollama (${r.status}): ${txt}` });
    }

    const data = await r.json();
    console.log('[Ollama] response keys:', Object.keys(data));
    const reply = data.message?.content || data.response || '(brak odpowiedzi)';
    res.json({ reply });

  } catch (err) {
    if (err.name === 'TimeoutError') {
      return res.status(504).json({ error: 'Model AI nie odpowiedział w czasie. Spróbuj ponownie.' });
    }
    res.status(503).json({ error: `Nie można połączyć z Ollama: ${err.message}` });
  }
});

module.exports = router;
