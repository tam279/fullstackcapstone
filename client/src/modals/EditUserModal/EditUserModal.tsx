import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

interface User {
  EMAIL: string;
  FIRSTNAME: string;
  LASTNAME: string;
  ISACTIVE: number;
  IS_EMAIL_VERIFIED: number;
  TAG: string;
  COMPANYID: number;
  ROLEID: number;
  METHODID: number;
  ROLENAME: string;
  COMPANYNAME: string;
  METHODNAME: string;
}

interface EditUserModalProps {
  show: boolean;
  user: User;
  updateUser: (id: string, updatedUser: any) => void;
  deleteUser: (id: string) => void;
  deactivateUser: (id: string) => void;
  onHide: () => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ show, onHide, user, updateUser, deleteUser, deactivateUser }) => {
  const [firstName, setFirstName] = useState(user.FIRSTNAME);
  const [lastName, setLastName] = useState(user.LASTNAME);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUser = {
      firstName: firstName,
      lastName: lastName,
      company: e.currentTarget.formCompany.value,
      role: e.currentTarget.formRole.value,
      tag: e.currentTarget.formTag.value,
    };

    updateUser(user.EMAIL, updatedUser);
    onHide();
  };

  const handleDelete = () => {
    deleteUser(user.EMAIL);
    onHide();
  };

  const handleDeactivate = () => {
    deactivateUser(user.EMAIL);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
                <Form.Control type="text" placeholder="Google" defaultValue={user.COMPANYNAME} />
              </Form.Group>

              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" defaultValue={user.ROLENAME}>
                  <option>Admin</option>
                  <option>Project Manager</option>
                  <option>IT Technicians</option>
                  <option>Viewers</option>
                </Form.Control>
              </Form.Group>




              <Button variant="danger" className="mt-4" onClick={handleDeactivate}>
                Deactivate
              </Button>
            </Col>

            <Col>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Johndoes@mail.com" defaultValue={user.EMAIL} />
              </Form.Group>

              <Form.Group controlId="formLoginMethod">
                <Form.Label>Login Method</Form.Label>
                <Form.Control as="select" defaultValue={user.METHODID}>
                  <option>Google</option>
                  <option>Microsoft</option>
                  <option>Our own password</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formTag">
                <Form.Label>Tag</Form.Label>
                <Form.Control type="text" placeholder="A+ Certification, Cisco +" defaultValue={user.TAG} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
    
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
