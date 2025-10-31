import { registerCandidate, loginCandidate } from '../controllers/candidateController.js';
import { protect } from '../middlewares/authMiddleeware.js';
import { userValidator } from '../middlewares/validationMiddleware.js';
import express from 'express';

const router = express.Router();

router.post('/register', protect, userValidator, registerCandidate);
router.post('/login', userValidator, loginCandidate);

export default router;