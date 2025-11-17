import Admin from '../models/admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/generateToken.js';
import User from '../models/user.js';
import mongoose from 'mongoose';
import { paginate } from '../utils/paginate.js';


export const registerAdmin = async (req, res) => {
    try{

      // Role check after the initial Admin has been created and only admin can register another
      // if (req.user.role !== "Admin") {
      //       return res.status(403).json({ message: "You can't access this page" });
      //   }

        const { username, email, password } = req.body;

        // check if Admin account already Exist
        const existingUser = await Admin.findOne({ email });
        if(existingUser) res.status(403).json({status:false, message:'Admin Already Exist'});

        const admin = await Admin.create({
          username,
            email,
            password,
            role:'Admin'
        });

        res.status(201).json({
            status:'SUCCESS',
            admin:{
                id:admin._id,
                username:admin.username,
                email:admin.email,
                role:admin.role
            },

            token:generateToken(admin)
        })
    }catch(error){
        res.status(400).json({message:error.message})
    }
};

export const loginAdmin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email }).select('+password');
        if(!admin) return res.status(403).json({ status: false, message: 'Account not registered'});

        const isMatch = await bcrypt.compare(password, admin.password);

        if(!isMatch) return res.status(403).json({ status:false, message: 'Password Mismatch'});

        const token = jwt.sign(
            {id:admin._id,email:admin.email,role:admin.role},
            process.env.JWT_SECRET,
            {expiresIn:'10d'}
        );

        res.status(200).json({
            status:'Logged in Successfully',
            admin:{
                id:admin._id,
                email:admin.email,
                role:admin.role,
                token
            }
        })
    } catch(error) {
        res.status(400).json({ status: false, message: error.message})
    }
};

export const getAllUser = async (req, res) => {
  try {
    if (req.user.role !== 'Admin') return res.status(400).json({message:'Please Login as an admin'});

    const { page, limit, search } = req.query;
    const query = {};

    if(search) {
      query.$or = [
        {name: {$regex: search, $options:'i'}},
        {email: {$regex: search, $options:'i'}}
      ]
    };

    const result = await paginate(User, query, {page, limit});

    return res.status(200).json({
      status: true,
      users:result.data.length,
      result
    })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    //Validate ID before using it
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ success: true, message: "User deleted successfully" });
    console.log(`Candidate with ID ${id} deleted.`);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};