// EditUserModal.js

import React from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const EditUserModal = ({ show, onHide, user, updateUser, deleteUser, deactivateUser }) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUser = {
            name: e.currentTarget.formName.value,
            email: e.currentTarget.formEmail.value,
            company: e.currentTarget.formCompany.value,
            role: e.currentTarget.formRole.value,
            tag: e.currentTarget.formTag.value,
        };

        updateUser(user.id, updatedUser);
    };

    const handleDelete = () => {
        deleteUser(user.id);
        onHide();
    };

    const handleDeactivate = () => {
        deactivateUser(user.id);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="John Doe" defaultValue={user.name} />
                            </Form.Group>

                            <Form.Group controlId="formCompany">
                                <Form.Label>Company</Form.Label>
                                <Form.Control type="text" placeholder="Google" defaultValue={user.company} />
                            </Form.Group>

                            <Form.Group controlId="formRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Control as="select" defaultValue={user.role}>
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
                                <Form.Control type="email" placeholder="Johndoes@mail.com" defaultValue={user.email} />
                            </Form.Group>

                            <Form.Group controlId="formLoginMethod">
                                <Form.Label>Login Method</Form.Label>
                                <Form.Control as="select" defaultValue={user.loginMethod}>
                                    <option>Google</option>
                                    <option>Microsoft</option>
                                    <option>Our own password</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId="formTag">
                                <Form.Label>Tag</Form.Label>
                                <Form.Control type="text" placeholder="A+ Certification, Cisco +" defaultValue={user.tag} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete User
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditUserModal;