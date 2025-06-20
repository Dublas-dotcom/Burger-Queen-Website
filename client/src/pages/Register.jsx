import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * Register page for Burger Queen
 * Allows user to register with email and password
 */
const Register = () => {
  // State for form fields and error
  const [email, setEmail] = useState(''); // Email input
  const [password, setPassword] = useState(''); // Password input
  const [error, setError] = useState(''); // Error message
  const { register } = useContext(AuthContext); // Auth context
  const navigate = useNavigate(); // For navigation

  /**
   * Handle form submission
   * @param {Event} e - Form event
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submit
    setError(''); // Clear previous error
    const res = await register(email, password); // Call register
    if (res.error) {
      setError(res.error); // Show error
    } else {
      navigate('/'); // Redirect to home/menu
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#0A192F] via-[#38BDF8]/10 to-[#FBBF24]/30">
      {/* Register form container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 p-8 rounded-2xl shadow-2xl w-full max-w-md backdrop-blur-md border border-[#FBBF24]/40"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-[#0A192F]">Register for Burger Queen</h2>
        {/* Email input */}
        <label className="block mb-2 text-sm font-medium text-[#0A192F]">Email</label>
        <input
          type="email"
          className="w-full p-3 mb-4 border-2 border-[#FBBF24] rounded-lg focus:ring-2 focus:ring-[#38BDF8] bg-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Password input */}
        <label className="block mb-2 text-sm font-medium text-[#0A192F]">Password</label>
        <input
          type="password"
          className="w-full p-3 mb-4 border-2 border-[#FBBF24] rounded-lg focus:ring-2 focus:ring-[#38BDF8] bg-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Error message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {/* Submit button */}
        <Button type="submit" className="w-full text-lg mt-2">Register</Button>
        {/* Link to login */}
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <a href="/login" className="text-[#38BDF8] hover:underline font-semibold">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register;