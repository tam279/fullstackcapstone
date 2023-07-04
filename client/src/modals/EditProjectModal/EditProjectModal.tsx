import React, { FC } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

interface Project {
  PROJECTID: number;
  NAME: string;
  STARTDATE: string;
  ENDDATE: string;
  PROGRESS: number;
  MANAGEREMAIL: string;
  DESCRIPTION: string;
  COMPANYID: number;
  ISACTIVE: number;
}

interface EditProjectModalProps {
  show: boolean;
  handleClose: () => void;
  project: Project | null;
}

const EditProjectModal: FC<EditProjectModalProps> = ({ show, handleClose, project }) => {
  if (!project) {
    return null;
  }

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <h2>Details</h2>
            <Col>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter project name" defaultValue={project.NAME} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" defaultValue={project.STARTDATE} />
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
                <Form.Control as="textarea" rows={3} defaultValue={project.DESCRIPTION} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group>
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" placeholder="Enter company name" />
              </Form.Group>

              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" defaultValue={project.ENDDATE} />
              </Form.Group>

              <Form.Group>
                <Form.Label>Viewers</Form.Label>
                <Form.Control as="select" multiple>
                  <option>Viewer 1</option>
                  <option>Viewer 2</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label>IT Technician</Form.Label>
                <Form.Control as="select" multiple>
                  <option>IT Technician 1</option>
                  <option>IT Technician 2</option>
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
          Update
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProjectModal;
