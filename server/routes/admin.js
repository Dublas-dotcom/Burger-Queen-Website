/*
  admin.js - Express routes for admin panel in Burger Queen backend
  Endpoints: /orders (list, update), /food (CRUD)
*/

const express = require('express'); // Express framework
const router = express.Router(); // Router instance
const orderController = require('../controllers/orderController'); // Order logic
const foodController = require('../controllers/foodController'); // Food logic
const auth = require('../middleware/auth'); // Auth middleware
const admin = require('../middleware/admin'); // Admin middleware

// @route   GET /api/admin/orders
// @desc    Get all orders (admin only)
// @access  Admin
router.get('/orders', auth, admin, orderController.getAllOrders);

// @route   PUT /api/admin/orders/:id
// @desc    Update order status (admin only)
// @access  Admin
router.put('/orders/:id', auth, admin, orderController.updateOrderStatus);

// Optionally, admin can also manage food via /api/food endpoints

/*
Example usage:
GET  /api/admin/orders
PUT  /api/admin/orders/:id { status }
*/

module.exports = router; 