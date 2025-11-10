import { deleteCandidate, getAllCandidate, loginAdmin, registerAdmin } from '../controllers/adminController.js';
import { adminOnly, protectAdmin } from '../middlewares/authMiddleware.js';
import { adminValidator } from '../middlewares/validationMiddleware.js';
import express from 'express';

const router = express.Router();

// admin registter
router.post('/register',adminValidator, registerAdmin);

// admin login route
router.post('/login', adminValidator, loginAdmin);

// Only admin can get all candidate applied for job
router.get('/:id/users', protectAdmin, adminOnly, getAllCandidate);

// Only admin can delete job listing
router.delete('/users/:id', protectAdmin, adminOnly, deleteCandidate)

export default router;