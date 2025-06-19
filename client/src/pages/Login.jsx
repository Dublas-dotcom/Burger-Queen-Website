import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * Login page for Burger Queen
 * Allows user to log in with email and password
 */
const Login = () => {
  // State for form fields and error
  const [email, setEmail] = useState(''); // Email input
  const [password, setPassword] = useState(''); // Password input
  const [error, setError] = useState(''); // Error message
  const { login } = useContext(AuthContext); // Auth context
  const navigate = useNavigate(); // For navigation

  /**
   * Handle form submission
   * @param {Event} e - Form event
   */
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submit
    setError(''); // Clear previous error
    const res = await login(email, password); // Call login
    if (res.error) {
      setError(res.error); // Show error
    } else {
      // If user is admin, redirect to /admin dashboard
      if (res.user && res.user.isAdmin) {
        navigate('/admin');
      } else {
        navigate('/'); // Redirect to home/menu
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Login form container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login to Burger Queen</h2>
        {/* Email input */}
        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          className="w-full p-2 mb-4 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {/* Password input */}
        <label className="block mb-2 text-sm font-medium">Password</label>
        <input
          type="password"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {/* Error message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
        {/* Link to register */}
        <div className="mt-4 text-center">
          <span>Don't have an account? </span>
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login; 