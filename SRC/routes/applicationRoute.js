import { applyJob, getAllApplication, updateApplicationStatus } from "../controllers/applicationController.js";
import express from 'express';
import { candidateOnly, employerOnly, protectUser } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// candidate apply for job
router.post('/apply',protectUser, candidateOnly,upload.single("resume"), applyJob);

// employers get all aplication
router.get('/candidate', protectUser, employerOnly, getAllApplication)

// it allows candidate to update application
router.put('/update/:id', protectUser, employerOnly, updateApplicationStatus);

export default router;