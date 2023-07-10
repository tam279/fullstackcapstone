import React, { FC } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

interface CreateTaskModalProps {
  show: boolean;
  handleClose: () => void;
}

const CreateTaskModal: FC<CreateTaskModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <h2>Details</h2>
            <Col>

              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter task name" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Technicians</Form.Label>
                <Form.Control as="select" multiple>
                  <option>Technician 1</option>
                  <option>Technician 2</option>
                </Form.Control>
              </Form.Group>



              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Task description..." />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Priority Level</Form.Label>
                <Form.Control as="select">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Tags</Form.Label>
                <Form.Control type="text" placeholder="Enter tags" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Files</Form.Label>
                <Form.Control type="file" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Dependencies</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Task dependencies..." />
              </Form.Group>

            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>

        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTaskModal;
