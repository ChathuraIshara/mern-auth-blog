const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Middleware to check if user is admin
const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Token not provided",
      });
    }

    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecoded.id) {
      const user = await User.findById(tokenDecoded.id);
      console.log("Decoded User:", user); // Debugging line to check the decoded user

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      if (user.role !== "admin") {
        return res.status(403).json({
          success: false,
          message: "Access denied. Admin privileges required",
        });
      }
      if (!req.body) {
        req.body = {}; //need to set this,otherwise body is undefined in some cases like get requests
      }
      req.body.userId = tokenDecoded.id;
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Invalid token",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Token verification failed",
    });
  }
};

module.exports = adminAuth;
