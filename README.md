# 🍔 Burger Queen

A full-featured food ordering platform built with the **MERN stack** (MongoDB, Express, React, Node.js) and Stripe payments.

---

## 🚀 Features
- **User Authentication:** Register, login, persistent sessions (JWT, cookies)
- **Menu Browsing:** Dynamic food menu, category filter, search
- **Cart:** Add/remove/update items, persistent with LocalStorage
- **Checkout:** Stripe payment integration, order summary, address capture
- **Order History:** Users see their past orders and payment status
- **Admin Panel:**
  - CRUD for food items
  - View and update all customer orders
  - Filter/search by payment status
- **Responsive UI:** Modern, mobile-first design with Tailwind CSS

---

## 🏗️ Project Architecture

```
Burger-Queen-Website/
├── client/           # React frontend (Vite, Tailwind, Stripe.js)
│   ├── src/
│   │   ├── components/   # Navbar, ProtectedRoute, etc.
│   │   ├── context/      # AuthContext, CartContext
│   │   ├── pages/        # Menu, Cart, Orders, Admin, Login, Register, Checkout
│   │   └── ...
│   └── ...
├── server/           # Node.js/Express backend
│   ├── controllers/   # Route logic (auth, food, orders, admin)
│   ├── models/        # Mongoose models (User, Food, Order)
│   ├── routes/        # Express routes (auth, food, orders, admin, payment)
│   ├── middleware/    # Auth, admin, rate limiting
│   ├── utils/         # Helper scripts (e.g., seedAdmin.js)
│   ├── .env.example   # Example environment variables
│   └── server.js      # Entry point
└── README.md          # Project documentation
```

---

## ⚙️ Setup Instructions

### 1. **Clone the repository**
```bash
git clone https://github.com/Dublas-dotcom/Burger-Queen-Website.git
cd Burger-Queen-Website
```

### 2. **Backend Setup (server)**
```bash
cd server
npm install
cp .env.example .env  # Fill in your MongoDB, JWT, and Stripe keys
npm run dev           # or: node server.js
```

### 3. **Frontend Setup (client)**
```bash
cd ../client
npm install
cp .env.example .env  # Fill in your API URL and Stripe publishable key
npm run dev           # Vite dev server (default: http://localhost:5173)
```

---

## 🔑 Environment Variables

### **server/.env**
```
MONGO_URI=mongodb://localhost:27017/burgerqueen
JWT_SECRET=your_jwt_secret_here
PORT=5000
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
STRIPE_SECRET_KEY=sk_test_...
```

### **client/.env**
```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 🧩 Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, React Router, Stripe.js
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Stripe SDK
- **Authentication:** JWT, cookies
- **Payments:** Stripe
- **State:** React Context, LocalStorage

---

## 🗂️ Key Folders & Files
- `client/src/pages/` — All main pages (Menu, Cart, Orders, Admin, etc.)
- `client/src/context/` — Global state (auth, cart)
- `server/controllers/` — Route logic
- `server/models/` — Mongoose schemas
- `server/routes/` — API endpoints
- `server/utils/seedAdmin.js` — Script to create an admin user

---

## 🧑‍💻 Example Usage
- Register or login as a user
- Browse the menu, add items to your cart
- Go to Cart, then Checkout, pay with Stripe test card
- View your order and payment status in Order History
- Admins can manage menu and all orders in the Admin panel

---

## 📝 License
MIT