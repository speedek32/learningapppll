require('dotenv').config();
const express  = require('express');
const http     = require('http');
const { Server } = require('socket.io');
const path     = require('path');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server);
const PORT   = process.env.PORT || 3000;

// Trust Cloudflare / reverse-proxy forwarded headers (X-Forwarded-For, X-Forwarded-Proto etc.)
app.set('trust proxy', 1);

// ── Middleware ───────────────────────────────────────────────────
// Raw body for Stripe webhook must come BEFORE express.json()
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

// ── API routes ───────────────────────────────────────────────────
app.use('/api/auth',    require('./routes/auth').router);
app.use('/api',         require('./routes/api'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/tickets',   require('./routes/tickets'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/ai',        require('./routes/ai'));

// ── Static assets (scoped — never expose project root files) ─────
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js',  express.static(path.join(__dirname, 'js')));

// ── SPA catch-all — serve index.html for every frontend route ────
// Cache-Control: no-store prevents Cloudflare from caching the HTML
// for one path and serving the stale copy for another path.
app.get('*', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.sendFile(path.join(__dirname, 'index.html'));
});

// ── Socket.io – 1v1 game ─────────────────────────────────────────
require('./sockets/game')(io);

// ── Start ────────────────────────────────────────────────────────
const BASE_URL = process.env.APP_URL || `http://localhost:${PORT}`;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Zdaj+ → ${BASE_URL}`);
  console.log(`   Stripe: ${process.env.STRIPE_SECRET_KEY ? '✅ configured' : '⚠️  not set (demo mode)'}`);
});
