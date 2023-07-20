require('dotenv').config();
const nodemailer = require("nodemailer");

async function sendEmail() {
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

    // Define email options
    const mailOptions = {
      from: "cproject275@gmail.com",
      to: "ianazriel.almodovar@edu.sait.ca",
      subject: "Test Email",
      text: "This is a test email sent from Nodemailer.",
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendEmail };