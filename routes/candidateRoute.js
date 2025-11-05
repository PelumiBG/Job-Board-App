import { registerUser, loginUser  } from '../services/userService.js';
import { protectUser } from '../middlewares/authMiddleeware.js';
import { userValidator } from '../middlewares/validationMiddleware.js';
import express from 'express';
import { loginUser, registerUser } from '../services/userService.js';

const router = express.Router();

// candidate register
router.post('/register', protectUser, userValidator, registerUser);

// candiadate login route
router.post('/login', userValidator, loginUser);

export default router;