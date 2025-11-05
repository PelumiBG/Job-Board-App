import { body } from "express-validator";

export const userValidator = [
    body('account_type').isIn().withMessage('Specify your Role').default('admin'),
    body('name').notEmpty().withMessage('Name must not be empty'),
    body('username').notEmpty().withMessage('Provide a username'),
    body('email').notEmpty().isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is Required'),
    body('phone').notEmpty().isNumeric().withMessage('Phone Number Required')
];

export const adminValidator = [
    body('email').isEmpty().withMessage('Email Address Needed'),
    body('password').isEmpty().withMessage('Provide a Name'),
    body('role').isEmpty().withMessage('Select account type')
]