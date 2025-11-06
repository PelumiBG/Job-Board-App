import mongoose from 'mongoose';

export const jobSchema = new mongoose.Schema({
    employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    companyName:{ type:String, required:true, trim:true },
    location:{ type:String, required:true, trim:true },
    salary:{ type:Number, required:true, length:[{min:Number, max:Number}]},
    jobTitle:{ type:String, required:true, trim:true },
    description:{ type:String, required:true },
    employmentType:{ type:String, enum:['Full-Time','Contract','Part-Time'], default:'Full-Time'},
    skills:{ type:String, required:true, trim:true },
    createdAt:{ type:Date, default:Date.now }
},  { timestamp: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;