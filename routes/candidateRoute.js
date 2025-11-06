import { registerUser, loginUser } from '../services/userService.js';
import { protectUser } from '../middlewares/authMiddleware.js';
import { userValidator } from '../middlewares/validationMiddleware.js';
import { generateToken } from '../utils/generateToken.js';
import express from 'express';

const router = express.Router();

// candidate register
router.post('/register', userValidator, registerUser);

// candiadate login route
router.post('/login', userValidator, loginUser);

export default router;