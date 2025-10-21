const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // load .env variables

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // from .env
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
