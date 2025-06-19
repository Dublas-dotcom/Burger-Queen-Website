import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Register form container */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register for Burger Queen</h2>
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
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Register
        </button>
        {/* Link to login */}
        <div className="mt-4 text-center">
          <span>Already have an account? </span>
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default Register; 