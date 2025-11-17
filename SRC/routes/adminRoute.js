import { deleteUser, getAllUser, loginAdmin, registerAdmin } from '../controllers/adminController.js';
import { adminOnly, protectAdmin } from '../middlewares/authMiddleware.js';
import { adminValidator } from '../middlewares/validationMiddleware.js';
import express from 'express';
import { updatePassword } from '../services/userService.js';

const router = express.Router();

// admin registter
router.post('/register',adminValidator, registerAdmin);

// admin login route
router.post('/login', adminValidator, loginAdmin);

// reset password route for admin
router.post('/reset-password',protectAdmin, adminOnly, updatePassword)

// Only admin can get all candidate applied for job
router.get('/users', protectAdmin, adminOnly, getAllUser);

// Only admin can delete job listing
router.delete('/users/:id', protectAdmin, adminOnly, deleteUser)

export default router;