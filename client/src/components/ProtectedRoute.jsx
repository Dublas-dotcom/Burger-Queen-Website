import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * ProtectedRoute component
 * - Renders the given children if user is authenticated
 * - Otherwise, redirects to /login
 * @param {object} props - React props
 * @param {React.ReactNode} props.children - Child components to render
 */
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext); // Get user and loading state

  // Show loading indicator while checking auth
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render children
  return children;
};

export default ProtectedRoute; 