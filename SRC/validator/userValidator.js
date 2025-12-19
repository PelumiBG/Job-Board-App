import { body } from "express-validator";

// validate user information input
export const userValidator = [
    body('name').notEmpty().withMessage('Name must not be empty'),
    body('username').notEmpty().withMessage('Provide a username'),
    body('email').notEmpty().isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is Required'),
    body('phone').notEmpty().isNumeric().withMessage('Phone Number Required'),
    body('role').notEmpty().withMessage('Specify your Role').default('admin'),
];