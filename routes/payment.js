const express = require('express');
const router  = express.Router();
const db      = require('../db');
const { auth } = require('./auth');

// Only initialize Stripe if key is configured
const stripe = process.env.STRIPE_SECRET_KEY
  ? require('stripe')(process.env.STRIPE_SECRET_KEY)
  : null;

// POST /api/payment/create-session  – create Stripe checkout
router.post('/create-session', auth, async (req, res) => {
  if (!stripe) {
    return res.status(503).json({
      error: 'Płatności Stripe nie są skonfigurowane.',
      demo: true
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'p24'],  // card + Przelewy24
      line_items: [{
        price_data: {
          currency: 'pln',
          product_data: {
            name: 'Pass+ Premium',
            description: 'Dostęp dożywotni – brak reklam, wszystkie funkcje',
          },
          unit_amount: 500,  // 5.00 PLN (w groszach)
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.APP_URL || 'http://localhost:3000'}?premium=success`,
      cancel_url:  `${process.env.APP_URL || 'http://localhost:3000'}?premium=cancelled`,
      metadata: { user_id: String(req.user.id) },
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// POST /api/payment/webhook  – Stripe webhook (raw body needed)
router.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  if (!stripe) return res.status(503).send('Stripe not configured');

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers['stripe-signature'],
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (e) {
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const userId = parseInt(event.data.object.metadata.user_id);
    db.prepare('UPDATE users SET is_premium = 1 WHERE id = ?').run(userId);
  }

  res.json({ received: true });
});

// POST /api/payment/activate-demo  – no Stripe key? activate for free (demo)
router.post('/activate-demo', auth, (req, res) => {
  db.prepare('UPDATE users SET is_premium = 1 WHERE id = ?').run(req.user.id);
  res.json({ ok: true });
});

module.exports = router;
