import React, { FC, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

interface NewCompanyModalProps {
  show: boolean;
  onHide: () => void;
}

const NewCompanyModal: FC<NewCompanyModalProps & { onSuccess: () => void; }> = ({ show, onHide, onSuccess }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/createCompany', { companyName: name });
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
