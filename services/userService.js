import User from "../models/user.js";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { name, username, email, phone, password  } = req.body;

    // check if account exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Candidate Already Exists" });
    }

    const secPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({ name, username, email, phone, password:secPassword , role:"Candidate"});
    await newUser.save();

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
    const user = User.findOne({ email });
    if(!user) {
      return res.status(403).json({message:'Candidate Not Registered'})
    } else{
      res.status(200).json({message:'Welcome Back'});
    };

    // compared the input password securely
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(403).json({message:'Incorrect Password'});

    // sends a jwt token
    const token = jwt.sign(
      {id:user._id,email:user.email},
      process.env.JWT_SECRET,
      { expiresIn: '10d' }
    );

    //sends candidate info in json
    res.status(200).json({
      message:'User Logged in Successfully',
      user:{
        id:user._id,
        name:user.name,
        email:user.email,
        token
      }
    });
  } catch(error) {
    res.status(500).json({
      status:false,
      message:error.message
    });
  };
 };