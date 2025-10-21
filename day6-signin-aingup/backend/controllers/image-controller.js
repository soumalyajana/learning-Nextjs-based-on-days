const Image = require("../models/image");
const uploadToCloudinary = require("../helpers/cloudinaryHelpers");
const fs = require("fs"); // to handle file system operations
const cloudinary = require("../config/cloudnary");
const { parse } = require("path");

const uploadImageController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided",
      });
    }

    // Upload to Cloudinary
    const { url, publicId } = await uploadToCloudinary(req.file.path);

    if (!url || !publicId) {
      return res.status(500).json({
        success: false,
        message: "Failed to upload image to Cloudinary",
      });
    }

    // Save in DB
    const newUploadedImage = new Image({
      url,
      publicId,
      uploadedBy: req.user?.userId, // make sure auth middleware adds this
    });

    await newUploadedImage.save();

    // ✅ Clean up local file
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete local file:", err);
    });

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      image: newUploadedImage,
    });
  } catch (error) {
    console.error("Upload image error:", error);
    return res.status(500).json({
      success: false,
      message: "Image upload failed",
      error: error.message,
    });
  }
}

const fetchAllImagesController = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const sortBy = req.query.sortBy || "createdAt";
    const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const totalImages = await Image.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);

    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    const images = await Image.find()
      .sort(sortObj)
      .skip(skip)
      .limit(limit)
      .populate("uploadedBy", "username email"); // optional

    if (!images || images.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No images found",
      });
    }

    return res.status(200).json({
      success: true,
      currentPage: page,
      totalPages,
      totalImages,
      count: images.length,
      data: images,
      message: "Images fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching images:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch images",
      error: error.message,
    });
  }
};




const deleteImageController = async (req, res) => {
  try {
    const imageId = req.params.id; // get image ID from URL
    const userId = req.user.userId; // from JWT

    // Find the image
    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    // Check ownership
    if (image.uploadedBy.toString() !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this image",
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.publicId);

    // Delete from MongoDB
    await Image.findByIdAndDelete(imageId);

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Delete image error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete image",
      error: error.message,
    });
  }
};

module.exports = {
  uploadImageController,
  fetchAllImagesController,
  deleteImageController,
};