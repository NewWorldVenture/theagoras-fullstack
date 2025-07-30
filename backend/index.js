const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createClient } = require('@supabase/supabase-js');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

dotenv.config();

const app = express();

// Middleware for JSON and raw body parsing
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(cors());

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Health check
app.get('/', (req, res) => {
  res.send('TheAgoras backend is live!');
});

// GET all listings
app.get('/api/listings', async (req, res) => {
  const { data, error } = await supabase.from('listings').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST new listing
app.post('/api/listings', async (req, res) => {
  const { title, price, seller_id, image_url } = req.body;
  if (!title || !price || !seller_id) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { data, error } = await supabase
    .from('listings')
    .insert([{ title, price, seller_id, image_url }]);

  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

// Stripe webhook handler
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle event types
  switch (event.type) {
    case 'checkout.session.completed':
      console.log('💰 Payment received:', event.data.object);
      break;
    case 'account.updated':
      console.log('👤 Stripe account updated:', event.data.object);
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});