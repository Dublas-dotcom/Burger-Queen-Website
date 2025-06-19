/*
  orderController.js - Handles order logic for Burger Queen backend
  Functions: createOrder, getUserOrders, getAllOrders, updateOrderStatus
*/

const Order = require('../models/Order'); // Order model

/**
 * Create a new order
 * @param {Object} req - Express request object (body: items, address, payment)
 * @param {Object} res - Express response object
 * @returns {Object} Created order
 */
exports.createOrder = async (req, res) => {
  try {
    const { items, address, payment, paymentDetails } = req.body;
    const order = new Order({
      user: req.user._id,
      items,
      address,
      payment,
      paymentStatus: 'paid',
      paymentDetails,
      status: 'preparing'
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get all orders for the logged-in user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} List of user's orders
 */
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.food').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get all orders (admin only)
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Array} List of all orders
 */
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items.food').sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update order status (admin only)
 * @param {Object} req - Express request object (params: id, body: status)
 * @param {Object} res - Express response object
 * @returns {Object} Updated order
 */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/*
Example usage:
POST   /api/orders (user)
GET    /api/orders (user)
GET    /api/admin/orders (admin)
PUT    /api/admin/orders/:id (admin)
*/ 