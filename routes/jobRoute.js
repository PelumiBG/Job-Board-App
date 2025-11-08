import { createJob , deleteJob ,loginEmployer,registerEmployer,updateJob } from '../controllers/jobController.js';
import { employerOnly, protectUser } from '../middlewares/authMiddleware.js';
import express from 'express';

const router = express.Router();

//registration for employers
router.post("/register", registerEmployer);

// login route for employers
router.post("/login", loginEmployer);

// employers list job
router.post('/post',protectUser, employerOnly, createJob);

// employers upadte job
router.put('/job/:id', employerOnly, updateJob);

// employers delete job
router.delete('/delete/:id', employerOnly, deleteJob)

export default router;