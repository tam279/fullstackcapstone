import React, { FC } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "./Navigation.css";

/**
 * The `Navigation` component is a functional component that renders a navigation bar with links to
 * different pages and a login button.
 * @returns The Navigation component is returning a JSX element that represents a navigation bar. The
 * navigation bar consists of a Bootstrap Navbar component with a light background color. Inside the
 * Navbar, there is a Container component that contains the logo and navigation links. The logo is
 * wrapped in a LinkContainer component, which is a wrapper for React Router's Link component. The logo
 * is an image with the id "logo" and a
 */
const Navigation: FC = () => {
  return (
    <Navbar className="navbar-light bg-light" expand="lg">
      <Container>
        <Navbar.Brand>
          <LinkContainer to="/">
            <img
              id="logo"
              className="logo-custom align-self-center"
              src="/vitraicon.png"
              alt="Logo"
            />
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
};

export default Navigation;
