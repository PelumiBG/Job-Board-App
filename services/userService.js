import User from "../models/user.js";
import { validationResult } from 'express-validator';
import  jwt from "jsonwebtoken";

export const registerUser =  async (req, res) => {
  try{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});

    const { name, username, email, phone, password } = req.body;

    // check if account exist
    const existingUser = await User.findOne({ email });
    if(existingUser) {
      return res.status(400).json({message: 'Candidate Already Exist'});
    };

    // create an account for each user
    const newUser = await User.create({ name, username, email, phone, password });

    newUser.save();
    
    res.satus(201).json({
      id:newUser._id,
      name:newUser.name,
      username:newUser.username,
      email:newUser.email,
      phone:newUser.phone
      });
  } catch(err){
    res.status(500).json({message:'Server Error' || err.message})
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