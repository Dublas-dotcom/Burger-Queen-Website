/*
  Food.js - Mongoose model for food items in Burger Queen
  Fields: name, description, price, image, category
*/

const mongoose = require('mongoose'); // MongoDB ODM

/**
 * Food schema for MongoDB
 * @property {String} name - Name of the food item
 * @property {String} description - Description of the food item
 * @property {Number} price - Price of the food item
 * @property {String} image - Image URL or path
 * @property {String} category - Category (e.g., pizza, burger)
 */
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

// Export Food model
module.exports = mongoose.model('Food', foodSchema); 