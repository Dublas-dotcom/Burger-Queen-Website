import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

// Load Stripe public key from env (replace with your own or use .env)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_123');

/**
 * CheckoutForm component handles payment and order placement
 */
function CheckoutForm() {
  const { cart, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cardError, setCardError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Calculate total price in cents
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCents = Math.round(total * 100);

  /**
   * Handle order and payment submission
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCardError('');
    if (!address) {
      setError('Please enter delivery address.');
      return;
    }
    if (!stripe || !elements) return;
    setLoading(true);
    // 1. Create payment intent on backend
    const res = await fetch(`${API_URL}/payment/create-payment-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalCents }),
    });
    const data = await res.json();
    if (!res.ok || !data.clientSecret) {
      setError(data.message || 'Payment intent creation failed.');
      setLoading(false);
      return;
    }
    // 2. Confirm card payment with Stripe
    const cardElement = elements.getElement(CardElement);
    const paymentResult = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { address: { line1: address } },
      },
    });
    if (paymentResult.error) {
      setCardError(paymentResult.error.message);
      setLoading(false);
      return;
    }
    if (paymentResult.paymentIntent.status === 'succeeded') {
      // 3. Place order in backend
      const card = paymentResult.paymentIntent.charges?.data?.[0]?.payment_method_details?.card;
      const receipt_url = paymentResult.paymentIntent.charges?.data?.[0]?.receipt_url;
      const order = {
        items: cart.map(item => ({ food: item._id, quantity: item.quantity })),
        address,
        payment: 'stripe',
        paymentDetails: {
          last4: card?.last4,
          brand: card?.brand,
          receipt_url,
        },
      };
      const orderRes = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(order),
      });
      if (orderRes.ok) {
        clearCart();
        navigate('/orders?success=1');
      } else {
        const orderData = await orderRes.json();
        setError(orderData.message || 'Order failed.');
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white/80 rounded-xl shadow-lg p-8 max-w-lg mx-auto mt-8 backdrop-blur-md">
      <h2 className="text-2xl font-bold text-center mb-4 text-[#0A192F]">Payment & Delivery</h2>
      <div>
        <label className="block mb-1 font-medium text-[#0A192F]">Delivery Address</label>
        <input
          type="text"
          className="w-full border-2 border-[#FBBF24] p-3 rounded-lg focus:ring-2 focus:ring-[#38BDF8] bg-white"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />
      </div>
      {/* Credit Card UI */}
      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-xs mb-4">
          <div className="bg-gradient-to-tr from-[#0A192F] via-[#38BDF8] to-[#FBBF24] rounded-2xl shadow-xl p-6 text-white flex flex-col gap-4 min-h-[180px]">
            <div className="flex justify-between items-center">
              <span className="font-bold tracking-widest text-lg">CREDIT CARD</span>
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#FBBF24" />
                <circle cx="28" cy="12" r="12" fill="#38BDF8" />
              </svg>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="text-xs opacity-80">Card Number</div>
              <div className="text-lg tracking-widest font-mono">•••• •••• •••• ••••</div>
            </div>
            <div className="flex justify-between mt-2">
              <div>
                <div className="text-xs opacity-80">Expiry</div>
                <div className="text-base font-mono">MM/YY</div>
              </div>
              <div>
                <div className="text-xs opacity-80">CVC</div>
                <div className="text-base font-mono">•••</div>
              </div>
            </div>
          </div>
          {/* Stripe Card Element overlays the card UI */}
          <div className="absolute inset-0 flex items-end justify-center p-6 pointer-events-none">
            <div className="w-full pointer-events-auto">
              <CardElement options={{ hidePostalCode: true, style: { base: { background: 'transparent', color: '#fff', fontSize: '18px', fontFamily: 'monospace', '::placeholder': { color: '#e0e0e0' } } } }} className="bg-transparent" />
            </div>
          </div>
        </div>
        {cardError && <div className="text-red-500 mt-1">{cardError}</div>}
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <Button
        type="submit"
        className="w-full text-lg mt-2"
        disabled={loading || cart.length === 0 || !stripe}
      >
        {loading ? 'Processing...' : `Pay $${total.toFixed(2)} & Place Order`}
      </Button>
    </form>
  );
}

/**
 * Checkout page for Burger Queen
 * - Shows cart summary
 * - Collects delivery address and payment info
 * - Handles Stripe payment and order placement
 */
const Checkout = () => {
  const { cart } = useContext(CartContext);
  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-[#0A192F]">Checkout</h1>
      {/* Cart summary */}
      <div className="mb-6 bg-white/80 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-2 text-[#0A192F]">Order Summary</h2>
        {cart.length === 0 ? (
          <div>Your cart is empty.</div>
        ) : (
          <ul className="mb-2">
            {cart.map(item => (
              <li key={item._id}>
                {item.quantity} x {item.name} (${item.price} each)
              </li>
            ))}
          </ul>
        )}
        <div className="font-bold">Total: ${total.toFixed(2)}</div>
      </div>
      {/* Stripe Elements wrapper */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Checkout;