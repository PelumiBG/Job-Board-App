import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const sendWelcomeEmailCandidate = async (email, name) => {
  try {

    const templatePath = path.join(__dirname, '../view/email/candidateEmail.ejs');

    const html = await ejs.renderFile(templatePath, {name});

    await transporter.sendMail({
      from: `"SEEKER" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Job Board Platform!",
      html,
    });

    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error(`Email can't be sent: ${error.message}`);
  }
};

// Welcome email for employers
export const sendWelcomeEmailEmployer = async (email, name) => {
  try {
    const templatePath = path.join(__dirname, '../view/email/employerEmail.ejs');

    const html = await ejs.renderFile(templatePath, {name});

    await transporter.sendMail({
      from: `"SEEKER" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Job Board Platform",
      html,
    });

    console.log(`Employer welcome email sent to ${email}`);
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error(`Email can't be sent: ${error.message}`);
  }
};
