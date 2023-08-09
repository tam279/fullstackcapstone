/* The code is defining a React functional component called `ContactPage`. It imports necessary modules
and components such as `React`, `Footer`, `Navigation`, `Container`, `Row`, `Col`, and
`ContactForm`. */
// Import necessary modules and components
import React, { FC } from "react";
import Footer from "../../components/Footer/Footer";
import "./ContactPage.css";
import Navigation from "../../components/Navigation/Navigation";
import { Container, Row, Col } from "react-bootstrap";
import ContactForm from "./ContactForm";

// Define the ContactPage component
const ContactPage: FC = () => {
  return (
    // Main container for the contact page
    <div className="contact-page">
      {/* Top navigation bar */}
      <Navigation />
      {/* Bootstrap container for responsiveness and padding */}
      <Container className="contact-container">
        {/* Bootstrap row for aligning items horizontally */}
        <Row>
          {/* Contact information column */}
          <Col md={6} className="contact-details">
            {/* Title for the contact details section */}
            <div className="contact-title">Information</div>
            <div className="contact-item">
              <h3>Address:</h3>
              <p>88 1 Ave SW, Calgary, Alberta</p>
            </div>
            {/* Individual contact information items */}
            <div className="contact-item">
              <h3>Phone number:</h3>
              <p>403-888-8888</p>
            </div>
            <div className="contact-item">
              <h3>Email:</h3>
              <p>simonzinati1@hotmail.com</p>
            </div>
            <div className="contact-item">
              <h3>LinkedIn:</h3>
              <p>linkedin.com/in/simonzinati</p>
            </div>
          </Col>
          {/* Contact form column */}
          <Col md={6}>
            <ContactForm />
          </Col>
        </Row>
      </Container>
      {/* Footer component */}
      <Footer />
    </div>
  );
};

export default ContactPage;
