/**
 * The above code is a TypeScript React component that renders a modal for displaying user profile
 * information.
 * @param  - - `show`: A boolean value indicating whether the modal should be shown or hidden.
 * @returns The ProfileModal component is being returned.
 */
// Import React, components from "react-bootstrap", the User interface, and the jwt-decode library.
import React, { FC } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { User } from "../../problemdomain/Interface/Interface";
import jwt_decode from "jwt-decode";

// Define the prop types for the ProfileModal component.
interface ProfileModalProps {
  show: boolean; // Boolean to indicate whether the modal should be shown or hidden.
  onHide: () => void; // Callback function to hide the modal.
  user: User | null; // User data (or null if not available).
}
const ProfileModal: FC<ProfileModalProps> = ({ show, onHide, user }) => {
  // Early return if the user data is not available.
  if (!user) {
    return null;
  }

  // Retrieve the JWT token from local storage.
  const token = localStorage.getItem("jwtToken");
  let userId = "";
  if (token) {
    const decodedToken: any = jwt_decode(token);
    userId = decodedToken.userId;
  }

  // Return JSX for the user profile modal.
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" defaultValue={user.email} readOnly />
          </Form.Group>

          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              defaultValue={`${user.firstName} ${user.lastName}`}
              readOnly
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              defaultValue={user.company.name}
              readOnly
            />
          </Form.Group>
        </Form>
        <Alert variant="info">
          Please contact admin to change your information.
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Export the ProfileModal component for use in other parts of the application.
export default ProfileModal;
