/*
  payment.js - Stripe payment routes for Burger Queen backend
  Endpoint: POST /api/payment/create-payment-intent
*/

const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);


/**
 * Create a Stripe PaymentIntent
 * @route POST /api/payment/create-payment-intent
 * @body { amount: number } - Amount in cents
 * @returns { clientSecret: string }
 */
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({ message: 'Amount is required and must be a number (in cents).' });
    }
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      // You can add metadata or receipt_email here if needed
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ message: 'Payment intent creation failed.' });
  }
});

module.exports = router; 