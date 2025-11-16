import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendWelcomeEmail = async (email,name) => {
    try {
        await transporter.sendMail({
            from: `"SEEKER" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Welcome To Job Portal App',
            html:`
            <h1> Welcome ${name}!</h1>
            Your Account has been created successfully, enjoy seemless service...
            `,
        })
    } catch(error){
        throw new Error(`Email Can\'t be sent: ${error.message}`)
    }
};