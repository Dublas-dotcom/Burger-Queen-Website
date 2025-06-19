/*
  orders.js - Express routes for user orders in Burger Queen backend
  Endpoints: / (create, list)
*/

const express = require('express'); // Express framework
const router = express.Router(); // Router instance
const orderController = require('../controllers/orderController'); // Order logic
const auth = require('../middleware/auth'); // Auth middleware

// @route   POST /api/orders
// @desc    Create a new order
// @access  User (logged in)
router.post('/', auth, orderController.createOrder);

// @route   GET /api/orders
// @desc    Get all orders for logged-in user
// @access  User (logged in)
router.get('/', auth, orderController.getUserOrders);

/*
Example usage:
POST /api/orders { items, address, payment }
GET  /api/orders
*/

module.exports = router; 