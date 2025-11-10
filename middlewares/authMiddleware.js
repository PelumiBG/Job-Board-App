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
                return res.status(401).json({ message: "User not found" });
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

// Allow only employers to access route
export const employerOnly = (req, res, next) => {
  console.log("req.user.role:", req.user?.role);// for debug ref
  if (req.user && req.user.role === "Employer") {
    next();
  } else {
    return res.status(403).json({ message: "Not Allowed Here" });
  }
};

export const adminOnly = (req, res, next) => {
  try{
    console.log("req.user.role:", req.user?.role); // for debug ref
    if(req.user && req.user.role === 'Admin'){
      next()
    }else{
      return res.status(403).json({status:false,message:"Cannot Access This Page"})
    }
  }catch(err){
    res.status(404).json({message:err.message})
  }
};

export const candidateOnly = (req, res, next) => {
  console.log("req.user.role:", req.user?.role); // for debug ref
  if (req.user && req.user.role === "Candidate") {
    next();
  } else {
    return res.status(403).json({ message: "Access Denied" });
  }
};