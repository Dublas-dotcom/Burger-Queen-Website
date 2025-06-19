import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * Menu page for Burger Queen
 * - Fetches and displays food items from the backend
 * - Allows filtering by category and searching by name
 * - Responsive grid layout with Tailwind CSS
 * - Integrates with CartContext for Add to Cart
 */
const Menu = () => {
  // State for food items, filter, and search
  const [food, setFood] = useState([]); // List of food items
  const [category, setCategory] = useState(''); // Selected category
  const [search, setSearch] = useState(''); // Search query
  const [loading, setLoading] = useState(true); // Loading state
  const { addToCart } = useContext(CartContext); // Cart context

  // Helper: Get API URL from env
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Fetch food items from backend
  useEffect(() => {
    const fetchFood = async () => {
      setLoading(true);
      let url = `${API_URL}/food?`;
      if (category) url += `category=${category}&`;
      if (search) url += `search=${search}`;
      const res = await fetch(url);
      const data = await res.json();
      setFood(data);
      setLoading(false);
    };
    fetchFood();
  }, [category, search, API_URL]);

  // Get unique categories from food items
  const categories = Array.from(new Set(food.map(item => item.category)));

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Menu</h1>
      {/* Filter and search bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          className="border p-2 rounded"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          className="border p-2 rounded flex-1"
          placeholder="Search food..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Food grid */}
      {loading ? (
        <div>Loading menu...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {food.map(item => (
            <div key={item._id} className="bg-white rounded shadow p-4 flex flex-col items-center">
              <img src={item.image} alt={item.name} className="w-32 h-32 object-cover mb-2 rounded" />
              <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
              <p className="text-gray-600 mb-1">{item.description}</p>
              <div className="font-bold mb-2">${item.price}</div>
              {/* Add to Cart button uses CartContext */}
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                onClick={() => addToCart(item, 1)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu; 