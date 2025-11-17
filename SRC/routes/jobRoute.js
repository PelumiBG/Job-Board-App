import { createJob , deleteJob, updateJob } from '../controllers/jobController.js';
import { employerOnly, protectUser } from '../middlewares/authMiddleware.js';
import { registerEmployer, loginEmployer } from '../services/employerService.js';
import express from 'express';
import { updatePassword } from '../services/userService.js';

const router = express.Router();

//registration for employers
router.post("/register", registerEmployer);

// login route for employers
router.post("/login", loginEmployer);

// reset password route for employer
router.put('/reset-password',protectUser, employerOnly, updatePassword)

// employers list job
router.post('/post',protectUser, employerOnly, createJob);

// employers upadte job
router.put('/job/:id', protectUser, employerOnly, updateJob);

// employers delete job
router.delete('/delete/:id', protectUser, employerOnly, deleteJob)

export default router;