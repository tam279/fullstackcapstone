import React, { FC, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

interface NewUserModalProps {
  show: boolean;
  onHide: () => void;
}

const NewUserModal: FC<NewUserModalProps> = ({ show, onHide }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [loginMethod, setLoginMethod] = useState('');
  const [tag, setTag] = useState('');

  const handleCreateUser = () => {
    // Perform the necessary logic to create a new user with the form data
    const newUser = {
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      COMPANYNAME: company,
      ROLENAME: role,
      EMAIL: email,
      METHODNAME: loginMethod,
      TAG: tag,
    };
    console.log('New user:', newUser);

    // Clear the form fields
    setFirstName('');
    setLastName('');
    setCompany('');
    setRole('');
    setEmail('');
    setLoginMethod('');
    setTag('');

    // Close the modal
    onHide();
  };

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
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter your first name!"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter your last name!"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Google"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option>Admin</option>
                  <option>Project Manager</option>
                  <option>IT Technicians</option>
                  <option>Viewers</option>
                </Form.Control>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Johndoes@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formLoginMethod">
                <Form.Label>Login Method</Form.Label>
                <Form.Control
                  as="select"
                  value={loginMethod}
                  onChange={(e) => setLoginMethod(e.target.value)}
                >
                  <option>Google</option>
                  <option>Microsoft</option>
                  <option>Our own password</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formTag">
                <Form.Label>Tag</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="A+ Certification , Cisco +"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateUser}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewUserModal;
