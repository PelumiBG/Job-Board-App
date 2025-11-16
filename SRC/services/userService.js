import User from "../models/user.js";
import bcrypt from "bcryptjs";
import  jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";
import { sendWelcomeEmail } from "../services/emailService.js";

export const registerUser = async (req, res) => {
  try {
    const { name, username, email, phone, password  } = req.body;

    // check if account exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    // create new user
    const newUser = await User.create({ name, username, email, phone, password , role:"Candidate"});
      
    try {
      await sendWelcomeEmail(newUser.email, newUser.name);
      console.log(`Email sent to: ${newUser.email}`);
    }catch(err){
      res.status(403).json({message:err.message})
    };

    // generate token
    const token = generateToken(newUser);

    // sends json response
    res.status(201).json({
      message:'Registered Scuccessfully',
      user:{
        id:newUser._id,
        name:newUser.name,
        username:newUser.username,
        email:newUser.email,
        phone:newUser.phone,
        role:newUser.role
      },
      token
    });

  } catch (err) {
    res.status(500).json({ message: err.message || "Server Error" });
  }
};

 export const loginUser = async (req, res) => {
  try{
    const { email, password } = req.body;

    // checks if candidate exist
    const user = await User.findOne({ email });
    if(!user) {
      return res.status(403).json({message:'Candidate Not Registered'})
    };

    // compared the input password securely
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(403).json({message:'Incorrect Password'});

    // sends a jwt token
    const token = jwt.sign(
      {id:user._id,role:user.role},
      process.env.JWT_SECRET,
      { expiresIn: '10d' }
    );

    //sends candidate info in json
    res.status(200).json({
      message:'User Logged in Successfully',
      token,
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
      }
    });
  } catch(error) {
    res.status(500).json({
      status:false,
      message:error.message
    });
  };
 };