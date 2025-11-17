import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendWelcomeEmailCandidate = async (email,name) => {
    try {
        await transporter.sendMail({
            from: `"SEEKER" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Job Board Platform',
            html:`
            <h1 style="color:black"> Welcome ${name}!</h1>
            <p>Your Account has been created successfully, enjoy seemless service...</p>
            <P>You can now search for job of your skill and apply through our website</p>
            <a href="seekercom">seeker.com</a>
            `,
        })
    } catch(error){
        throw new Error(`Email Can\'t be sent: ${error.message}`)
    }
};

export const sendWelcomeEmailEmployer = async (email,name) => {
    try {
        await transporter.sendMail({
            from: `"SEEKER" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Job Board Platform',
            html:`
            <h1 style="color:black"> Welcome ${name}!</h1>
            Your Account has been created successfully, enjoy seemless service...
            <P>You can Post as many Job as you can</p>
            <a href="seekercom">seeker.com</a>
            `,
        })
    } catch(error){
        throw new Error(`Email Can\'t be sent: ${error.message}`)
    }
};