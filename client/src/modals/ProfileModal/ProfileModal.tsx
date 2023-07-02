import React, { FC } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

interface ProfileModalProps {
  show: boolean;
  onHide: () => void;
}

const ProfileModal: FC<ProfileModalProps> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" defaultValue="john.doe@mail.com" readOnly />
          </Form.Group>

          <Form.Group>
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" defaultValue="John Doe" readOnly />
          </Form.Group>

          <Form.Group>
            <Form.Label>Company</Form.Label>
            <Form.Control type="text" defaultValue="Vitra Service" readOnly />
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
