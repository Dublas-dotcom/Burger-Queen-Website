/*
  seedAdmin.js - Script to create an admin user if one doesn't exist
  Usage: node utils/seedAdmin.js
*/

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  createAdmin();
}).catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

/**
 * Create an admin user if one doesn't exist
 */
async function createAdmin() {
  const email = 'admin@burgerqueen.com'; // Change as needed
  const password = 'admin123'; // Change as needed
  try {
    let user = await User.findOne({ email });
    if (user) {
      if (!user.isAdmin) {
        user.isAdmin = true;
        await user.save();
        console.log('Existing user promoted to admin:', email);
      } else {
        console.log('Admin user already exists:', email);
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ email, password: hashedPassword, isAdmin: true });
      await user.save();
      console.log('Admin user created:', email);
    }
  } catch (err) {
    console.error('Error creating admin user:', err);
  } finally {
    mongoose.disconnect();
  }
}

/*
To use:
1. Set your MONGO_URI and JWT_SECRET in .env
2. Run: node utils/seedAdmin.js
3. Login with email: admin@burgerqueen.com, password: admin123
*/ 