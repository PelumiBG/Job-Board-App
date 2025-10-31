import { createJob,deleteJob,updateJob } from '../controllers/jobController.js';
import { protect,adminOnly } from '../middlewares/authMiddleeware.js';
import { employerValidator, userValidator } from '../middlewares/validationMiddleware.js';
import express from 'express';

const router = express.Router();

router.post('/post', protect, createJob);
router.post('/login', )