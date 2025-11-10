import mongoose from 'mongoose';

export const applicationSchema = new mongoose.Schema(
    {
        job:{ type:mongoose.Schema.Types.ObjectId,ref:'Job',required:true },
        candidate:{ type:mongoose.Schema.Types.ObjectId,ref:'Candidate',required:true },
        resume:{type:String,required:true},
        appliedAt:{ type:Date, default:Date.now },
        status:{ type:String, enum:['APPLIED','PENDING','REVIEW','REJECTED','APPROVED'], default:'APPLIED'}
    }
);

const Application = mongoose.model('Application', applicationSchema);
export default Application;