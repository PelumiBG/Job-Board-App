import Application from '../models/application.js';
import Job from '../models/job.js';

// Candidate can apply for job
export const applyJob = async (req, res) => {
  try{
    if(req.user.role !== 'Candidate') return res.status(400).json({ status:false, message:'Only Candidate allowed to apply'})
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    
    if(!job) return res.status(404).json({status:false,
      message:"Job Not Found"
    })

    const appliedJob = await Application.findOne({job:jobId,candidate:req.user._id});

    if(appliedJob) return res.status(400).json({status: false, message:'Already Applied for Job'});

    if(!req.file) return res.status(404).json({status:false,message:'Upload A Resume'});

    const application = await Application.create({
      job: jobId,
      candidate:req.user._id,
      resume:req.file.path
    });

    res.status(201).json({status:true, message:'Application Submitted', application})
  } catch(error){
    res.status(500).json({message :error.message});
  }
};

// Employers can update application status.
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Check role
    if (req.user.role !== "Employer") {
      return res.status(403).json({ message: "Only employers can update application status" });
    }

    // Find application
    const application = await Application.findById(id).populate("job");

    if (!application) {
      return res.status(404).json({ message: "Application Not Found" });
    }

    // Check if this employer owns the job
    if (application.job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not Authorized to Update this Application" });
    }

    // Update status
    application.status = status;
    await application.save();

    res.status(200).json({
      message: "Application Status Updated",
      application,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};