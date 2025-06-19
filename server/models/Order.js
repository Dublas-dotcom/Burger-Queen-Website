/*
  Order.js - Mongoose model for orders in Burger Queen
  Fields: user, items, address, payment, paymentStatus, status, timestamps
*/

const mongoose = require('mongoose'); // MongoDB ODM

/**
 * Order schema for MongoDB
 * @property {ObjectId} user - Reference to User
 * @property {Array} items - List of food items and quantities
 * @property {String} address - Delivery address
 * @property {String} payment - Payment info (e.g., 'stripe')
 * @property {String} paymentStatus - Payment status ('paid', 'failed', 'pending')
 * @property {String} status - Order status
 * @property {Date} createdAt - Timestamp
 * @property {Object} paymentDetails - Payment details
 */
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      food: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
      quantity: { type: Number, required: true }
    }
  ],
  address: {
    type: String,
    required: true
  },
  payment: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['paid', 'failed', 'pending'],
    default: 'paid'
  },
  status: {
    type: String,
    enum: ['preparing', 'delivering', 'completed'],
    default: 'preparing'
  },
  paymentDetails: {
    type: Object,
    default: {},
  },
}, { timestamps: true });

// Export Order model
module.exports = mongoose.model('Order', orderSchema); 