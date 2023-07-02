import React, { FC } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

interface CreateProjectModalProps {
  show: boolean;
  handleClose: () => void;
}

const CreateProjectModal: FC<CreateProjectModalProps> = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
          <h2>Details</h2>
            <Col>
            
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter project name" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>

            
             
                <Form.Group>
                <Form.Label>Manager</Form.Label>
                <Form.Control as="select" multiple>
                  <option>Manager 1</option>
                  <option>Manager 2</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} defaultValue="Welcome 👋This project involves developing a custom ERP (Enterprise Resource Planning) software solution for Acme Corporation. The ERP system will integrate various business functions, including finance, human resources, supply chain management, and customer relationship management, into a single, streamlined software platform. The project will encompass the full software development life cycle, from requirements gathering and system design to development, testing, deployment, and post-implementation support." />          
                </Form.Group>
            
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" placeholder="Enter company name" />
              </Form.Group>

              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Viewers</Form.Label>
                <Form.Control as="select" multiple>
                  <option>Viewer 1</option>
                  <option>Viewer 2</option>
                </Form.Control>
              </Form.Group>



              <Form.Group>
                <Form.Label>IT Techcian</Form.Label>
                <Form.Control as="select" multiple>
                  <option>IT Techcian 1</option>
                  <option>IT Techcian 2</option>
                </Form.Control>
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

export default CreateProjectModal;
