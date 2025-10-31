import Candidate from "../models/candidate.js";
import { validationResult } from 'express-validator';
import  jwt from "jsonwebtoken";

export const registerCandidate =  async (req, res) => {
  try{
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({errors:errors.array()});

    const { name, username, email, phone, password } = req.body;
    const existingCandidate = await Candidate.findOne({ email });
    if(existingCandidate) {
      return res.status(400).json({message: 'Candidate Already Exist'});
    };

    const newCandidate = await Candidate.create({ name, username, email, phone, password });

    newCandidate.save();
    
    res.satus(201).json({
      id:newCandidate._id,
      name:newCandidate.name,
      username:newCandidate.username,
      email:newCandidate.email,
      phone:newCandidate.phone
      });
  } catch(err){
    res.status(500).json({message:'Server Error' || err.message})
  }
 };

 export const loginCandidate = async (req, res) => {
  try{
    const { email, password } = req.body;

    // checks if candidate exist
    const candidate = Candidate.findOne({ email });
    if(!candidate) {
      return res.status(403).json({message:'Candidate Not Registered'})
    } else{
      res.status(200).json({message:'Welcome Back'});
    };

    // compared the input password securely
    const isMatch = await bcrypt.compare(password, candidate.password);
    if(!isMatch) return res.status(403).json({message:'Incorrect Password'});

    // sends a jwt token
    const token = jwt.sign(
      {id:candidate._id,email:candidate.email},
      process.env.JWT_SECRET,
      { expiresIn: '10d' }
    );

    //sends candidate info in json
    res.status(200).json({
      message:'Candidate Logged in Successfully',
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