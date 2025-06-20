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
import { Star, Clock, Award } from 'lucide-react';
import './index.css';
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
      <main className="min-h-screen bg-gradient-to-br from-[#0A192F] via-[#38BDF8]/10 to-[#FBBF24]/30">
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
            <section className="relative min-h-screen flex items-center bg-gradient-to-br from-[#0A192F] via-[#38BDF8]/10 to-[#FBBF24]/30 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-[#0A192F] rounded-full blur-2xl"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-[#FBBF24] rounded-full blur-xl"></div>
                <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-[#F87171] rounded-full blur"></div>
              </div>
              <div className="container-max relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div className="space-y-8 animate-fade-in">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-[#0A192F]">
                        <Star className="w-5 h-5 fill-current" />
                        <span className="text-sm font-semibold uppercase tracking-wide">
                          Premium Quality Since 1995
                        </span>
                      </div>
                      <h1 className="text-5xl lg:text-7xl font-display font-bold leading-tight">
                        <span className="text-[#0A192F] drop-shadow">Burger</span>
                        <br />
                        <span className="text-[#FBBF24] drop-shadow">Queen</span>
                      </h1>
                      <p className="text-xl text-[#0A192F]/80 max-w-lg leading-relaxed">
                        Experience the royal taste of our handcrafted burgers made with premium ingredients 
                        and served with a crown of flavor that will make you feel like royalty.
                      </p>
                    </div>
                    {/* Stats */}
                    <div className="flex flex-wrap gap-8">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-12 bg-[#0A192F]/10 rounded-full flex items-center justify-center">
                          <Clock className="w-6 h-6 text-[#0A192F]" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-[#0A192F]">15min</p>
                          <p className="text-sm text-[#0A192F]/80">Fast Delivery</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-12 bg-[#FBBF24]/10 rounded-full flex items-center justify-center">
                          <Award className="w-6 h-6 text-[#FBBF24]" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-[#FBBF24]">50K+</p>
                          <p className="text-sm text-[#0A192F]/80">Happy Customers</p>
                        </div>
                      </div>
                    </div>
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="bg-[#FBBF24] text-[#0A192F] rounded-lg shadow-lg text-lg px-8 py-4 font-semibold hover:bg-[#38BDF8] hover:text-white transition">
                        Order Now
                      </button>
                      <button className="bg-[#38BDF8] text-white border border-[#0A192F] rounded-lg text-lg px-8 py-4 font-semibold hover:bg-[#0A192F] hover:text-[#FBBF24] transition">
                        View Menu
                      </button>
                    </div>
                    {/* Special Offer Banner */}
                    <div className="bg-gradient-to-r from-[#FBBF24] to-[#0A192F] text-white p-4 rounded-lg shadow-glow">
                      <p className="text-center font-semibold">
                        🎉 Grand Opening Special: 20% OFF on all orders above $25!
                      </p>
                    </div>
                  </div>
                  {/* Hero Image */}
                  <div className="relative animate-slide-up">
                    <div className="relative">
                      <img 
                        src="https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop"
                        alt="Delicious Burger Queen burger"
                        className="w-full h-[600px] object-cover rounded-2xl shadow-2xl"
                      />
                      {/* Floating Cards */}
                      <div className="absolute -top-4 -left-4 bg-white/90 p-4 rounded-xl shadow-lg animate-bounce-slow">
                        <div className="flex items-center space-x-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-[#0A192F]">4.9/5</span>
                        </div>
                        <p className="text-xs text-[#0A192F]/70 mt-1">2,847 Reviews</p>
                      </div>
                      <div className="absolute -bottom-4 -right-4 bg-white/90 p-4 rounded-xl shadow-lg">
                        <p className="text-2xl font-bold text-[#FBBF24]">$12.99</p>
                        <p className="text-sm text-[#0A192F]/70">Royal Deluxe</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          } />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
