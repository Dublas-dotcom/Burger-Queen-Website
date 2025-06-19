import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

/**
 * Cart page for Burger Queen
 * - Displays items in the cart from CartContext
 * - Allows quantity adjustment and removal
 * - Shows total price
 * - Includes a Checkout button for easy access
 */
const Cart = () => {
  // Get cart state and functions from context
  const { cart, updateQuantity, removeFromCart } = useContext(CartContext);
  const navigate = useNavigate();

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded shadow">
                <div>
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-gray-600">${item.price} x </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={e => updateQuantity(item._id, Number(e.target.value))}
                    className="w-16 border rounded p-1"
                  />
                  <button
                    className="text-red-600 hover:underline ml-2"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="font-bold">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
            <div className="text-right font-bold text-xl mt-4">Total: ${total.toFixed(2)}</div>
          </div>
          {/* Checkout button */}
          <div className="flex justify-end mt-6">
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 