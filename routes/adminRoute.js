import { deleteCandidate, getAllcandidate, loginAdmin, registerAdmin } from '../controllers/adminController.js';
import { protectAdmin } from '../middlewares/authMiddleware.js';
import { adminValidator } from '../middlewares/validationMiddleware.js';
import express from 'express';

const router = express.Router();

// admin registter
router.post('/register',adminValidator,registerAdmin);

// admin login route
router.post('/login', adminValidator, loginAdmin);

// admin can get all candidate applied for job
router.get('/users', protectAdmin, getAllcandidate);

// admin can delete job listing
router.delete('/users/:id', protectAdmin, deleteCandidate)

export default router;