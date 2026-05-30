const express = require('express');
const router  = express.Router();
const db      = require('../db');
const { auth } = require('./auth');

function adminAuth(req, res, next) {
  auth(req, res, () => {
    const user = db.prepare('SELECT is_admin FROM users WHERE id = ?').get(req.user.id);
    if (!user?.is_admin) return res.status(403).json({ error: 'Brak dostępu' });
    next();
  });
}

// ── User routes ──────────────────────────────────────────────────

// POST /api/tickets — create ticket
router.post('/', auth, (req, res) => {
  const { subject, category, message } = req.body || {};
  if (!subject?.trim() || !message?.trim())
    return res.status(400).json({ error: 'Temat i wiadomość są wymagane' });

  const result = db.prepare(
    'INSERT INTO tickets (user_id, subject, category, message) VALUES (?, ?, ?, ?)'
  ).run(req.user.id, subject.trim(), category || 'general', message.trim());

  res.json({ id: result.lastInsertRowid });
});

// GET /api/tickets — list own tickets
router.get('/', auth, (req, res) => {
  const tickets = db.prepare(`
    SELECT t.*, u.username,
      (SELECT COUNT(*) FROM ticket_replies WHERE ticket_id = t.id) as reply_count
    FROM tickets t JOIN users u ON t.user_id = u.id
    WHERE t.user_id = ?
    ORDER BY t.created_at DESC
  `).all(req.user.id);
  res.json(tickets);
});

// GET /api/tickets/:id — get ticket + replies (own or admin)
router.get('/:id', auth, (req, res) => {
  const ticket = db.prepare(
    'SELECT t.*, u.username FROM tickets t JOIN users u ON t.user_id = u.id WHERE t.id = ?'
  ).get(req.params.id);

  if (!ticket) return res.status(404).json({ error: 'Nie znaleziono zgłoszenia' });

  const isAdmin = db.prepare('SELECT is_admin FROM users WHERE id = ?').get(req.user.id)?.is_admin;
  if (ticket.user_id !== req.user.id && !isAdmin)
    return res.status(403).json({ error: 'Brak dostępu' });

  const replies = db.prepare(`
    SELECT r.*, u.username FROM ticket_replies r
    JOIN users u ON r.user_id = u.id
    WHERE r.ticket_id = ?
    ORDER BY r.created_at ASC
  `).all(req.params.id);

  res.json({ ...ticket, replies });
});

// POST /api/tickets/:id/reply — add reply (own or admin)
router.post('/:id/reply', auth, (req, res) => {
  const { message } = req.body || {};
  if (!message?.trim()) return res.status(400).json({ error: 'Wiadomość jest wymagana' });

  const ticket = db.prepare('SELECT * FROM tickets WHERE id = ?').get(req.params.id);
  if (!ticket) return res.status(404).json({ error: 'Nie znaleziono zgłoszenia' });

  const isAdmin = db.prepare('SELECT is_admin FROM users WHERE id = ?').get(req.user.id)?.is_admin;
  if (ticket.user_id !== req.user.id && !isAdmin)
    return res.status(403).json({ error: 'Brak dostępu' });

  if (ticket.status === 'closed' && !isAdmin)
    return res.status(400).json({ error: 'Zgłoszenie jest zamknięte' });

  db.prepare(
    'INSERT INTO ticket_replies (ticket_id, user_id, message, is_admin) VALUES (?, ?, ?, ?)'
  ).run(ticket.id, req.user.id, message.trim(), isAdmin ? 1 : 0);

  // Auto set to in_progress when user replies to closed-ish ticket
  if (ticket.status === 'open' && !isAdmin) {
    db.prepare("UPDATE tickets SET status = 'open' WHERE id = ?").run(ticket.id);
  }

  res.json({ ok: true });
});

// ── Admin routes ─────────────────────────────────────────────────

// GET /api/tickets/admin/all — all tickets
router.get('/admin/all', adminAuth, (req, res) => {
  const tickets = db.prepare(`
    SELECT t.*, u.username, u.email,
      (SELECT COUNT(*) FROM ticket_replies WHERE ticket_id = t.id) as reply_count,
      (SELECT COUNT(*) FROM ticket_replies WHERE ticket_id = t.id AND is_admin = 0) as user_reply_count
    FROM tickets t JOIN users u ON t.user_id = u.id
    ORDER BY
      CASE t.status WHEN 'open' THEN 0 WHEN 'in_progress' THEN 1 ELSE 2 END,
      t.created_at DESC
  `).all();
  res.json(tickets);
});

// PATCH /api/tickets/admin/:id/status — update status
router.patch('/admin/:id/status', adminAuth, (req, res) => {
  const { status } = req.body || {};
  if (!['open', 'in_progress', 'closed'].includes(status))
    return res.status(400).json({ error: 'Nieprawidłowy status' });

  db.prepare('UPDATE tickets SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json({ ok: true });
});

// GET /api/tickets/admin/users — all users list
router.get('/admin/users', adminAuth, (req, res) => {
  const users = db.prepare(`
    SELECT u.id, u.username, u.email, u.is_premium, u.is_admin, u.created_at,
      s.xp, s.streak, s.total_tests,
      (SELECT COUNT(*) FROM tickets WHERE user_id = u.id) as ticket_count
    FROM users u
    LEFT JOIN user_stats s ON s.user_id = u.id
    ORDER BY u.created_at DESC
  `).all();
  res.json(users);
});

// PATCH /api/tickets/admin/users/:id — toggle premium/admin
router.patch('/admin/users/:id', adminAuth, (req, res) => {
  const { is_premium, is_admin } = req.body || {};
  if (is_premium !== undefined)
    db.prepare('UPDATE users SET is_premium = ? WHERE id = ?').run(is_premium ? 1 : 0, req.params.id);
  if (is_admin !== undefined)
    db.prepare('UPDATE users SET is_admin = ? WHERE id = ?').run(is_admin ? 1 : 0, req.params.id);
  res.json({ ok: true });
});

module.exports = router;
