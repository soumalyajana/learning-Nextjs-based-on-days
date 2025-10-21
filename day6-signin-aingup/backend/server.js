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
const PORT = process.env.PORT || 3000;

// middleware to parse JSON requests
app.use(express.json());
//enable CORS for all origins
app.use(cors()); 

app.use('/api/auth', authRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/images', uploadImageRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});