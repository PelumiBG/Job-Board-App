import Candidate from '../models/candidate.js';
import { validationResult } from 'express-validator';
import Employer from '../models/admin.js';
import jwt from 'jsonwebtoken';

export const registerEmployer = async (req, res) => {
    try{
        const { employerName, email, phone, password } = req.body;
        const existingEmployer = await Employer.findOne({ email });
        if(existingEmployer) res.status(403).json({status:false, message:'Employer Already Exist'});

        const hashPassword = await bcrypt.hash(password, 10)

        const employer = new Employer({
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


export const loginEmployer = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()) return res.status(400).json({message:errors.array()});

        const { email, password } = req.body;
        const employer = Employer.findOne({ email });
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

export const createJob = async (req, res, next) => {
    try{
        const { companyName, location, description, salary, jobTitle, time, skills, employmentType } = req.body;
        
        const job = await Employer.create({
            companyName,
            employmentType,
            skills,
            jobTitle,
            location,
            description,
            salary,
            time
        });

        await job.save();
        
        res.status(200).json({message:'Job Created Successfully', job});
    } catch(err) {
        next()
    }
};

export const updateJob = async (req, res, next) => {
  try {
    const updateJob = await Employer.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!updateJob) return res.status(404).json({ message: "Job listing not found" });

    res.json({ message: "Job has been updated", updateJob });
  } catch (err) {
    next(err);
  }
};

 
export const deleteJob = async (req, res, next) => {
  try {
    const job = await Employer.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job listing not found" });

    res.json({ message: "Job deleted successfully", deleteJob:job });
  } catch (err) {
    next(err);
  }
};

export const getAllcandidate = async (req, res) => {
  try {
    const users = await Candidate.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    //Validate ID before using it
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid User ID" });
    }

    const user = await Candidate.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    await user.deleteOne();
    res.status(200).json({ success: true, message: "User deleted successfully" });
    console.log(`User with ID ${id} deleted.`);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};