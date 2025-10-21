// Import required modules
const multer = require('multer');
const path = require('path');

/* 
🧩 STEP 1 — Define where and how to store uploaded files
---------------------------------------------------------
multer.diskStorage() helps us control:
1️⃣ The destination (which folder files are saved in)
2️⃣ The filename (how uploaded files are named)
*/

const storage = multer.diskStorage({
  // 'destination' defines the folder where files will be stored
  destination: function (req, file, cb) {
    // cb(error, folderPath)
    cb(null, 'uploads/'); // ✅ store all uploaded files in "uploads" folder
  },

  // 'filename' defines the name used to save the file
  filename: function (req, file, cb) {
    // cb(error, newFileName)
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
    /*
      Example:
      if user uploads file from input name="image" and filename is "profile.jpg"
      Then saved name = "image-1734819200000.jpg"
      (fieldname + timestamp + original extension)
    */
  },
});

/*
🧩 STEP 2 — File Filter (to only allow certain file types)
----------------------------------------------------------
We’ll only allow images like jpeg, jpg, png, gif, webp, svg.
If user tries to upload something else (like pdf or exe), it’ll reject.
*/

const checkFileFilter = (req, file, cb) => {
  // Define allowed file types using a Regular Expression
  const fileTypes = /jpeg|jpg|png|gif|webp|svg/;

  // Check file extension (e.g., .jpg)
  const extname = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  // Check MIME type (e.g., image/jpeg)
  const mimeType = fileTypes.test(file.mimetype);

  if (extname && mimeType) {
    // ✅ Both checks passed → accept the file
    cb(null, true);
  } else {
    // ❌ File is not an image
    cb(
      new Error(
        'Invalid file type! Please upload only jpeg, jpg, png, gif, webp, or svg.'
      )
    );
  }
};

/*
🧩 STEP 3 — Create the 'upload' middleware
------------------------------------------
Here we pass all the configuration:
- storage: where and how to save files
- fileFilter: custom function to filter file types
- limits: restrict file size (e.g., 5 MB)
*/

const upload = multer({
  storage,                // where to save
  fileFilter: checkFileFilter, // ✅ correct key name is 'fileFilter'
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

/*
🧩 STEP 4 — Export the upload middleware
----------------------------------------
We can use this in routes to handle uploads.
*/

module.exports = upload;
