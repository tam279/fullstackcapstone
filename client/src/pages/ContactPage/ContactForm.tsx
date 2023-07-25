import React, { useState } from "react";
import axios from "axios";
import config from "../../config";

const ContactForm = () => {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [messageSent, setMessageSent] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Send form data to the backend using Axios
    axios
      .post(`${config.backend}/contact`, formData)
      .then((response) => {
        // console.log(response.data);
        // Handle success response (if needed)

        // Clear the form and show "Message Sent" confirmation
        setFormData(initialFormData);
        setMessageSent(true);
      })
      .catch((error) => {
        console.error(error);
        // Handle error response (if needed)
      });
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>Contact Form:</h2>
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

export default ContactForm;