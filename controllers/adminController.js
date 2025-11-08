import Admin from '../models/admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateToken } from '../utils/generateToken.js';


export const registerAdmin = async (req, res) => {
    try{

      // if (!req.user || req.user.role !== "Admin") {
      //       return res.status(403).json({ message: "You can't access this page" });
      //   }

        const { username, email, password } = req.body;

        // check if Admin account already Exist
        const existingUser = await Admin.findOne({ email });
        if(existingUser) res.status(403).json({status:false, message:'Admin Already Exist'});

        const hashPassword = await bcrypt.hash(password, 10)

        const admin = await Admin.create({
          username,
            email,
            password:hashPassword,
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
        const admin = Admin.findOne({ email });
        if(!admin) return res.status(403).json({ status: false, message: 'Account not registered'});

        const isMatch = await bcrypt.compare(password, admin.password);

        if(!isMatch) return res.status(403).json({ status:false, message: 'Incorrect Password'});

        const token = jwt.sign(
            {id:admin._id,email:admin.email,role:admin.role},
            process.env.JWT_SECRET,
            {expiresIn:'10d'}
        );

        res.status(200).json({
            status:'Logged in Successfully',
            user:{
                id:admin._id,
                email:admin.email,
                password,
                token
            }
        })
    } catch(error) {
        res.status(400).json({ status: false, message: error.message})
    }
};

export const getAllcandidate = async (req, res) => {
  try {
    const users = await User.find().select("-password");
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