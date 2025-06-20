import React, { useEffect, useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/*
  Menu Page - Modern, Vibrant, and Immersive UI
  - Uses a deep blue and gold color palette with sky blue accents
  - Responsive, with a glassmorphic background, floating shapes, and a dense food grid
*/
const Menu = () => {
  const [food, setFood] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

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

  const categories = Array.from(new Set(food.map(item => item.category)));

  return (
    <section id="menu" className="relative min-h-screen w-full bg-gradient-to-br from-[#0A192F] to-[#38BDF8] overflow-hidden py-12 px-0">
      {/* Floating background shapes for visual interest */}
      <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
        <div className="absolute top-24 left-10 w-40 h-40 bg-[#FBBF24] rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 right-20 w-32 h-32 bg-[#38BDF8] rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-1/3 w-24 h-24 bg-[#F87171] rounded-full blur-2xl"></div>
      </div>
      {/* Main content container: fills width, centers content, no max-width restriction */}
      <div className="relative z-10 w-full max-w-none px-2 sm:px-8 mx-auto">
        {/* Header: bold, themed, centered */}
        <div className="text-center mb-14 animate-fade-in">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-display font-bold text-[#FBBF24] mb-4 drop-shadow-lg">
            Our Royal <span className="bg-gradient-to-r from-[#38BDF8] to-[#F87171] text-transparent bg-clip-text">Menu</span>
          </h2>
          <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto drop-shadow">
            Discover our carefully crafted selection of gourmet burgers and sides, made with the finest ingredients fit for royalty.
          </p>
        </div>
        {/* Category Tabs: bold, pill-shaped, responsive */}
        <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in">
          <button
            onClick={() => setCategory('')}
            className={`px-7 py-3 rounded-full font-semibold text-lg transition-all shadow-md ${category === '' ? 'bg-[#FBBF24] text-[#0A192F] shadow-lg scale-105' : 'bg-white text-[#0A192F] hover:bg-[#FBBF24]/80 hover:text-[#0A192F]'}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-7 py-3 rounded-full font-semibold text-lg transition-all shadow-md ${category === cat ? 'bg-[#FBBF24] text-[#0A192F] shadow-lg scale-105' : 'bg-white text-[#0A192F] hover:bg-[#FBBF24]/80 hover:text-[#0A192F]'}`}
            >
              {cat}
            </button>
          ))}
        </div>
        {/* Search Bar: prominent, centered */}
        <div className="flex justify-center mb-12 animate-fade-in">
          <Input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full max-w-xl border-2 border-[#FBBF24] focus:ring-2 focus:ring-[#38BDF8] text-lg py-3 px-4 rounded-xl shadow-sm bg-white/80"
          />
        </div>
        {/* Food Grid: dense, screen-filling, responsive, animated */}
        {loading ? (
          <div className="flex justify-center items-center h-40 text-lg font-medium text-[#FBBF24] animate-fade-in">Loading menu...</div>
        ) : food.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-[#FBBF24] animate-fade-in">
            <ShoppingCart className="w-10 h-10 mb-2" />
            <span className="text-sm">No food items found.</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-fade-in">
            {food.map(item => (
              <Card
                key={item._id}
                className="group h-full p-3 flex flex-col justify-between hover:shadow-2xl transition-all bg-white/80 border border-[#FBBF24]/40 rounded-lg shadow-md backdrop-blur-md"
              >
                {/* Food image: large, rounded, animated on hover */}
                <div className="relative mb-4 w-full overflow-hidden rounded-xl">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-56 md:h-60 xl:h-64 object-cover transition-transform duration-300 group-hover:scale-105 rounded-xl shadow-lg"
                  />
                </div>
                {/* Card content: name, category, description, price, add button */}
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <CardTitle className="font-bold text-xl text-[#0A192F] group-hover:text-[#38BDF8] transition-colors">
                      {item.name}
                    </CardTitle>
                    <Badge variant="secondary" className="text-base px-3 py-1 bg-[#38BDF8] text-black shadow">{item.category}</Badge>
                  </div>
                  <p className="text-[#0A192F]/80 text-base leading-relaxed line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-2xl font-bold text-[#FBBF24]">${item.price}</span>
                    <Button
                      onClick={() => addToCart(item, 1)}
                      className="bg-[#38BDF8] hover:bg-[#0A192F]  text-black px-5 py-6 rounded-lg transition-all transform hover:scale-105 flex items-center gap-2 text-base shadow-md"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
