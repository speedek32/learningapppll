require('dotenv').config();
const express  = require('express');
const http     = require('http');
const { Server } = require('socket.io');
const path     = require('path');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server);
const PORT   = process.env.PORT || 3000;

// ── Middleware ───────────────────────────────────────────────────
// Raw body for Stripe webhook must come BEFORE express.json()
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }));
app.use(express.json());

// ── API routes ───────────────────────────────────────────────────
app.use('/api/auth',    require('./routes/auth').router);
app.use('/api',         require('./routes/api'));
app.use('/api/payment', require('./routes/payment'));

// ── Static files ────────────────────────────────────────────────
app.use(express.static(path.join(__dirname)));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

// ── Socket.io – 1v1 game ─────────────────────────────────────────
require('./sockets/game')(io);

// ── Start ────────────────────────────────────────────────────────
server.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Pass+ → http://localhost:${PORT}`);
  console.log(`   Stripe: ${process.env.STRIPE_SECRET_KEY ? '✅ configured' : '⚠️  not set (demo mode)'}`);
});
