/*
  server.js - Main entry point for Burger Queen backend
  - Sets up Express server
  - Connects to MongoDB
  - Loads middleware and routes
*/

// Import required modules
const express = require('express'); // Express framework
const mongoose = require('mongoose'); // MongoDB ODM
const cors = require('cors'); // Enable CORS
const cookieParser = require('cookie-parser'); // Parse cookies
const dotenv = require('dotenv'); // Load environment variables

// Import rate limiter middleware
const rateLimiter = require('./middleware/rateLimiter'); // Rate limiting
dotenv.config();
// Import auth routes
const authRoutes = require('./routes/auth'); // Authentication routes

// Import food routes
const foodRoutes = require('./routes/food'); // Food menu routes

// Import order and admin routes
const orderRoutes = require('./routes/orders'); // User order routes
const adminRoutes = require('./routes/admin'); // Admin panel routes

// Import payment routes
const paymentRoutes = require('./routes/payment'); // Stripe payment routes

// Load environment variables from .env file


// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true // Allow cookies
}));
app.use(cookieParser()); // Parse cookies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Example route
app.get('/', (req, res) => {
  res.send('Burger Queen API is running');
});

// Apply rate limiter to all API routes
app.use('/api', rateLimiter); // Limit repeated requests to API

// Use authentication routes
app.use('/api/auth', authRoutes); // Auth endpoints

// Use food routes
app.use('/api/food', foodRoutes); // Food endpoints

// Use order and admin routes
app.use('/api/orders', orderRoutes); // User order endpoints
app.use('/api/admin', adminRoutes); // Admin panel endpoints

// Use payment routes
app.use('/api/payment', paymentRoutes); // Stripe payment endpoints

// TODO: Import and use routes (auth, food, orders, admin)
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/food', require('./routes/food'));
// app.use('/api/orders', require('./routes/orders'));
// app.use('/api/admin', require('./routes/admin'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 