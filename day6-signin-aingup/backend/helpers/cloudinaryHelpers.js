// Import express (optional here, not required but often used in controllers)
const e = require('express');

// Import our Cloudinary configuration
// This file ('../config/cloudnary') contains your Cloudinary credentials setup
const cloudinary = require('../config/cloudnary');

// 🔹 Function to upload image to Cloudinary
const uploadToCloudinary = async (filePath) => {
    try {
        // 1️⃣ Upload the image using the Cloudinary SDK
        // - 'filePath' is the local path where Multer temporarily stored the image
        // - Cloudinary will read the file and upload it to your Cloudinary account
        const result = await cloudinary.uploader.upload(filePath);

        // 2️⃣ Return the 'secure_url' (actual image link) and 'public_id' (for deleting later)
        // Example result from Cloudinary:
        // {
        //   asset_id: "b5a0d1f7...",
        //   public_id: "uploads/myPhoto_ab12cd",
        //   version: 1728154280,
        //   signature: "fb4c6d...",
        //   secure_url: "https://res.cloudinary.com/soumalya/image/upload/v1728154280/uploads/myPhoto.png",
        //   format: "png",
        //   resource_type: "image"
        // }
        return {
            url: result.secure_url,   // ✅ Permanent online image URL
            publicId: result.public_id // ✅ Used later to delete the image
        };
    } catch (err) {
        // 3️⃣ If anything goes wrong (e.g., network or config error), log it for debugging
        console.error('Cloudinary upload error:', err);

        // Re-throw the error so your controller can handle it
        throw err;
    }
}

// Export this helper function so other files (like controllers) can use it
module.exports = uploadToCloudinary;
