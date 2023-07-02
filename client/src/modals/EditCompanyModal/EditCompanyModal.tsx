import React, { FC } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface EditCompanyModalProps {
  show: boolean;
  onHide: () => void;
  company: any;
  updateCompany: (id: string, updatedCompany: any) => void;
  deleteCompany: (id: string) => void;
}

const EditCompanyModal: FC<EditCompanyModalProps> = ({ show, onHide, company, updateCompany, deleteCompany }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedCompany = {
      name: e.currentTarget.formName.value,
      photo: e.currentTarget.formPhoto.value,
    };

    updateCompany(company.id, updatedCompany);
    onHide();
  };

  const handleDelete = () => {
    deleteCompany(company.id);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Google" defaultValue={company.name} />
          </Form.Group>

          <Form.Group controlId="formPhoto">
            <Form.Label>Photo</Form.Label>
            <Form.Control type="file" defaultValue={company.photo} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
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

export default EditCompanyModal;
