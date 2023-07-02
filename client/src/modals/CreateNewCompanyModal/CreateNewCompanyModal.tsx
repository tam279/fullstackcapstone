import React, { FC } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface NewCompanyModalProps {
  show: boolean;
  onHide: () => void;
}

const NewCompanyModal: FC<NewCompanyModalProps> = ({show, onHide}) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Details</h2>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Google" />
          </Form.Group>

          <Form.Group controlId="formPhoto">
            <Form.Label>Photo</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary">
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewCompanyModal;
