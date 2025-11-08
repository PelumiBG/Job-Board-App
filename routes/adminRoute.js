import { deleteCandidate, getAllcandidate, loginAdmin, registerAdmin } from '../controllers/adminController.js';
import { adminOnly, protectAdmin } from '../middlewares/authMiddleware.js';
import { adminValidator } from '../middlewares/validationMiddleware.js';
import express from 'express';

const router = express.Router();

// admin registter
router.post('/register',registerAdmin);

// admin login route
router.post('/login', adminValidator, loginAdmin);

// admin can get all candidate applied for job
router.get('/users', protectAdmin, adminOnly, getAllcandidate);

// admin can delete job listing
router.delete('/users/:id', protectAdmin, adminOnly, deleteCandidate)

export default router;