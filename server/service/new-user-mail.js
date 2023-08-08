// Import required modules
require("dotenv").config();
const nodemailer = require("nodemailer");

// Function to send a welcome email
async function sendWelcomeEmail(user) {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Set to true if using a secure connection (e.g., SSL/TLS)
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASS,
      },
    });

   // Get the allowed origins from the environment variable
   const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

   // Construct the login links based on the allowed origins
   const loginLinks = allowedOrigins.map((origin) => `- ${origin}/login`).join("\n");

   // Construct the email message
   const mailOptions = {
     from: process.env.EMAIL,
     to: user.email, // Use user.email as the recipient's email address
     subject: "Welcome to VITRA SERVICES",
     text: `Hello ${user.name},\n\nWelcome to VITRA SERVICES! Your temporary password is: ${user.password}\n\nPlease make sure to change your password after logging in.\n\nBest regards,\nThe Website Team\n\nLogin Links:\n\n${loginLinks}`,
   };


    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendWelcomeEmail };
