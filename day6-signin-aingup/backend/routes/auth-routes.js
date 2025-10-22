// Import Express to create a router
const express = require('express');
const router = express.Router(); // Router helps organize routes in different files

// Import controller functions that handle logic for each route
// These will be defined in '../controllers/auth-controller.js'
const { registerUser, loginUser, changePassword ,getCurrentUser , forgotPassword, resetPassword} = require('../controllers/auth-controller');

// Import authentication middleware
// This middleware checks if a user is logged in (has a valid token)
const authMiddleware = require('../auth-middleware/auth-middleware');

/* ===========================
   📍 ROUTE 1 — Register User
   ===========================
   METHOD: POST
   URL: /api/auth/register
   DESCRIPTION: Registers a new user
   CONTROLLER: registerUser
*/
router.post('/register', registerUser);

/* ===========================
   📍 ROUTE 2 — Login User
   ===========================
   METHOD: POST
   URL: /api/auth/login
   DESCRIPTION: Logs in a user and returns a JWT token
   CONTROLLER: loginUser
*/
router.post('/login', loginUser);

/* ===========================
   📍 ROUTE 3 — Change Password
   ===========================
   METHOD: POST
   URL: /api/auth/change-password
   DESCRIPTION: Allows an authenticated user to change their password
   MIDDLEWARE: authMiddleware (protects this route)
   CONTROLLER: changePassword
*/
router.post('/change-password', authMiddleware, changePassword);

/* ===========================
   📍 EXPORT THE ROUTER
   ===========================
   This allows app.js or server.js to use this file.
   Example in server.js:
   app.use('/api/auth', require('./routes/auth-routes'));
*/

router.get("/me", authMiddleware, getCurrentUser);

module.exports = router;
