import React, { FC } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { User } from "../../problemdomain/Interface/Interface";
import jwt_decode from "jwt-decode";


interface ProfileModalProps {
  show: boolean;
  onHide: () => void;
  user: User | null;
}
const ProfileModal: FC<ProfileModalProps> = ({ show, onHide, user }) => {
  if (!user) {
    return null;
  }

   const token = localStorage.getItem("jwtToken");
   let userId = "";
   if (token) {
     const decodedToken: any = jwt_decode(token);
     userId = decodedToken.userId;
   }

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

export default ProfileModal;
