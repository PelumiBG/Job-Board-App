import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";
import { sendWelcomeEmailEmployer } from "./emailService.js";

// Employers Register Route
export const registerEmployer = async (req, res) => {
    try{
        const { name , username, employerName, email, phone, password } = req.body;

        // check if Employers account already Exist
        const existingUser = await User.findOne({ email });
        if(existingUser) res.status(403).json({status:false, message:'Employer Already Exist'});

        const employer = await User.create({
          name,
          username,
            employerName,
            email,
            phone,
            password,
            role:'Employer'
        });

        await sendWelcomeEmailEmployer(employer.email,employer.name);

        res.status(201).json({
            status:'SUCCESS',
            employer:{
                id:employer._id,
                username:employer.username,
                employerName:employer.employerName,
                email:employer.email,
                phone:employer.phone,
                role:employer.role
            },

            token:generateToken(employer)
        })
    }catch(error){
        res.status(400).json({message:error.message})
    }
};

// Employers Login Route
export const loginEmployer = async (req, res) => {
    try {
        const { email, password } = req.body;

        const employer = await User.findOne({ email });
        if (!employer) {
            return res.status(403).json({ status: false, message: "Account Not Registered" });
        };

        const isMatch = await bcrypt.compare(password, employer.password);
        if (!isMatch) {
            return res.status(403).json({ status: false, message: "Incorrect Password" });
        }

        const token = jwt.sign(
            { id: employer._id, role: employer.role },
            process.env.JWT_SECRET,
            { expiresIn: "10d" }
        );

        res.status(200).json({
            status: true,
            message: "Login Successful",
            token,
            employer: {
                id: employer._id,
                name: employer.name,
                email: employer.email,
                role: employer.role
            }
        });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};