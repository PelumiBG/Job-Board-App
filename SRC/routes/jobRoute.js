import { createJob , deleteJob, updateJob } from '../controllers/jobController.js';
import { employerOnly, protectUser } from '../middlewares/authMiddleware.js';
import { registerEmployer, loginEmployer } from '../services/employerService.js';
import express from 'express';

const router = express.Router();

//registration for employers
router.post("/register", registerEmployer);

// login route for employers
router.post("/login", loginEmployer);

// employers list job
router.post('/post',protectUser, employerOnly, createJob);

// employers upadte job
router.put('/job/:id', protectUser, employerOnly, updateJob);

// employers delete job
router.delete('/delete/:id', protectUser, employerOnly, deleteJob)

export default router;