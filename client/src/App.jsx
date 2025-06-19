import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import Checkout from './pages/Checkout';
import './App.css'

// Placeholder components for protected pages
/*
const Menu = () => <div className="flex flex-col items-center justify-center min-h-screen"><h1 className="text-2xl font-bold mb-4">Menu Page (Protected)</h1></div>;
const Cart = () => <div className="flex flex-col items-center justify-center min-h-screen"><h1 className="text-2xl font-bold mb-4">Cart Page (Protected)</h1></div>;
const Orders = () => <div className="flex flex-col items-center justify-center min-h-screen"><h1 className="text-2xl font-bold mb-4">Order History (Protected)</h1></div>;
const Admin = () => <div className="flex flex-col items-center justify-center min-h-screen"><h1 className="text-2xl font-bold mb-4">Admin Panel (Protected)</h1></div>;
*/
/**
 * App component sets up routing for Burger Queen
 * - Includes Navbar on all pages
 * - /login: Login page
 * - /register: Register page
 * - /menu: Protected menu page
 * - /cart: Protected cart page
 * - /orders: Protected order history
 * - /admin: Protected admin panel
 * - /checkout: Protected checkout page
 * - /: Home/Menu placeholder
 */
function App() {
  return (
    <Router>
      {/* Navbar appears on all pages */}
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected routes */}
        <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        {/* Home/Menu placeholder route */}
        <Route path="/" element={
          <div className="flex flex-col items-center justify-space-between min-h-screen">
            <h1 className="text-3xl font-bold mb-4">🍔 Burger Queen</h1>
            <p className="mb-2">Welcome! Please login or register to continue.</p>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
