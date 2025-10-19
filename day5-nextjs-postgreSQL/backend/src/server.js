// ...existing code...
require('dotenv').config();
const express = require('express');
const cors = require("cors");
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes'); // Corrected typo in variable name

// 1. Initialize the Express app first
const app = express(); 

// 2. Apply Middleware
// CORS must be applied before routes to handle cross-origin requests
app.use(cors()); 
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware for parsing form data

// 3. Define and Apply Routes
app.use('/api/author', authorRoutes);
app.use('/api/book', bookRoutes); // Use the corrected variable name

// 4. Start the Server
const PORT = process.env.PORT || 5001;

// Capture the server instance returned by app.listen
const server = app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`); // Corrected typo in log message
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Choose another port or stop the process using it.`);
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});
// ...existing code...