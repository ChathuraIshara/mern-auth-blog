// Simple function to print hello world
function printHelloWorld() {
  console.log('hello world');
}
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const transporter = require("../config/nodeMailerConfig"); // importing transporter for sending emails via nodemailer

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save(); // user creating and saving

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    }); // sets a cookie in the user's browser,stores data (like a token) in the browser for future use.
    // Send a welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to Techphantoms",
      text: `Hello ${name},\n\nThank you for registering! Your account has been created with email id: ${email}`,
    };
    transporter.sendMail(mailOptions); // sending email using nodemailer
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Please fill all the fields" });
  }
  try {
    const existinguser = await User.findOne({ email });
    if (!existinguser) {
      return res
        .status(400)
        .json({ success: false, message: "User not found!" });
    }
    const isMatching = await bcrypt.compare(password, existinguser.password);
    if (!isMatching) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials!" });
    }
    const token = jwt.sign({ id: existinguser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    }); // sets a cookie in the user's browser,stores data (like a token) in the browser for future use.
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    return res.json({
      success: true,
      message: "All users deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user.isAccountVerified) {
      return res
        .status(200)
        .json({ success: false, message: "Account is already verified" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000); // generate a 6-digit OTP
    user.verifyOtp = otp.toString();
    user.verifiyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; // OTP expires in 24 hours

    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Verify your email",
      text: `Your OTP is ${otp}. It is valid for 24 hours.`,
    };
    transporter.sendMail(mailOptions);
    return res
      .status(200)
      .json({ success: true, message: "OTP sent to your email" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Verify the user otp
const verifyOtp = async (req, res) => {
  const { userId, otp } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }
    if (user.verifiyOtpExpireAt < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "OTP has expired" });
    }
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifiyOtpExpireAt = 0;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Account verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Check suer is authenticated
const isAuthenticated = async (req, res) =>
{
  try{
    return res.status(200).json({ success: true, message: "User is authenticated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}



module.exports = {
  register,
  login,
  deleteAllUsers,
  logout,
  sendVerifyOtp,
  verifyOtp,
  isAuthenticated
};
