/*
  food.js - Express routes for food menu in Burger Queen backend
  Endpoints: / (list, create), /:id (get, update, delete)
*/

const express = require('express'); // Express framework
const router = express.Router(); // Router instance
const foodController = require('../controllers/foodController'); // Food logic
const auth = require('../middleware/auth'); // Auth middleware
const admin = require('../middleware/admin'); // Admin middleware

// @route   GET /api/food
// @desc    Get all food items (with optional filter/search)
// @access  Public
router.get('/', foodController.getAllFood);

// @route   GET /api/food/:id
// @desc    Get a single food item by ID
// @access  Public
router.get('/:id', foodController.getFoodById);

// @route   POST /api/food
// @desc    Create a new food item
// @access  Admin only
router.post('/', auth, admin, foodController.createFood);

// @route   PUT /api/food/:id
// @desc    Update a food item by ID
// @access  Admin only
router.put('/:id', auth, admin, foodController.updateFood);

// @route   DELETE /api/food/:id
// @desc    Delete a food item by ID
// @access  Admin only
router.delete('/:id', auth, admin, foodController.deleteFood);

/*
Example usage:
GET    /api/food?category=burger&search=cheese
GET    /api/food/:id
POST   /api/food (admin)
PUT    /api/food/:id (admin)
DELETE /api/food/:id (admin)
*/

module.exports = router; 