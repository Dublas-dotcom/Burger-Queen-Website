/*
  admin.js - Middleware to check if user is admin in Burger Queen backend
  Protects admin-only routes
*/

/**
 * Middleware to check if user is admin
 * @param {Object} req - Express request object (expects req.user)
 * @param {Object} res - Express response object
 * @param {Function} next - Next middleware function
 */
const admin = (req, res, next) => {
  // Check if user is authenticated and isAdmin flag is true
  if (req.user && req.user.isAdmin) {
    return next(); // User is admin, proceed
  }
  // User is not admin
  return res.status(403).json({ message: 'Admin access required' });
};

module.exports = admin; 