require('dotenv').config();
const cors = require('cors');
const express = require('express');
const ConnectDB = require('./database/db');
const authRoutes = require('./routes/auth-routes');
const homeRoutes = require('./routes/home-routes');
const adminRoutes = require('./routes/admin-routes');
const uploadImageRoutes = require('./routes/image-routes');

// Connect to the database
ConnectDB();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for your frontend origin and allow credentials
app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  credentials: true, // allow cookies / Authorization headers
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/images', uploadImageRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
