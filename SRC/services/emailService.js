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

export const sendWelcomeEmailCandidate = async (email, name) => {
  try {
    const userUrl = process.env.CLIENT_URL ?? "https://seeker.com";

    await transporter.sendMail({
      from: `"SEEKER" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Job Board Platform!",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background-color: #f9f9f9; }
        .button { display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Job Seeker!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name}!</h2>
            <p>Your account has been created successfully. We're excited to have you on board!</p>
            <p>You can now:</p>
            <ul>
              <li>Browse thousands of job listings</li>
              <li>Apply to jobs that match your skills</li>
            </ul>
            <a href="${userUrl}" class="button">Start Browsing Jobs</a>
          </div>
          <div class="footer">
            <p>If you didn't create this account, please ignore this email.</p>
          </div>
        </div>
      </body>
      </html>
      `,
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
    const userUrl = process.env.CLIENT_URL ?? "https://seeker.com";

    await transporter.sendMail({
      from: `"SEEKER" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Job Board Platform",
      html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2196F3;">Welcome ${name}!</h1>
          <p>Your employer account has been created successfully.</p>
          <p>You can now:</p>
          <ul>
            <li>Post job openings</li>
            <li>Review applications</li>
            <li>Manage your job listings</li>
          </ul>
          <a href="${userUrl}/employer/dashboard"
             style="display: inline-block; padding: 10px 20px; background-color: #2196F3; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0;">
             Go to Dashboard
          </a>
        </div>
      </body>
      </html>
      `,
    });

    console.log(`Employer welcome email sent to ${email}`);
  } catch (error) {
    console.error("Email send error:", error);
    throw new Error(`Email can't be sent: ${error.message}`);
  }
};
