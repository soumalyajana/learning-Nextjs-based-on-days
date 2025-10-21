const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  // ❌ Fix: it should be req.headers.authorization (not req.header.authorization)
  const authHeader = req.headers.authorization;

  // Check if header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing or malformed"
    });
  }

  // Extract token
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is missing"
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info to request object
    req.user = decoded;

    next(); // pass control to next middleware / controller
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token",
      error: err.message
    });
  }
};

module.exports = authMiddleware;
