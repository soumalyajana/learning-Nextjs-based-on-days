const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
require("dotenv").config();

// ==========================
// 🧩 Register User Controller
// ==========================
const registerUser = async (req, res) => {
  try {
    // ✅ Joi validation
    const schema = Joi.object({
      username: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().valid("user", "admin").optional(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { username, email, password, role } = value;

    // ✅ Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Register controller error",
      error: err.message,
    });
  }
};

// ==========================
// 🧩 Login User Controller
// ==========================
const loginUser = async (req, res) => {
  try {
    // ✅ Joi validation
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { email, password } = value;

    // ✅ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Email is not registered" });
    }

    // ✅ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    // ✅ Create JWT token
    const accessToken = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Login controller error",
      error: err.message,
    });
  }
};


// ==========================
// 🧩 Get Current User Controller
// ==========================
const getCurrentUser = async (req, res) => {
  try {
    // authMiddleware should attach user info to req.user
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Optionally, fetch fresh user data from DB
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Get current user controller error",
      error: err.message,
    });
  }
};

// ==========================
// 🧩 Change Password Controller
// ==========================
const changePassword = async (req, res) => {
  try {
    // ✅ Joi validation
    const schema = Joi.object({
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().min(6).required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const { oldPassword, newPassword } = value;
    const userId = req.user.userId;

    // ✅ Find user in DB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // ✅ Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Old password is incorrect" });
    }

    // ✅ Hash new password and update
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Change password controller error",
      error: err.message,
    });
  }
};



module.exports = { registerUser, loginUser , getCurrentUser , changePassword};
