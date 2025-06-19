import React, { createContext, useState, useEffect } from 'react';

/**
 * CartContext provides global cart state and functions.
 * - cart: array of cart items
 * - addToCart: add item to cart
 * - removeFromCart: remove item from cart
 * - updateQuantity: update item quantity
 * - clearCart: empty the cart
 */
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from LocalStorage or start with empty array
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  // Sync cart to LocalStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  /**
   * Add an item to the cart
   * @param {object} item - Food item to add (expects _id, name, price, etc.)
   * @param {number} quantity - Quantity to add
   */
  const addToCart = (item, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i._id === item._id);
      if (existing) {
        // If item exists, update quantity
        return prev.map(i => i._id === item._id ? { ...i, quantity: i.quantity + quantity } : i);
      } else {
        // Add new item
        return [...prev, { ...item, quantity }];
      }
    });
  };

  /**
   * Remove an item from the cart
   * @param {string} id - Food item _id
   */
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(i => i._id !== id));
  };

  /**
   * Update the quantity of an item in the cart
   * @param {string} id - Food item _id
   * @param {number} quantity - New quantity
   */
  const updateQuantity = (id, quantity) => {
    setCart(prev => prev.map(i => i._id === id ? { ...i, quantity } : i));
  };

  /**
   * Clear the cart
   */
  const clearCart = () => setCart([]);

  // Provide cart state and functions to children
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

/*
Example usage:
import { useContext } from 'react';
import { CartContext } from './context/CartContext';
const { cart, addToCart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
*/ 