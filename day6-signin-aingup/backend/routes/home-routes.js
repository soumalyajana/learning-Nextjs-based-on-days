const express = require("express");
const authMiddleware = require("../auth-middleware/auth-middleware");

const router = express.Router();

// Protected welcome route
router.get("/welcome", authMiddleware, (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Welcome to the home page",
      user: req.user, // authMiddleware usually attaches user info
    });
  } catch (error) {
    console.error("Error in /welcome route:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
});

module.exports = router;