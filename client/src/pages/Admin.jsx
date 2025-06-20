import React, { useEffect, useState } from 'react';

/**
 * Admin page for Burger Queen
 * - Manage food items (CRUD)
 * - View and update all customer orders
 */
const Admin = () => {
  // State for food items and form
  const [food, setFood] = useState([]); // List of food items
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '', category: '' });
  const [editingId, setEditingId] = useState(null); // If editing, the food _id
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]); // All customer orders
  const [orderLoading, setOrderLoading] = useState(false);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState(''); // Filter for payment status
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Fetch food items from backend
  const fetchFood = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/food`);
    const data = await res.json();
    setFood(data);
    setLoading(false);
  };
  useEffect(() => { fetchFood(); }, []);

  // Fetch all customer orders (admin only)
  const fetchOrders = async () => {
    setOrderLoading(true);
    const res = await fetch(`${API_URL}/admin/orders`, { credentials: 'include' });
    const data = await res.json();
    setOrders(data);
    setOrderLoading(false);
  };
  useEffect(() => { fetchOrders(); }, []);

  // Handle form input change
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (create or update)
  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.description || !form.price || !form.image || !form.category) {
      setError('All fields are required.');
      return;
    }
    setLoading(true);
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `${API_URL}/food/${editingId}` : `${API_URL}/food`;
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    });
    if (res.ok) {
      setForm({ name: '', description: '', price: '', image: '', category: '' });
      setEditingId(null);
      fetchFood();
    } else {
      const data = await res.json();
      setError(data.message || 'Failed to save food item.');
    }
    setLoading(false);
  };

  // Handle edit button
  const handleEdit = item => {
    setForm({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    setEditingId(item._id);
  };

  // Handle delete button
  const handleDelete = async id => {
    if (!window.confirm('Delete this food item?')) return;
    setLoading(true);
    const res = await fetch(`${API_URL}/food/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (res.ok) fetchFood();
    setLoading(false);
  };

  // Handle cancel edit
  const handleCancel = () => {
    setForm({ name: '', description: '', price: '', image: '', category: '' });
    setEditingId(null);
  };

  // Handle order status update
  const handleStatusChange = async (orderId, status) => {
    setOrderLoading(true);
    const res = await fetch(`${API_URL}/admin/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status }),
    });
    if (res.ok) fetchOrders();
    setOrderLoading(false);
  };

  // Filter orders by payment status
  const filteredOrders = paymentStatusFilter
    ? orders.filter(order => order.paymentStatus === paymentStatusFilter)
    : orders;

  return (
    <div className="p-4 max-w-6xl mx-auto min-h-screen bg-gradient-to-br from-[#0A192F] via-[#38BDF8]/10 to-[#FBBF24]/30">
      <h1 className="text-3xl font-bold mb-6 text-[#0A192F] text-center">Admin Panel</h1>
      {/* Food management section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-2 text-[#0A192F]">Manage Food Items</h2>
        {/* Food form */}
        <form onSubmit={handleSubmit} className="bg-white/80 p-6 rounded-2xl shadow-xl mb-6 space-y-3 border border-[#FBBF24]/40 backdrop-blur-md">
          <div className="flex flex-col md:flex-row gap-2">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-3 border-2 border-[#FBBF24] rounded-lg flex-1 bg-white focus:ring-2 focus:ring-[#38BDF8]" />
            <input name="category" value={form.category} onChange={handleChange} placeholder="Category" className="p-3 border-2 border-[#FBBF24] rounded-lg flex-1 bg-white focus:ring-2 focus:ring-[#38BDF8]" />
          </div>
          <div className="flex flex-col md:flex-row gap-2">
            <input name="price" value={form.price} onChange={handleChange} placeholder="Price" type="number" min="0" step="0.01" className="p-3 border-2 border-[#FBBF24] rounded-lg flex-1 bg-white focus:ring-2 focus:ring-[#38BDF8]" />
            <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="p-3 border-2 border-[#FBBF24] rounded-lg flex-1 bg-white focus:ring-2 focus:ring-[#38BDF8]" />
          </div>
          <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="p-3 border-2 border-[#FBBF24] rounded-lg w-full bg-white focus:ring-2 focus:ring-[#38BDF8]" />
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex gap-2">
            <button type="submit" className="bg-[#FBBF24] text-[#0A192F] px-4 py-2 rounded-lg font-semibold hover:bg-[#38BDF8] hover:text-white transition" disabled={loading}>
              {editingId ? 'Update' : 'Add'} Food
            </button>
            {editingId && (
              <button type="button" onClick={handleCancel} className="bg-gray-400 text-black px-4 py-2 rounded-lg hover:bg-gray-500 transition">Cancel</button>
            )}
          </div>
        </form>
        {/* Food items table */}
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white/80 rounded-2xl shadow-xl border border-[#FBBF24]/40">
            <thead>
              <tr className="bg-[#FBBF24]/20">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Price</th>
                <th className="p-2 border">Image</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {food.map(item => (
                <tr key={item._id} className="hover:bg-[#38BDF8]/10">
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.category}</td>
                  <td className="p-2 border">${item.price}</td>
                  <td className="p-2 border"><img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" /></td>
                  <td className="p-2 border">{item.description}</td>
                  <td className="p-2 border space-x-2">
                    <button onClick={() => handleEdit(item)} className="bg-[#38BDF8] text-white px-2 py-1 rounded-lg hover:bg-[#0A192F] transition">Edit</button>
                    <button onClick={() => handleDelete(item._id)} className="bg-[#F87171] text-white px-2 py-1 rounded-lg hover:bg-red-700 transition">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Orders management section */}
      <div>
        <h2 className="text-xl font-semibold mb-2 text-[#0A192F]">Customer Orders</h2>
        {/* Payment status filter */}
        <div className="mb-4">
          <label className="mr-2 font-medium">Filter by Payment Status:</label>
          <select
            className="border-2 border-[#FBBF24] p-2 rounded-lg bg-white focus:ring-2 focus:ring-[#38BDF8]"
            value={paymentStatusFilter}
            onChange={e => setPaymentStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
        {orderLoading ? (
          <div className="text-[#0A192F]">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-[#F87171]">No orders found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white/80 rounded-2xl shadow-xl border border-[#FBBF24]/40">
              <thead>
                <tr className="bg-[#FBBF24]/20">
                  <th className="p-2 border">Order ID</th>
                  <th className="p-2 border">User</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Payment Status</th>
                  <th className="p-2 border">Payment Details</th>
                  <th className="p-2 border">Items</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order._id} className="hover:bg-[#38BDF8]/10">
                    <td className="p-2 border">{order._id}</td>
                    <td className="p-2 border">{order.user?.email || 'N/A'}</td>
                    <td className="p-2 border">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="p-2 border font-bold capitalize text-[#38BDF8]">{order.status}</td>
                    <td className={`p-2 border font-bold capitalize ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>{order.paymentStatus}</td>
                    <td className="p-2 border text-sm text-[#0A192F]/80">
                      {order.paymentDetails && (order.paymentDetails.last4 || order.paymentDetails.receipt_url) && (
                        <>
                          {order.paymentDetails.last4 && (
                            <span>Card: **** **** **** {order.paymentDetails.last4} ({order.paymentDetails.brand})</span>
                          )}
                          {order.paymentDetails.receipt_url && (
                            <>
                              {' '}|{' '}
                              <a href={order.paymentDetails.receipt_url} target="_blank" rel="noopener noreferrer" className="text-[#38BDF8] underline">Receipt</a>
                            </>
                          )}
                        </>
                      )}
                    </td>
                    <td className="p-2 border">
                      <ul className="list-disc ml-4">
                        {order.items.map((item, idx) => (
                          <li key={idx}>{item.quantity} x {item.food?.name || 'Item'}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-2 border space-x-2">
                      <select
                        value={order.status}
                        onChange={e => handleStatusChange(order._id, e.target.value)}
                        className="border-2 border-[#FBBF24] rounded-lg p-2 bg-white focus:ring-2 focus:ring-[#38BDF8]"
                      >
                        <option value="preparing">Preparing</option>
                        <option value="delivering">Delivering</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;