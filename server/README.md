# Burger Queen Backend (server)

Burger Queen is a full-featured food ordering backend built with Node.js, Express, and MongoDB. It supports user authentication, food menu management, order processing, and admin controls.

## Features
- User registration and login with JWT authentication
- Secure password hashing
- Persistent sessions with JWT
- Rate limiting for security
- Food menu CRUD (admin only)
- Order creation and status tracking
- Admin panel for managing orders and menu

## Folder Structure
```
server/
  controllers/   # Route logic (auth, food, orders, admin)
  models/        # Mongoose models (User, Food, Order)
  routes/        # Express routes
  middleware/    # Auth, admin, rate limiting
  utils/         # Helper functions
  .env.example   # Example environment variables
  server.js      # Entry point
```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and fill in your values.
3. Start the server:
   ```bash
   npm run dev
   ```

## Example .env
See `.env.example` for required variables.

## API Endpoints
- `/api/auth/register` - Register user
- `/api/auth/login` - Login user
- `/api/auth/logout` - Logout
- `/api/food` - Food menu (CRUD for admin)
- `/api/orders` - Order endpoints
- `/api/admin` - Admin controls

## License
MIT 