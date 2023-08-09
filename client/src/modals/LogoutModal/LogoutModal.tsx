/**
 * The above code is a TypeScript React component that renders a logout confirmation modal.
 */
import React, { FC } from "react";
import { Modal, Button } from "react-bootstrap";

// Define the prop types for the LogoutModal component.
interface LogoutModalProps {
  show: boolean; // Boolean to indicate whether the modal should be shown or hidden.
  onHide: () => void; // Callback function to hide the modal.
  logout: () => void; // Callback function to execute additional logout logic.
}

// Define the LogoutModal functional component.
const LogoutModal: FC<LogoutModalProps> = ({ show, onHide, logout }) => {
  // Handler for the logout action.
  const handleLogout = () => {
    // Call the logout function to perform the logout logic
    logout();

    // Remove the token from localStorage or any other secure storage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userRole");
  };

  // Return JSX for the logout confirmation modal.
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to logout?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          No
        </Button>
        <Button variant="primary" onClick={handleLogout}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Export the LogoutModal component for use in other parts of the application.
export default LogoutModal;
