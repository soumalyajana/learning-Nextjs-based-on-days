const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
// const crypto = require("crypto");
// const nodemailer = require("nodemailer");
require("dotenv").config();

// ----------------- Register User -----------------
const registerUser = async (req, res) => {
  try {
    const schema = Joi.object({
      username: Joi.string().min(3).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().valid("user", "admin").optional(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const { username, email, password, role } = value;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) return res.status(400).json({ success: false, message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword, role: role || "user" });
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { id: newUser._id, username, email, role: newUser.role },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Register error", error: err.message });
  }
};

// ----------------- Login User -----------------
const loginUser = async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const { email, password } = value;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ success: false, message: "Email not registered" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect password" });

    const accessToken = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
  success: true,
  message: "User logged in successfully",
  accessToken,
  user: { id: user._id, username: user.username, email, role: user.role },
});

  } catch (err) {
    res.status(500).json({ success: false, message: "Login error", error: err.message });
  }
};

// ----------------- Get Current User -----------------
const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });

    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Get user error", error: err.message });
  }
};

// ----------------- Change Password -----------------
const changePassword = async (req, res) => {
  try {
    const schema = Joi.object({
      oldPassword: Joi.string().required(),
      newPassword: Joi.string().min(6).required(),
    });
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ success: false, message: error.details[0].message });

    const { oldPassword, newPassword } = value;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Old password incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Change password error", error: err.message });
  }
};

// ----------------- Forgot Password -----------------
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

//     user.resetPasswordToken = hashedToken;
//     user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
//     await user.save();

//     const resetUrl = `http://localhost:3000/auth/reset-password/${resetToken}`;

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: user.email,
//       subject: "Password Reset Request",
//       html: `<p>Click the link below to reset your password:</p><a href="${resetUrl}">${resetUrl}</a>`,
//     });

//     res.status(200).json({ success: true, message: "Reset link sent to email" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// ----------------- Reset Password -----------------
// const resetPassword = async (req, res) => {
//   try {
//     const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

//     const user = await User.findOne({
//       resetPasswordToken: hashedToken,
//       resetPasswordExpire: { $gt: Date.now() },
//     });
//     if (!user) return res.status(400).json({ success: false, message: "Invalid or expired token" });

//     user.password = await bcrypt.hash(req.body.password, 10);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save();

//     res.status(200).json({ success: true, message: "Password reset successful" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  changePassword,
  //forgotPassword,
  //resetPassword,
};
