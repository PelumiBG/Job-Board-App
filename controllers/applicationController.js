import Application from '../models/application.js';
import Job from '../models/job.js';

// Candidate can apply for job
export const applyJob = async (req, res) => {
  try{
    if(req.user.account_type !== 'candidate') return res.status(400).json({ status:false, message:'Only Candidate allow to apply'})
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    
    if(!job) return res.status(404).json({status:false,
      message:"Application Not Found"
    })

    const appliedJob = await Application.findOne({job:jobId,candidate:req.user._id});

    if(appliedJob) return res.status(400).json({status: false, message:'Already Applied for Job'});

    const application = await Application({
      job: jobId,
      candidate:req.user._id
    });
    application.save();

    res.status(201).json({status:true, message:'Application Submitted Already'})
  } catch(error){
    res.status(500).json({message :error.message});
  }
};

// Employers can update application status.
export const updateApplicationStatus = async (req, res) => {
  try{
    const { id } = req.params;
    const { status } = req.body;

    const application = await Application.findOne(id).populate('job');

    if(!application) return res.status(404).json({message: 'Application Not Found'});

    if(application.job.employer.toString() !== req.employer.id) 
      return res.status(403).json({ message: 'Not Authorized to Update this Application'});

    application.status = status;
    await application.save();

    res.status(201).json({ message:'Application Status Updated', application})
  } catch(error){
    res.status(500).json({ message: error.message})
  }
};