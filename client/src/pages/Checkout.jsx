import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe public key from env (replace with your own or use .env)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_123');

/**
 * CheckoutForm component handles payment and order placement
 */
function CheckoutForm() {
  const { cart, clearCart } = useContext(CartContext);
  const [address, setAddress] = useState('');
  const [payment, setPayment] = useState(''); // Not used, but kept for UI
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Delivery Address</label>
        <input
          type="text"
          className="w-full border p-2 rounded"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />
      </div>
      {/* Stripe Card Element */}
      <div>
        <label className="block mb-1 font-medium">Card Details</label>
        <div className="border p-2 rounded bg-white">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
        {cardError && <div className="text-red-500 mt-1">{cardError}</div>}
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={loading || cart.length === 0 || !stripe}
      >
        {loading ? 'Processing...' : `Pay $${total.toFixed(2)} & Place Order`}
      </button>
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
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {/* Cart summary */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
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