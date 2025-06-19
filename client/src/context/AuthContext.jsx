import React, { createContext, useState, useEffect } from 'react';

/**
 * AuthContext provides authentication state and functions to the app.
 * - user: current user object or null
 * - login: function to log in
 * - register: function to register
 * - logout: function to log out
 * - loading: whether auth state is loading
 */
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State for user and loading
  const [user, setUser] = useState(null); // Current user object
  const [loading, setLoading] = useState(true); // Loading state

  // Helper: Get API URL from env
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Check for existing session on mount (persistent login)
  useEffect(() => {
    const checkSession = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/auth/session`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, [API_URL]);

  /**
   * Register a new user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} user or error
   */
  const register = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      return { user: data.user };
    } else {
      return { error: data.message };
    }
  };

  /**
   * Log in a user
   * @param {string} email
   * @param {string} password
   * @returns {Promise<object>} user or error
   */
  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      return { user: data.user };
    } else {
      return { error: data.message };
    }
  };

  /**
   * Log out the current user
   */
  const logout = async () => {
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
  };

  // Provide auth state and functions to children
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/*
Example usage:
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
const { user, login, register, logout } = useContext(AuthContext);
*/ 