import { createJob,deleteJob,updateJob } from '../controllers/jobController.js';
import { protect,employerOnly } from '../middlewares/authMiddleeware.js';
import { employerValidator, userValidator } from '../middlewares/validationMiddleware.js';
import express from 'express';

const router = express.Router();

router.post('/register', employerOnly, employerValidator, createJob);
router.post('/login', protect, );

export default router;