/**
 * This is a TypeScript React component that renders a contact form and sends the form data to a
 * backend server using Axios.
 * @returns The ContactForm component is being returned. It is a form that allows users to enter their
 * name, email, phone number, and message. When the form is submitted, the data is sent to the backend
 * using Axios. If the submission is successful, the form is cleared and a "Message Sent" confirmation
 * is displayed.
 */
// Import required modules and components
import React, { useState } from "react";
import axios from "axios";
import config from "../../config";

// ContactForm component definition
const ContactForm = () => {
  // Initial form data state
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  // State for form data and whether the message has been sent
  const [formData, setFormData] = useState(initialFormData);
  const [messageSent, setMessageSent] = useState(false);

  // Handle changes in form input fields
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    // Update the formData state based on input field changes
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Send form data to the backend using Axios
    axios
      .post(`${config.backend}/contact`, formData)
      .then((response) => {
        // Handle success response here (if needed)

        // Clear the form and show "Message Sent" confirmation
        setFormData(initialFormData);
        setMessageSent(true);
      })
      .catch((error) => {
        console.error(error);
        // Handle error response (if needed)
      });
  };

  // Render the contact form
  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-title">Message</div>
      <input
        type="text"
        name="name"
        placeholder="Name"
        required
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone number"
        required
        value={formData.phone}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="Message"
        required
        value={formData.message}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Submit</button>

      {messageSent && <p>Message Sent!</p>}
    </form>
  );
};

// Export the ContactForm component for use in other parts of the application
export default ContactForm;
