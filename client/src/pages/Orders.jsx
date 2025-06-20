import React, { useEffect, useState } from 'react';

/**
 * Orders page for Burger Queen
 * - Fetches and displays user's past orders
 * - Shows order status, payment status, items, and timestamp
 */
const Orders = () => {
  // State for orders and loading
  const [orders, setOrders] = useState([]); // List of orders
  const [loading, setLoading] = useState(true); // Loading state

  // Helper: Get API URL from env
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Fetch user's orders from backend
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const res = await fetch(`${API_URL}/orders`, { credentials: 'include' });
      const data = await res.json();
      setOrders(data);
      setLoading(false);
    };
    fetchOrders();
  }, [API_URL]);

  return (
    <div className="p-4 max-w-3xl mx-auto min-h-screen bg-gradient-to-br from-[#0A192F] via-[#38BDF8]/10 to-[#FBBF24]/30">
      <h1 className="text-3xl font-bold mb-6 text-[#0A192F] text-center">Order History</h1>
      {loading ? (
        <div className="text-[#0A192F] text-center">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="text-[#F87171] text-center">No past orders found.</div>
      ) : (
        <div className="space-y-8">
          {orders.map(order => (
            <div key={order._id} className="bg-white/80 rounded-2xl shadow-xl p-6 border border-[#FBBF24]/40 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row sm:justify-between mb-2 gap-2">
                <div className="font-semibold text-[#0A192F]">Order #{order._id}</div>
                <div className="text-sm text-[#0A192F]/70">{new Date(order.createdAt).toLocaleString()}</div>
              </div>
              <div className="mb-2">Status: <span className="font-bold capitalize text-[#38BDF8]">{order.status}</span></div>
              <div className="mb-2">Payment Status: <span className={`font-bold capitalize ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>{order.paymentStatus}</span></div>
              {order.paymentDetails && (order.paymentDetails.last4 || order.paymentDetails.receipt_url) && (
                <div className="mb-2 text-sm text-[#0A192F]/80">
                  {order.paymentDetails.last4 && (
                    <span>Card: **** **** **** {order.paymentDetails.last4} ({order.paymentDetails.brand})</span>
                  )}
                  {order.paymentDetails.receipt_url && (
                    <>
                      {' '}|{' '}
                      <a href={order.paymentDetails.receipt_url} target="_blank" rel="noopener noreferrer" className="text-[#38BDF8] underline">View Stripe Receipt</a>
                    </>
                  )}
                </div>
              )}
              <div>
                <div className="font-semibold mb-1 text-[#0A192F]">Items:</div>
                <ul className="list-disc ml-6">
                  {order.items.map((item, idx) => (
                    <li key={idx}>
                      {item.quantity} x {item.food?.name || 'Item'}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;