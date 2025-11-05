import { applyJob, updateApplicationStatus } from "../controllers/applicationController";
import express from 'express';

const router = express.Router();

// candidate apply for job
router.post('/apply', applyJob);

// it allows candidate to update application
router.put('/update/:job', updateApplicationStatus);

export default router;