import Job from '../models/job.js';

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
    if (!job.employer.toString() !== req.user._id.toString()) {
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
    if(!job.employer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not Allowed to Delete this Job'})
    }

    await job.deleteOne();
    res.json({ message: "Job deleted successfully", deleteJob:job });
  } catch (err) {
    return res.status(403).json({status:false,message:err.message});
  }
};