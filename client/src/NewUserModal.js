import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const NewUserModal = ({ show, onHide, onUserCreated }) => {
    const [newUser, setNewUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
        company: '',
    });


    const [roles, setRoles] = useState([]);
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        const fetchRolesAndCompanies = async () => {
            try {
                const [rolesRes, companiesRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/roles'),
                    axios.get('http://localhost:5000/api/companies'),
                ]);

                setRoles(rolesRes.data);
                setCompanies(companiesRes.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRolesAndCompanies();
    }, []);

    const handleSave = async () => {
        try {
            await axios.post('http://localhost:5000/api/createUser', newUser);
            onHide();
            onUserCreated();
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
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
                                    placeholder="John"
                                    name="firstName"
                                    value={newUser.firstName}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Doe"
                                    name="lastName"
                                    value={newUser.lastName}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formCompany">
                                <Form.Label>Company</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="company"
                                    value={newUser.company}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a company</option>
                                    {companies.map((company) => (
                                        <option key={company.CompanyID} value={company.CompanyID}>
                                            {company.CompanyName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="role"
                                    value={newUser.role}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a role</option>
                                    {roles.map((role) => (
                                        <option key={role.RoleID} value={role.RoleID}>
                                            {role.RoleName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="john.doe@gmail.com"
                                    name="email"
                                    value={newUser.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    value={newUser.password}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewUserModal;
