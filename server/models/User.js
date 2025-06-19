/*
  User.js - Mongoose model for users in Burger Queen
  Fields: email, password (hashed), isAdmin
*/

const mongoose = require('mongoose'); // MongoDB ODM

/**
 * User schema for MongoDB
 * @property {String} email - User's email (unique)
 * @property {String} password - Hashed password
 * @property {Boolean} isAdmin - Admin flag (default: false)
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

// Export User model
module.exports = mongoose.model('User', userSchema); 