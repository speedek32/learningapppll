const express = require('express');
const router  = express.Router();
const db      = require('../db');
const { auth } = require('./auth');

// POST /api/results  – save a test result and update server-side stats
router.post('/results', auth, (req, res) => {
  const { category, score, total, pass_score, passed } = req.body;

  db.prepare(`
    INSERT INTO results (user_id, category, score, total, pass_score, passed)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(req.user.id, category, score, total, pass_score || 50, passed ? 1 : 0);

  // XP calculation (mirrors client-side gamification)
  const xpEarned = 10 + (score * 2) + (passed ? 25 : 0);
  const today    = new Date().toISOString().split('T')[0];
  const stats    = db.prepare('SELECT * FROM user_stats WHERE user_id = ?').get(req.user.id) || {};

  let streak = stats.streak || 0;
  if (stats.last_activity !== today) {
    const prev = new Date(); prev.setDate(prev.getDate() - 1);
    const yStr = prev.toISOString().split('T')[0];
    streak = stats.last_activity === yStr ? streak + 1 : 1;
  }

  db.prepare(`
    UPDATE user_stats
    SET xp = xp + ?, streak = ?, last_activity = ?,
        total_tests = total_tests + 1, total_correct = total_correct + ?
    WHERE user_id = ?
  `).run(xpEarned, streak, today, score, req.user.id);

  res.json({ ok: true, xpEarned });
});

// GET /api/results – last 50 results for the logged-in user
router.get('/results', auth, (req, res) => {
  const rows = db.prepare(`
    SELECT category, score, total, pass_score, passed, date
    FROM results WHERE user_id = ? ORDER BY date DESC LIMIT 50
  `).all(req.user.id);
  res.json(rows);
});

// GET /api/leaderboard – top 20 players by XP
router.get('/leaderboard', (req, res) => {
  const rows = db.prepare(`
    SELECT u.username, s.xp, s.streak, s.total_tests, s.total_correct
    FROM users u
    JOIN user_stats s ON u.id = s.user_id
    ORDER BY s.xp DESC
    LIMIT 20
  `).all();
  res.json(rows);
});

module.exports = router;
