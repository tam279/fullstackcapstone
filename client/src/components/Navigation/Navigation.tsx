import React, { FC } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './Navigation.css';

const Navigation: FC = () => {
  return (
    <Navbar className="navbar-light bg-light" expand="lg">
      <Container>
        <Navbar.Brand>
          <LinkContainer to="/">
            <img id="logo" className="logo-custom align-self-center" src="/vitralogo.png" alt="Logo" />
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/services">
              <Nav.Link className="text-primary">Services</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact">
              <Nav.Link className="text-primary">Contact</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link className="text-primary">About</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            <LinkContainer to="/login">
              <Nav.Link className="text-primary">Log In</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
