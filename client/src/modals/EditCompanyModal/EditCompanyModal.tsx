// EditCompanyModal.tsx
import React, { useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
interface Company {
  COMPANYID: number;
  COMPANYNAME: string;
  ADDRESS: string; // Add ADDRESS field
  PHONE_NUMBER: string; // Add PHONE_NUMBER field
  WEBSITE: string; // Add WEBSITE field
}

interface EditCompanyModalProps {
  onHide: () => void;
  show: boolean;
  company: Company;
  updateCompany: (COMPANYID: number, updatedCompany: any) => void;
  deleteCompany: (COMPANYID: number) => void;
}

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({ onHide, show, company, updateCompany, deleteCompany }) => {
  const [name, setName] = useState(company?.COMPANYNAME || "");
  const [address, setAddress] = useState(company?.ADDRESS || "");
  const [phoneNumber, setPhoneNumber] = useState(company?.PHONE_NUMBER || "");
  const [website, setWebsite] = useState(company?.WEBSITE || "");

  const handleSave = async () => {
    const updatedCompany = {
      companyName: name,
      address,
      phoneNumber,
      website,
    };
    try {
      await updateCompany(company.COMPANYID, updatedCompany);
      onHide();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCompany(company.COMPANYID);
      onHide();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control type="text" placeholder="Google" onChange={(e) => setName(e.target.value)} value={name} required />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="123 Main St" onChange={(e) => setAddress(e.target.value)} value={address} required />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="text" placeholder="555-555-5555" onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} required />
          </Form.Group>
          <Form.Group controlId="formWebsite">
            <Form.Label>Website</Form.Label>
            <Form.Control type="text" placeholder="https://www.example.com" onChange={(e) => setWebsite(e.target.value)} value={website} required />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Update Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditCompanyModal;
