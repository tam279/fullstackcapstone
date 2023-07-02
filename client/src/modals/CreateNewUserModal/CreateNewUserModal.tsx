import React, { FC } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

interface NewUserModalProps {
  show: boolean;
  onHide: () => void;
}

const NewUserModal: FC<NewUserModalProps> = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Details</h2>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="John Doe" />
              </Form.Group>

              <Form.Group controlId="formCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" placeholder="Google" />
              </Form.Group>

              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select">
                  <option>Admin</option>
                  <option>Project Manager</option>
                  <option>IT Technicians</option>
                  <option>Viewers</option>
                </Form.Control>
              </Form.Group>

      
              <Button variant="danger" className="mt-4">
                Deactivate
              </Button>
            </Col>

            <Col>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Johndoes@mail.com" />
              </Form.Group>

              <Form.Group controlId="formLoginMethod">
                <Form.Label>Login Method</Form.Label>
                <Form.Control as="select">
                  <option>Google</option>
                  <option>Microsoft</option>
                  <option>Our own password</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formTag">
                <Form.Label>Tag</Form.Label>
                <Form.Control type="text" placeholder="A+ Certification , Cisco +" />
              </Form.Group>
         
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary">
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewUserModal;
