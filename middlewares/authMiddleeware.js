import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Admin from "../models/admin.js";

// Middleware to protect routes
export const protectAdmin = async (req, res, next) => {
  let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await Admin.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "Admin not found" });
            }

            next();
        }   catch (error) {
                console.log("Auth Header:", req.headers.authorization);
                return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Token not Detected" });
    }
};

export const protectUser = async (req, res, next) => {
  let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            //Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                return res.status(401).json({ message: "Admin not found" });
            }

            next();
        }   catch (error) {
                console.log("Auth Header:", req.headers.authorization);
                return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Token not Detected" });
    }
};

// Middleware to check employer role
export const employerOnly = (req, res, next) => {
    if (req.user && req.user.role === "employer") {
        next();
    } else {
        return res.status(403).json({ message: "Not authorized as an Employee" });
    }
};