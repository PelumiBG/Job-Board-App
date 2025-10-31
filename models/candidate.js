import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema(
    {
        name:{ type:String, required:true, trim:true},
        username:{ type:String, required:true, unique:true, trim:true },
        email:{ type:String, required:true, unique:true, lowercase:true, trim:true },
        password:{ type:String, required:true, number:true, unique:true, minlength:8},
        phone:{ type:String, required:true, number:true },
        role:{ type:String, required:true, enum:['candidate','Employer'], default:'candidate'},
        createdAt:{ type:Date, default:Date.now }
    },
    {timestamps:true}
);

const Candidate = mongoose.model("User", candidateSchema);

export default Candidate;