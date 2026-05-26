const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const db      = require('../db');

const SECRET = process.env.JWT_SECRET || 'passplus_dev_secret_change_in_production';

function signToken(user) {
  return jwt.sign({ id: user.id, username: user.username }, SECRET, { expiresIn: '30d' });
}

// Middleware – attach req.user if valid token
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'Brak autoryzacji' });
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Nieprawidłowy lub wygasły token' });
  }
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body || {};
  if (!username || !email || !password)
    return res.status(400).json({ error: 'Wypełnij wszystkie pola' });
  if (password.length < 6)
    return res.status(400).json({ error: 'Hasło musi mieć min. 6 znaków' });
  if (username.length < 3)
    return res.status(400).json({ error: 'Nazwa użytkownika min. 3 znaki' });

  try {
    const hash = await bcrypt.hash(password, 10);
    const r = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)').run(username, email, hash);
    db.prepare('INSERT INTO user_stats (user_id) VALUES (?)').run(r.lastInsertRowid);
    const user = { id: r.lastInsertRowid, username };
    res.json({ token: signToken(user), ...user, is_premium: 0 });
  } catch (e) {
    if (e.message.includes('UNIQUE'))
      return res.status(400).json({ error: 'Nazwa użytkownika lub email już zajęte' });
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user) return res.status(400).json({ error: 'Nieprawidłowy email lub hasło' });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(400).json({ error: 'Nieprawidłowy email lub hasło' });

  const stats = db.prepare('SELECT * FROM user_stats WHERE user_id = ?').get(user.id) || {};
  res.json({ token: signToken(user), id: user.id, username: user.username, is_premium: user.is_premium, stats });
});

// GET /api/auth/me
router.get('/me', auth, (req, res) => {
  const user  = db.prepare('SELECT id, username, email, is_premium FROM users WHERE id = ?').get(req.user.id);
  const stats = db.prepare('SELECT * FROM user_stats WHERE user_id = ?').get(req.user.id) || {};
  if (!user) return res.status(404).json({ error: 'Użytkownik nie istnieje' });
  res.json({ ...user, stats });
});

module.exports = { router, auth };
