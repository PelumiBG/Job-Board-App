import { applyJob, updateApplicationStatus } from "../controllers/applicationController.js";
import express from 'express';
import { protectUser } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../controllers/authController.js";

const router = express.Router();

// candidate apply for job
router.post('/apply',protectUser, roleMiddleware, applyJob);

// it allows candidate to update application
router.put('/update/:job', protectUser, roleMiddleware, updateApplicationStatus);

export default router;