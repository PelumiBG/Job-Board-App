import User from '../models/user.js';
import { validationResult } from 'express-validator';
import Job from '../models/job.js';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

// Employers Register Route
export const registerEmployer = async (req, res) => {
    try{
        const { name , username, employerName, email, phone, password } = req.body;

        // check if Employers account already Exist
        const existingUser = await User.findOne({ email });
        if(existingUser) res.status(403).json({status:false, message:'Employer Already Exist'});

        const hashPassword = await bcrypt.hash(password, 10)

        const employer = new User({
          name,
          username,
            employerName,
            email,
            phone,
            password:hashPassword,
            role:'Employer'
        });

        await employer.save();

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

        const employer = await User.findOne({ email }).select('+password');
        if (!employer) {
            return res.status(403).json({ status: false, message: "Account Not Registered" });
        };

        const isMatch = await bcrypt.compare(password, employer.password);
        if (isMatch) {
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


// Employers can create and list Job
export const createJob = async (req, res, next) => {
    try{
        const { companyName, location, description, salary, jobTitle, time, skills, employmentType } = req.body;
        
        // Create job
        const job = await Job.create({
          employer: req.user._id,
            companyName,
            employmentType,
            skills,
            jobTitle,
            location,
            description,
            salary,
            time:Date
        });
        
        res.status(200).json({message:'Job Created Successfully', job});
    } catch(err) {
      return res.status(403).json({message:err.message})
    }
};

// Employers can update Job 
export const updateJob = async (req, res, next) => {
  try {
    // Role Check
    if (req.user.role !== "Employer") {
      return res.status(403).json({ message: "Only employers can update jobs" });
    }

    // Find job
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job listing not found" });
    }

    // Check if it is Employer
    if (job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You are not authorized to update this job" });
    }

    // Employer Update job
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({
      message: "Job has been updated successfully",
      job: updatedJob
    });

  } catch (err) {
    return res.status(403).json({status:false,message:err.message})
  }
};

 
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job listing not found" });

    // only employer can delete their job
    if(!job.employer.toString() === req.user._id.toString()) {
      return res.status(403).json({ message: 'Not Allowed to Delete this Job'})
    }

    await job.deleteOne();
    res.json({ message: "Job deleted successfully", deleteJob:job });
  } catch (err) {
    return res.status(403).json({status:false,message:err.message});
  }
};