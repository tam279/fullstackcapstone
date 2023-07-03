import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

interface User {
  EMAIL: string;
  FIRSTNAME: string;
  LASTNAME: string;
  COMPANY: string;
  ROLE: string;
  LOGIN_METHOD: string;
  TAG: string;
  PHONE_NUMBER: string;
  JOB_TITLE: string;
  ISACTIVE: number;
}

interface Company {
  COMPANYID: number;
  COMPANYNAME: string;
  ADDRESS: string; // Add ADDRESS field
  PHONE_NUMBER: string; // Add PHONE_NUMBER field
  WEBSITE: string; // Add WEBSITE field
}


interface Role {
  ROLEID: number;
  ROLENAME: string;
  // Add other properties of a role here
}

interface EditUserModalProps {
  show: boolean;
  onHide: () => void;
  user: User;
  updateUser: (id: string, updatedUser: any) => void;
  deleteUser: (id: string) => void;
  deactivateUser: (id: string) => void;
  fetchUsers: () => void;
  companies: Company[]; // Add the 'companies' prop
  roles: Role[]; // Add the 'roles' prop
}


const EditUserModal: React.FC<EditUserModalProps> = ({
  show,
  onHide,
  user,
  updateUser,
  deleteUser,
  deactivateUser,
  fetchUsers,
  companies, // Add this line
  roles, // Add this line
}) => {
  const [firstName, setFirstName] = useState(user.FIRSTNAME);
  const [lastName, setLastName] = useState(user.LASTNAME);
  const [company, setCompany] = useState(user.COMPANY);
  const [role, setRole] = useState(user.ROLE);
  const [loginMethod, setLoginMethod] = useState(user.LOGIN_METHOD);
  const [tag, setTag] = useState(user.TAG);
  const [phoneNumber, setPhoneNumber] = useState(user.PHONE_NUMBER);
  const [jobTitle, setJobTitle] = useState(user.JOB_TITLE);
  const [isActive, setIsActive] = useState(user.ISACTIVE);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUser = {
      firstName: firstName,
      lastName: lastName,
      company: company,
      role: role,
      loginMethod: loginMethod,
      tag: tag,
      phoneNumber: phoneNumber,
      jobTitle: jobTitle,
      isActive: isActive,
    };

    try {
      await axios.put(`http://localhost:5000/api/updateUser/${user.EMAIL}`, updatedUser);
      fetchUsers();
      onHide();
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteUser/${user.EMAIL}`);
      fetchUsers();
      onHide();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleDeactivate = async () => {
    try {
      await axios.post(`http://localhost:5000/api/deactivateUser/${user.EMAIL}/deactivate`);
      fetchUsers();
      onHide();
    } catch (error) {
      console.error('Error deactivating user', error);
    }
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
                <Form.Control
                  as="select"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                >
                  {companies.map((comp) => (
                    <option key={comp.COMPANYID} value={comp.COMPANYID}>
                      {comp.COMPANYNAME}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {roles.map((role) => (
                    <option key={role.ROLEID} value={role.ROLEID}>
                      {role.ROLENAME}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>



              <Form.Group controlId="formLoginMethod">
                <Form.Label>Login Method</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Login Method"
                  value={loginMethod}
                  onChange={(e) => setLoginMethod(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formTag">
                <Form.Label>Tag</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formJobTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formIsActive">
                <Form.Label>User Status</Form.Label>
                <Form.Control
                  as="select"
                  value={isActive}
                  onChange={(e) => setIsActive(Number(e.target.value))}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </Form.Control>
              </Form.Group>

              <Button variant="danger" className="mt-4" onClick={handleDeactivate}>
                Deactivate
              </Button>
            </Col>

            <Col>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={user.EMAIL}
                  readOnly
                />
              </Form.Group>

              <Button variant="danger" className="mt-4" onClick={handleDelete}>
                Delete
              </Button>
            </Col>
          </Row>
          <Button className="w-100 mt-4" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
