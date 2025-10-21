const express = require("express");
const authMiddleware = require("../auth-middleware/auth-middleware");
const adminMiddleware = require("../auth-middleware/admin-middleware");
const uploadMiddleware = require("../auth-middleware/upload-middleware");
const {
  uploadImageController,
  fetchAllImagesController,
  deleteImageController,
} = require("../controllers/image-controller");

const router = express.Router();

//Upload image route

router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),
  uploadImageController
);

// to get all images route
router.get("/get", authMiddleware, fetchAllImagesController);

//68c0885df910bfeb15175254

//delete images route
router.delete("/:id", authMiddleware, adminMiddleware, deleteImageController);

module.exports = router;