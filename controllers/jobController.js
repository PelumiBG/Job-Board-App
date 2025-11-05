import User from '../models/user.js';
import { validationResult } from 'express-validator';
import Job from '../models/job.js';
import jwt from 'jsonwebtoken';

// Employers Register Route
export const registerEmployer = async (req, res) => {
    try{
        const { employerName, email, phone, password } = req.body;

        // check if Employers account already Exist
        const existingUser = await User.findOne({ email });
        if(existingUser) res.status(403).json({status:false, message:'Employer Already Exist'});

        const hashPassword = await bcrypt.hash(password, 10)

        const employer = new User({
            employerName,
            email,
            phone,
            password:hashPassword
        });

        await employer.save();

        res.status(201).json({
            status:'SUCCESS',
            employer:{
                id:employer._id,
                employerName:employer.employerName,
                email:employer.email,
                phone:employer.phone
            }
        })
    }catch(error){
        res.status(400).json({message:error.message})
    }
};

// Employers Login Route
export const loginEmployer = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({message:errors.array()});

        const { email, password } = req.body;
        const employer = User.findOne({ email });
        if(!existingUser) return res.status(403).json({status:true,message:'Account Not Registered'});

        const isMatch = await bcrypt.compare(password, employer.password);
        if(!isMatch) return res.status(403).json({message:'Incorrect Password'});

        const token = jwt.sign(
            {id:employer._id, email:employer.email},
            process.env.JWT_SECRET,
            { expiresIn: '10' }
        );

        res.status(200).json({
            status:'Login Successful',
            token,
            employer:{
                id: employer._id,
                name: employer.name,
                email: employer.email
            }
        })
    }catch(error){
        res.status(403).json({status:false, message: error.message})
    }
};

// Employers can create and list Job
export const createJob = async (req, res, next) => {
    try{
      if(req.user.account_type !== "employer") {
        res.status(403).json({ message: 'Only Employers allowed to Post Job'})
      }
        const { companyName, location, description, salary, jobTitle, time, skills, employmentType } = req.body;
        
        const job = await Job.create({
            companyName,
            employmentType,
            skills,
            jobTitle,
            location,
            description,
            salary,
            time:Date
        });

        await job.save();
        
        res.status(200).json({message:'Job Created Successfully', job});
    } catch(err) {
        next()
    }
};

export const updateJob = async (req, res, next) => {
  try {
    const updateJob = await Job.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!updateJob) return res.status(404).json({ message: "Job listing not found" });

    res.json({ message: "Job has been updated", updateJob });
  } catch (err) {
    next(err);
  }
};

 
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job listing not found" });

    // only employer can delete their job
    if(!job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not Allowed to Delete this Job'})
    }

    await job.deleteOne();
    res.json({ message: "Job deleted successfully", deleteJob:job });
  } catch (err) {
    next(err);
  }
};