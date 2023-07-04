import React, { FC, useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

interface NewUserModalProps {
  show: boolean;
  onHide: () => void;
  onUserCreated: () => void;
}

interface Company {
  COMPANYID: number;
  COMPANYNAME: string;
  CREATED_AT: string;
  ISACTIVE: number;
}

const NewUserModal: FC<NewUserModalProps> = ({ show, onHide, onUserCreated }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [company, setCompany] = useState<number | null>(null);
  const [role, setRole] = useState<number | null>(null);
  const [email, setEmail] = useState('');
  const [loginMethod, setLoginMethod] = useState<number | null>(null);
  const [password, setPassword] = useState('');
  const [tag, setTag] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/companies')
      .then(response => response.json())
      .then(data => setCompanies(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleCreateUser = () => {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      companyID: company,
      roleID: role,
      email: email,
      password: password,
      methodID: loginMethod,
      tag: tag,
      phoneNumber: phoneNumber,
      jobTitle: jobTitle,
    };

    fetch('http://localhost:5000/api/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        onUserCreated();
      })
      .catch((error) => console.error('Error:', error));

    setFirstName('');
    setLastName('');
    setCompany(null);
    setRole(null);
    setEmail('');
    setLoginMethod(null);
    setPassword('');
    setTag('');
    setPhoneNumber('');
    setJobTitle('');

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
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Johndoes@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
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
              <Form.Label>Company</Form.Label>
              <Form.Control
                as="select"
                value={company || ''}
                onChange={(e) => setCompany(Number(e.target.value) || null)}
              >
                <option value="">Select Company</option>
                {companies.map((company, index) => (
                  <option key={index} value={company.COMPANYID}>
                    {company.COMPANYNAME}
                  </option>
                ))}
              </Form.Control>
              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={role || ''}
                  onChange={(e) => setRole(Number(e.target.value) || null)}
                >
                  <option value="">Select Role</option>
                  <option value={1}>Admin</option>
                  <option value={2}>Project Manager</option>
                  <option value={3}>IT Technicians</option>
                  <option value={4}>Viewers</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formLoginMethod">
                <Form.Label>Login Method</Form.Label>
                <Form.Control
                  as="select"
                  value={loginMethod || ''}
                  onChange={(e) => setLoginMethod(Number(e.target.value) || null)}
                >
                  <option value="">Select Login Method</option>
                  <option value={1}>Google</option>
                  <option value={2}>Microsoft</option>
                  <option value={3}>Our own password</option>
                </Form.Control>
              </Form.Group>
            </Col>
      
         
            <Col>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formTag">
                <Form.Label>Tag</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="A+ Certification, Cisco +"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formJobTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter job title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
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
