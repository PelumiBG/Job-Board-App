import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Admin from "../models/admin.js";

// Middleware to protect routes
export const protectAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Admin token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const admin = await Admin.findById(decoded.id).select("-password");
    if (!admin) {
      return res.status(403).json({ message: "Access denied" });
    }

    req.admin = admin;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired admin token" });
  }
};


export const protectUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // set token
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Allow only employers to access route
export const employerOnly = (req, res, next) => {
  console.log("req.user.role:", req.user?.role);
  if (req.user && req.user.role === "Employer") {
    next();
  } else {
    return res.status(403).json({ message: "Not Allowed Here" });
  }
};

export const adminOnly = (req, res, next) => {
  console.log("req.user.role:", req.user?.role);
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    return res.status(403).json({ message: "Only Admin Can access this page" });
  }
};

export const candidateOnly = (req, res, next) => {
  console.log("req.user.role:", req.user?.role);
  if (req.user && req.user.role === "Candidate") {
    next();
  } else {
    return res.status(403).json({ message: "Access Denied" });
  }
};