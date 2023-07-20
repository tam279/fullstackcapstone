import React, { FC } from 'react';
import Footer from '../../components/Footer/Footer';
import './ContactPage.css';
import Navigation from '../../components/Navigation/Navigation';
import { Container, Row, Col } from 'react-bootstrap';
import ContactForm from './ContactForm';

const ContactPage: FC = () => {
    return (
        <div className="contact-page">
            <Navigation />
            <Container className="contact-container">
                <Row>
                    <Col md={6} className="contact-details">
                        <h1>Contact Information:</h1>
                        <div className="contact-item">
                            <h3>Address:</h3>
                            <p>88 1 Ave SW, Calgary, Alberta</p>
                        </div>
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
                    <Col md={6}>
                        <ContactForm />
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    );
}

export default ContactPage;
