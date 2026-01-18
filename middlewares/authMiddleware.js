const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: false,
        message: "Authentication required",
        redirect: true,
      });
    }

    const token = authHeader.split(" ")[1]; 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user || user.status !== "Active") {
      return res.status(401).json({
        status: false,
        message: "Unauthorized user",
        redirect: true,
      });
    }

    const dbUpdatedAt = new Date(user.updatedAt).getTime();
    const tokenUpdatedAt = decoded.updatedAt ? new Date(decoded.updatedAt).getTime() : 0;

    if (dbUpdatedAt > tokenUpdatedAt + 1000) {
      return res.status(401).json({
        status: false,
        message: "Session expired. Please log in again.",
        redirect: true,
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
      redirect: true,
    });
  }
};

module.exports = authMiddleware;
