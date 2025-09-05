import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};
export const vendorAuth = (req, res, next) => {
  if (req.user.role !== "vendor" && req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Vendor role required." });
  }
  next();
};
export const adminAuth = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access denied. Admin role required." });
  }
  next();
};
export const userAuth = (req, res, next) => {
  if (!req.user) {
    return res
      .status(403)
      .json({ message: "Access denied. Authentication required." });
  }
  next();
};
