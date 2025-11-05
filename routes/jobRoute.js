import { createJob,deleteJob,updateJob } from '../controllers/jobController.js';
import { employerOnly } from '../middlewares/authMiddleeware.js';
import express from 'express';

const router = express.Router();

// employers list job
router.post('/post', employerOnly, createJob);

// employers upadte job
router.put('/job/:id', employerOnly, updateJob);

// employers delete job
router.delete('/delete/:id', employerOnly, deleteJob)

export default router;