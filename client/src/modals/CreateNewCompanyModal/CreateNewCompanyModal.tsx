import React, { FC, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import config from '../../config';

interface NewCompanyModalProps {
  show: boolean;
  onHide: () => void;
}

const NewCompanyModal: FC<NewCompanyModalProps & { onSuccess: () => void }> = ({ show, onHide, onSuccess }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post(`${config.backend}/api/createCompany`, { companyName: name, address, phoneNumber, website });
      onHide();
      onSuccess(); // After successful creation, call the onSuccess function
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Details</h2>
        <Form onSubmit={handleSubmit}>
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
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default NewCompanyModal;
