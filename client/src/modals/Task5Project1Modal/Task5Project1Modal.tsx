import React, { FC } from 'react';
import { Modal, Button, Form, InputGroup, FormControl, Row, Col } from 'react-bootstrap';

interface Task5Project1ModalProps {
    show: boolean;
    handleClose: () => void;
}

const Task5Project1Modal: FC<Task5Project1ModalProps> = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Task 5 - Details and Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <Col>
                        <h4>Dependencies: Task 3, Task 4</h4>
                        <h4>Technicians: Jane Smith, Mark Johnson, Emily Roberts</h4>
                        <Form.Group>
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>End Date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>

                        <h4>Tags: A+ Certification, Cisco</h4>
                        <h4>Files:</h4>
                        <p>PNG 2.00 MB, PDF 1.00 MB</p>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Priority Level</Form.Label>
                            <Form.Control as="select">
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>

                        <h4>Comments:</h4>
                        {/* Map through comments here */}
                        <p>John Doe - 1 week ago</p>
                        <p>Hello Everybody!</p>
                        <InputGroup>
                            <FormControl as="textarea" placeholder="Enter comment" />
                        </InputGroup>
                        <Button>Upload</Button>
                        <Button>Send</Button>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary">Start Task</Button>
                <Button variant="primary" onClick={handleClose}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Task5Project1Modal;
