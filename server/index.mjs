#!/usr/bin/env node
// Mundial '26 production server.
// Serves the Vite-built SPA from /dist and exposes /api/* endpoints for
// the paywall (Stripe Checkout + JWT magic links + Resend emails).

import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, resolve, join } from 'node:path';
import { readFileSync } from 'node:fs';
import jwt from 'jsonwebtoken';
import Stripe from 'stripe';
import { Resend } from 'resend';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');

// ── Env --------------------------------------------------------------
const PORT = Number(process.env.PORT ?? 5173);
const BASE_URL = process.env.PUBLIC_BASE_URL ?? `http://localhost:${PORT}`;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? '';
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? '';
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID ?? '';
const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-only-change-in-production';
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';
const EMAIL_FROM = process.env.EMAIL_FROM ?? 'Mundial 26 <hello@mundial26.local>';

// Tokens expire at end of tournament (deep safety net — buy means lifetime for THIS tournament).
const TOKEN_EXPIRY_SECONDS = 60 * 60 * 24 * 90; // 90 days from purchase

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null;
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const app = express();

// ── Stripe webhook needs the raw body, so register BEFORE express.json() -----
app.post(
  '/api/stripe-webhook',
  express.raw({ type: 'application/json' }),
  async (req, res) => {
    if (!stripe || !STRIPE_WEBHOOK_SECRET) {
      console.warn('[stripe-webhook] stripe or webhook secret not configured');
      return res.status(503).send('stripe not configured');
    }
    const sig = req.headers['stripe-signature'];
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
    } catch (err) {
      console.error('[stripe-webhook] signature verification failed:', err.message);
      return res.status(400).send(`webhook error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const email = session.customer_details?.email ?? session.customer_email;
      if (!email) {
        console.warn('[stripe-webhook] no email on completed session', session.id);
      } else {
        try {
          await issueAccess(email);
          console.log('[stripe-webhook] access issued to', email);
        } catch (err) {
          console.error('[stripe-webhook] failed to issue access:', err);
        }
      }
    }

    res.json({ received: true });
  }
);

// JSON parser for everything else
app.use(express.json({ limit: '1mb' }));

// ── Helpers ----------------------------------------------------------

function mintToken(email) {
  return jwt.sign(
    { email, pro: true, iat: Math.floor(Date.now() / 1000) },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY_SECONDS }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

async function issueAccess(email) {
  const token = mintToken(email);
  const url = `${BASE_URL}/?unlock=${encodeURIComponent(token)}`;

  if (resend) {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: "Mundial '26 Pro — your unlock link",
      html: emailHtml(url),
      text: emailText(url),
    });
  } else {
    console.log('[issueAccess] (no resend configured) unlock URL for', email, ':', url);
  }
  return { token, url };
}

function emailHtml(url) {
  return `<!DOCTYPE html>
<html><body style="font-family:system-ui,sans-serif;background:#0b0d10;color:#e8e6e3;padding:32px;">
  <div style="max-width:520px;margin:0 auto;background:#141719;border:1px solid #2a2d31;border-radius:8px;padding:32px;">
    <h1 style="color:#e8b94a;font-size:22px;margin:0 0 12px;letter-spacing:-0.01em;">Welcome to Mundial '26 Pro</h1>
    <p style="font-size:15px;line-height:1.55;color:#c2c0bd;margin:0 0 24px;">
      Thanks for grabbing access. Click below to unlock every section on your browser — pitch view lineups,
      qualifying xG, heat & altitude, the full Team Compare, manager PPM, and the rest.
    </p>
    <p style="margin:0 0 24px;">
      <a href="${url}" style="display:inline-block;background:#e8b94a;color:#0b0d10;padding:12px 24px;border-radius:4px;text-decoration:none;font-weight:600;font-size:14px;">
        Unlock Mundial '26 Pro
      </a>
    </p>
    <p style="font-size:12px;color:#8c8a87;margin:0;line-height:1.5;">
      Or paste this link in your browser:<br/>
      <span style="word-break:break-all;color:#a8a6a3;">${url}</span>
    </p>
    <hr style="border:none;border-top:1px solid #2a2d31;margin:24px 0;"/>
    <p style="font-size:11px;color:#6e6c6a;margin:0;letter-spacing:0.04em;text-transform:uppercase;">
      Mundial '26 · The bettor's terminal for the World Cup
    </p>
  </div>
</body></html>`;
}

function emailText(url) {
  return `Welcome to Mundial '26 Pro.

Click here to unlock everything on your browser:
${url}

— Mundial '26`;
}

// ── API routes -------------------------------------------------------

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    stripeConfigured: Boolean(stripe && STRIPE_PRICE_ID),
    resendConfigured: Boolean(resend),
  });
});

// Create a Stripe Checkout Session and return its URL.
app.post('/api/checkout', async (_req, res) => {
  if (!stripe || !STRIPE_PRICE_ID) {
    return res.status(503).json({ error: 'Stripe not configured yet' });
  }
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
      payment_method_types: ['card', 'klarna', 'link'],
      success_url: `${BASE_URL}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/?checkout=cancel`,
      automatic_tax: { enabled: false },
      allow_promotion_codes: true,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error('[checkout] failed:', err);
    res.status(500).json({ error: 'Checkout creation failed' });
  }
});

// Verify a completed Stripe Checkout Session and (if paid) mint a JWT
// for immediate frontend unlock. The webhook also emails a magic link
// so the buyer can re-unlock on other devices.
app.post('/api/verify-checkout', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Stripe not configured' });
  }
  const { session_id } = req.body ?? {};
  if (!session_id || typeof session_id !== 'string') {
    return res.status(400).json({ error: 'session_id required' });
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== 'paid') {
      return res.status(402).json({ error: 'not paid', status: session.payment_status });
    }
    const email = session.customer_details?.email ?? session.customer_email;
    const token = mintToken(email ?? 'unknown@mundial26');
    res.json({ token, email });
  } catch (err) {
    console.error('[verify-checkout] failed:', err);
    res.status(500).json({ error: 'verification failed' });
  }
});

// Token validation — frontend can call this to confirm a stored JWT is still valid.
app.post('/api/verify-token', (req, res) => {
  const { token } = req.body ?? {};
  if (!token) return res.status(400).json({ error: 'token required' });
  const payload = verifyToken(token);
  if (!payload) return res.status(401).json({ error: 'invalid or expired' });
  res.json({ ok: true, email: payload.email, pro: payload.pro });
});

// ── Static SPA -------------------------------------------------------

app.use(express.static(distDir, { maxAge: '1h', index: 'index.html' }));

// SPA fallback — any non-/api GET serves index.html so client-side routing works.
app.get(/^(?!\/api\/).*/, (_req, res) => {
  res.sendFile(join(distDir, 'index.html'));
});

// ── Boot -------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`[mundial26] serving ${distDir} on port ${PORT}`);
  console.log(`[mundial26] base URL: ${BASE_URL}`);
  console.log(`[mundial26] stripe: ${stripe ? 'configured' : 'NOT configured'}`);
  console.log(`[mundial26] resend: ${resend ? 'configured' : 'NOT configured'}`);
});
