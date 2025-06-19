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
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Order History</h1>
      {loading ? (
        <div>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div>No past orders found.</div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded shadow p-4">
              <div className="flex justify-between mb-2">
                <div className="font-semibold">Order #{order._id}</div>
                <div className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</div>
              </div>
              <div className="mb-2">Status: <span className="font-bold capitalize">{order.status}</span></div>
              <div className="mb-2">Payment Status: <span className={`font-bold capitalize ${order.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>{order.paymentStatus}</span></div>
              {order.paymentDetails && (order.paymentDetails.last4 || order.paymentDetails.receipt_url) && (
                <div className="mb-2 text-sm text-gray-700">
                  {order.paymentDetails.last4 && (
                    <span>Card: **** **** **** {order.paymentDetails.last4} ({order.paymentDetails.brand})</span>
                  )}
                  {order.paymentDetails.receipt_url && (
                    <>
                      {' '}|{' '}
                      <a href={order.paymentDetails.receipt_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View Stripe Receipt</a>
                    </>
                  )}
                </div>
              )}
              <div>
                <div className="font-semibold mb-1">Items:</div>
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