import mongoose from 'mongoose';

export const jobSchema = new mongoose.Schema({
    companyName:{ type:String, required:true, trim:true },
    location:{ type:String, required:true, trim:true },
    salary:{ type:Number, required:true, length:[{min:Number, max:Number}]},
    jobTitle:{ type:String, required:true, trim:true },
    description:{ type:String, required:true },
    time:{ time:Date, default:Date.now },
    employmentType:{ type:String, enum:['Full-Time','Contract','Part-Time'], default:'Full-Time'},
    skills:{ type:String, required:true, trim:true },
    role:{ type:String, required:true, enum:['candidate','Employer'], default:'Employer'}
});

const Job = mongoose.model('Job', jobSchema);
export default Job;