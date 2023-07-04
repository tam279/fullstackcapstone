import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

const EditCompanyModal = ({ onHide }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");

  return (
    <Modal onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="text" placeholder="Google" onChange={(e) => setName(e.target.value)} value={name} required />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="123 Main St" onChange={(e) => setAddress(e.target.value)} value={address} required />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="555-555-5555" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} required />
          </Form.Group>
          <Form.Group controlId="formWebsite">
            <Form.Label>Website</Form.Label>
            <Form.Control type="text" placeholder="https://www.example.com" onChange={(e) => setWebsite(e.target.value)} value={website} required />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={/*implement your save method here*/}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCompanyModal;
