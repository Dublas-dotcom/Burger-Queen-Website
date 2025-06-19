/*
  foodController.js - Handles CRUD operations for food items in Burger Queen backend
  Functions: getAllFood, getFoodById, createFood, updateFood, deleteFood
*/

const Food = require('../models/Food'); // Food model

/**
 * Get all food items, with optional filtering by category and search by name.
 * @param {Object} req - Express request object (query: category, search)
 * @param {Object} res - Express response object
 * @returns {Array} List of food items
 */
exports.getAllFood = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    const food = await Food.find(filter);
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get a single food item by ID.
 * @param {Object} req - Express request object (params: id)
 * @param {Object} res - Express response object
 * @returns {Object} Food item
 */
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Create a new food item (admin only).
 * @param {Object} req - Express request object (body: name, description, price, image, category)
 * @param {Object} res - Express response object
 * @returns {Object} Created food item
 */
exports.createFood = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const food = new Food({ name, description, price, image, category });
    await food.save();
    res.status(201).json(food);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update a food item by ID (admin only).
 * @param {Object} req - Express request object (params: id, body: fields to update)
 * @param {Object} res - Express response object
 * @returns {Object} Updated food item
 */
exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Delete a food item by ID (admin only).
 * @param {Object} req - Express request object (params: id)
 * @param {Object} res - Express response object
 * @returns {Object} Deleted food item
 */
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: 'Food not found' });
    res.json({ message: 'Food deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

/*
Example usage:
GET    /api/food?category=burger&search=cheese
GET    /api/food/:id
POST   /api/food (admin)
PUT    /api/food/:id (admin)
DELETE /api/food/:id (admin)
*/ 