const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({ success: false, message: "Not authorized. Login again" });
  }
  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecoded.id) {
      req.body.userId = tokenDecoded.id;
    } else {
      return res.json({
        success: false,
        message: "Not authorized. Login again",
      });
    }
    next();
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

module.exports = userAuth;
