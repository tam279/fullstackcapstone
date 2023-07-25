// Import required modules
require('dotenv').config();
const nodemailer = require("nodemailer");

// Function to send a contact form email
async function sendContactEmail(formData, recipientEmail) {
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

    // Construct email message using the form data
    const mailOptions = {
      from: process.env.EMAIL,
      to: recipientEmail, // Recipient's email address passed as a parameter
      subject: "Contact Form Submission",
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    // console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendContactEmail };