import { registerUser, loginUser, updatePassword } from '../services/userService.js';
import { userValidator } from '../middlewares/validationMiddleware.js';
import express from 'express';
import { candidateOnly, protectUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

// candidate register
router.post('/register', userValidator, registerUser);

// candiadate login route
router.post('/login', userValidator, loginUser);

// candidate reset password if forgotten
router.put('/reset-password',protectUser, candidateOnly, updatePassword)

export default router;