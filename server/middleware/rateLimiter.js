/*
  rateLimiter.js - Middleware for rate limiting in Burger Queen backend
  Uses express-rate-limit to prevent abuse
*/

const rateLimit = require('express-rate-limit'); // Rate limiting middleware

/**
 * Rate limiter middleware
 * @returns {Function} Express middleware that limits repeated requests
 */
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '15') * 60 * 1000, // Window in ms (default 15 min)
  max: parseInt(process.env.RATE_LIMIT_MAX || '100'), // Max requests per window
  message: 'Too many requests, please try again later.'
});

module.exports = limiter; 