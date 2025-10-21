// Import express
const express = require('express');
const router = express.Router();

// Import middleware
const authMiddleware = require("../auth-middleware/auth-middleware");
const adminMiddleware = require("../auth-middleware/admin-middleware");

// Protected route (only for admins)
router.get("/welcome", authMiddleware, adminMiddleware, (req, res) => {
  try {
    // Send a success message
    res.status(200).json({
      success: true,
      message: `Welcome Admin, ${req.user.username}!`,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong in /welcome route",
      error: err.message,
    });
  }
});

// Export router
module.exports = router;
