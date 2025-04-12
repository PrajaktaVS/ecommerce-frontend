# MERN Stack eCommerce Website - Frontend

This is the **frontend** of an eCommerce website built using **React + Vite**. The application allows users to register, login, browse products and perform a mock checkout. Only authenticated users can interact with the cart.

---

## Features

-  User Registration & Login (JWT based)
-  Authentication with protected routes
-  Product Grid with Modal View
-  Fake Cart System with localStorage
-  Add to Cart + Quantity Update
-  Toast Notifications (Success/Error)
-  "Login to Add" logic for cart
-  Responsive Design for Mobile/Desktop
-  My Account dropdown post-login
-  Checkout success toast + review option

---

## Tech Stack

- React + Vite
- Bootstrap / React-Bootstrap
- React Router
- Context API
- Toastify
- LocalStorage

---

## Folder Structure
src/
│── assets/
│── components/
│── pages/
│── store/
│── App.jsx
│── main.jsx
│── index.css

### Data Handling

- **User Authentication**: Only **Register** and **Login** information (like username, email, and password) is securely stored in the MongoDB database.
- **Cart Functionality**: All cart operations (adding/removing items, viewing cart) are handled using **localStorage**. Cart data is stored locally on the user's browser and is **not saved to the backend**.


##  Installation

### 1. Clone the repository

git clone https://github.com/PrajaktaVS/ecommerce-frontend.git
cd ecommerce-frontend

### 2. Install dependencies
npm install

### 3. Run the development server
npm run dev

## Author
Prajakta
MERN Stack Developer


##  How to Test Functionality

To properly check the functionality of the application, follow these steps:

1. **Register an Account**:
   - Navigate to the registration page.
   - Fill in your username, email, and password.
   - Click **"Register"** to create your account.

2. **Login to Your Account**:
   - Once registered, log in with your credentials.
   - This will generate a JWT token for authentication.

3. **Explore the Features**:
   - After logging in, you can explore features like adding products to the cart, placing an order, etc.

**Note**: If you test without registering, certain features may not work as expected, such as user-specific data or cart functionality.



```bash
