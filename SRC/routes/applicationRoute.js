import { applicationStatus, applyJob, getAllApplication, updateApplicationStatus } from "../controllers/applicationController.js";
import express from 'express';
import { candidateOnly, employerOnly, protectUser } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

// candidate apply for job
router.post('/apply',protectUser, candidateOnly,upload.single("resume"), applyJob);

//
router.get('/check-status/:id', protectUser, candidateOnly, applicationStatus)

// employers get all aplication
router.get('/candidate', protectUser, employerOnly, getAllApplication)

// it allows employers to update application
router.put('/update/:id', protectUser, employerOnly, updateApplicationStatus);

export default router;