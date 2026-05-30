const express = require('express');
const router  = express.Router();
const db      = require('../db');
const { auth } = require('./auth');

function isAdmin(userId) {
  return !!db.prepare('SELECT is_admin FROM users WHERE id = ?').get(userId)?.is_admin;
}

// GET /api/questions — own questions (or all for admin)
router.get('/', auth, (req, res) => {
  const admin = isAdmin(req.user.id);
  const rows = admin
    ? db.prepare(`
        SELECT q.*, u.username FROM custom_questions q
        JOIN users u ON q.user_id = u.id
        ORDER BY q.created_at DESC
      `).all()
    : db.prepare(`
        SELECT q.*, u.username FROM custom_questions q
        JOIN users u ON q.user_id = u.id
        WHERE q.user_id = ?
        ORDER BY q.created_at DESC
      `).all(req.user.id);

  res.json(rows.map(r => ({ ...r, options: JSON.parse(r.options) })));
});

// POST /api/questions — create
router.post('/', auth, (req, res) => {
  const { category, question, options, answer, explanation } = req.body || {};
  if (!question?.trim()) return res.status(400).json({ error: 'Pytanie jest wymagane' });
  if (!Array.isArray(options) || options.length < 2)
    return res.status(400).json({ error: 'Wymagane minimum 2 odpowiedzi' });
  if (answer === undefined || answer < 0 || answer >= options.length)
    return res.status(400).json({ error: 'Nieprawidłowy indeks poprawnej odpowiedzi' });

  const result = db.prepare(
    'INSERT INTO custom_questions (user_id, category, question, options, answer, explanation) VALUES (?, ?, ?, ?, ?, ?)'
  ).run(req.user.id, (category || 'Własne').trim(), question.trim(), JSON.stringify(options), answer, (explanation || '').trim());

  res.json({ id: result.lastInsertRowid });
});

// PUT /api/questions/:id — update (own or admin)
router.put('/:id', auth, (req, res) => {
  const q = db.prepare('SELECT * FROM custom_questions WHERE id = ?').get(req.params.id);
  if (!q) return res.status(404).json({ error: 'Nie znaleziono pytania' });
  if (q.user_id !== req.user.id && !isAdmin(req.user.id))
    return res.status(403).json({ error: 'Brak dostępu' });

  const { category, question, options, answer, explanation } = req.body || {};
  db.prepare(`
    UPDATE custom_questions SET category=?, question=?, options=?, answer=?, explanation=? WHERE id=?
  `).run(
    (category || q.category).trim(),
    (question || q.question).trim(),
    JSON.stringify(Array.isArray(options) ? options : JSON.parse(q.options)),
    answer ?? q.answer,
    (explanation ?? q.explanation ?? '').trim(),
    req.params.id
  );
  res.json({ ok: true });
});

// DELETE /api/questions/:id — own or admin
router.delete('/:id', auth, (req, res) => {
  const q = db.prepare('SELECT * FROM custom_questions WHERE id = ?').get(req.params.id);
  if (!q) return res.status(404).json({ error: 'Nie znaleziono pytania' });
  if (q.user_id !== req.user.id && !isAdmin(req.user.id))
    return res.status(403).json({ error: 'Brak dostępu' });

  db.prepare('DELETE FROM custom_questions WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
