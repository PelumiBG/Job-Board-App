import { body } from "express-validator";

export const userValidator = [
    body('role').isIn('candidate').withMessage('Specify your Role').default('admin'),
    body('name').notEmpty().withMessage('Name must not be empty'),
    body('username').notEmpty().withMessage('Provide a username'),
    body('email').notEmpty().isEmail().withMessage('Email is required'),
    body('password').notEmpty().withMessage('Password is Required'),
    body('phone').notEmpty().isNumeric().withMessage('Phone Number Required')
];

export const employerValidator = [
    body('role').isEmpty().withMessage('Specify Role'),
    body('employerName').isEmpty().withMessage('Provide a Name'),
    body('email').isEmpty().withMessage('Email Address Needed'),
    body('phone').isEmpty().withMessage('Provide a Name'),
    body('password').isEmpty().withMessage('Provide a Password')
]