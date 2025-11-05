import express from "express";
import { registerUser, loginUser } from "../services/userService.js";
import { employerOnly } from "../middlewares/authMiddleeware.js";


const router = express.Router();

//registration for employers
router.post("/register", employerOnly, registerUser);

// login route for employers
router.post("/login", employerOnly, loginUser);

export default router;