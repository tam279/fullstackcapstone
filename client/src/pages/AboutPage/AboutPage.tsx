/**
 * The above code is a TypeScript React component that renders the content for an about page, including
 * a navigation component, a title, two columns with information about Vitra IT Services, and a footer.
 * @returns The AboutPage component is returning a JSX element. It consists of a parent div with the
 * className "about-page" that contains the following components and elements:
 */
// Required modules and components
import React from "react";
import "./AboutPage.css";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Footer/Footer";
import { Container, Row, Col } from "react-bootstrap";

/**
 * The AboutPage component is a React component that renders the content for an about page, including a
 * navigation component, a title, two columns with information about Vitra IT Services, and a footer.
 * @returns The AboutPage component is returning a JSX element. It consists of a parent div with the
 * className "about-page" that contains the following components and elements:
 */
// AboutPage component definition
const AboutPage = () => {
  return (
    // Parent container for the about page
    <div className="about-page">
      {/* Top navigation component */}
      <Navigation />
      {/* Main content container */}
      <Container>
        {/* Row to display the title of the page */}
        <Row>
          <Col>
            <h1 className="about-title">About Us</h1>
          </Col>
        </Row>
        {/* Two columns layout for different sections */}
        <Row>
          {/* First column - Introduction to Vitra IT Services */}
          <Col md={6}>
            <div className="it-services">
              <h2 className="it-services-title">
                Introduction to Vitra IT Services
              </h2>
              <div className="it-services-description">
                <p>
                  With 12 years of experience in Information Technology and the
                  ability to resell IT hardware or software as needed, Vitra IT
                  Services provides a range of consulting services, including:
                </p>
                <ul className="it-services-list">
                  <li>Managed IT Solutions for Servers and Workstations</li>
                  <li>Secure Remote Access Services SSL VPN</li>
                  <li>Scheduled Proactive Maintenance</li>
                </ul>
              </div>
            </div>
          </Col>
          {/* Second column - 8 Facts About Vitra IT Services */}
          <Col md={6}>
            <div className="about-facts">
              <h2 className="about-facts-title">8 Facts About Us</h2>
              <ol type="1" className="about-facts-list">
                <li>
                  Vitra Service is a comprehensive IT solutions provider with
                  over 12 years of industry experience.
                </li>
                <li>
                  Specialization in providing tailored IT hardware and software
                  solutions according to business needs.
                </li>
                <li>
                  Their service suite encompasses Managed IT Solutions, Secure
                  Remote Access Services, Proactive Maintenance, Active
                  Directory & Exchange Management, and Disaster Recovery
                  Planning.
                </li>
                <li>Proficiency in AWS and AZURE Configuration and Support.</li>
                <li>
                  Vitra Service also offers Information Management, Enterprise
                  Content Management, Cloud Management, and Business Analytics
                  services.
                </li>
                <li>
                  Expertise includes Project Management, Negotiation, Backup &
                  Recovery Systems, Data Reporting, and 24/7 Technical Support.
                </li>
                <li>
                  Their goal is to simplify technology for businesses, ensuring
                  operational excellence and growth.
                </li>
                <li>
                  Vitra Service is characterized by the meeting point of
                  technology and innovation.
                </li>
              </ol>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
// Export the AboutPage component for use in other parts of the application
export default AboutPage;
