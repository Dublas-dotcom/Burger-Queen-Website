import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { ShoppingCart, Menu as MenuIcon, X as CloseIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-[#0A192F] shadow-md border-b border-[#FBBF24] sticky top-0 z-30">
      <div className="container-max px-4 mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-[#FBBF24] tracking-tight flex items-center gap-2">
          <span className="bg-[#FBBF24] rounded-full px-2 py-1 text-[#0A192F]">🍔</span>
          <span className="font-display">Burger Queen</span>
        </Link>
        {/* Hamburger Icon (Mobile) */}
        <button
          className="sm:hidden text-[#FBBF24] focus:outline-none z-20"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <CloseIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
        </button>
        {/* Nav Links (Desktop) */}
        <div className="hidden sm:flex items-center gap-6 text-sm sm:text-base font-medium text-[#FBBF24]">
          <Link to="/menu" className="hover:text-[#38BDF8] transition-colors">Menu</Link>
          <Link to="/cart" className="hover:text-[#38BDF8] relative flex items-center gap-1 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="bg-[#38BDF8] text-white rounded-full px-2 py-0.5 text-xs font-semibold absolute -top-2 -right-3">
                {cartCount}
              </span>
            )}
          </Link>
          {user && (
            <Link to="/orders" className="hover:text-[#38BDF8] transition-colors">Orders</Link>
          )}
          {user?.isAdmin && (
            <Link to="/admin" className="hover:text-[#38BDF8] transition-colors">Admin</Link>
          )}
          {!user ? (
            <>
              <Link to="/login" className="hover:text-[#38BDF8] transition-colors">Login</Link>
              <Link to="/register" className="hover:text-[#38BDF8] transition-colors">Register</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-[#F87171] hover:text-red-700 transition-colors font-semibold"
            >
              Logout
            </button>
          )}
        </div>
        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="fixed inset-0 bg-[#0A192F] bg-opacity-95 flex flex-col items-center justify-center gap-8 text-2xl font-bold text-[#FBBF24] z-40 sm:hidden animate-fade-in">
            <Link to="/menu" className="hover:text-[#38BDF8]" onClick={() => setMobileOpen(false)}>Menu</Link>
            <Link to="/cart" className="hover:text-[#38BDF8] flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <ShoppingCart className="w-6 h-6" />
              Cart
              {cartCount > 0 && (
                <span className="bg-[#38BDF8] text-white rounded-full px-2 py-0.5 text-xs font-semibold ml-1">
                  {cartCount}
                </span>
              )}
            </Link>
            {user && (
              <Link to="/orders" className="hover:text-[#38BDF8]" onClick={() => setMobileOpen(false)}>Orders</Link>
            )}
            {user?.isAdmin && (
              <Link to="/admin" className="hover:text-[#38BDF8]" onClick={() => setMobileOpen(false)}>Admin</Link>
            )}
            {!user ? (
              <>
                <Link to="/login" className="hover:text-[#38BDF8]" onClick={() => setMobileOpen(false)}>Login</Link>
                <Link to="/register" className="hover:text-[#38BDF8]" onClick={() => setMobileOpen(false)}>Register</Link>
              </>
            ) : (
              <button
                onClick={() => { setMobileOpen(false); handleLogout(); }}
                className="text-[#F87171] hover:text-red-700 transition-colors font-semibold"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;