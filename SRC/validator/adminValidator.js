import { body } from "express-validator";

// validate admin information input
export const adminValidator = [
    body('email').isEmpty().withMessage('Email Address Needed'),
    body('password').isEmpty().withMessage('Provide a Name'),
    body('role').isEmpty().withMessage('Select account type')
]