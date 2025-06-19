import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

/**
 * Navbar component for Burger Queen
 * - Shows links based on auth state and role
 * - Shows cart item count
 */
const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Auth state
  const { cart } = useContext(CartContext); // Cart state
  const navigate = useNavigate();

  // Handle logout and redirect
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Count total items in cart
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-green-700">🍔 Burger Queen</Link>
        <div className="flex items-center gap-4">
          <Link to="/menu" className="hover:underline">Menu</Link>
          <Link to="/cart" className="hover:underline relative">
            Cart
            {cartCount > 0 && (
              <span className="ml-1 bg-green-600 text-white rounded-full px-2 text-xs">{cartCount}</span>
            )}
          </Link>
          {user && (
            <Link to="/orders" className="hover:underline">Orders</Link>
          )}
          {user && user.isAdmin && (
            <Link to="/admin" className="hover:underline">Admin</Link>
          )}
          {!user ? (
            <>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/register" className="hover:underline">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="hover:underline text-red-600">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 