/**
 * The above code is a TypeScript React component that renders a modal for editing company details,
 * including name, address, phone number, and website, and allows for updating and deleting the
 * company.
 * @param  - - `onHide`: a function that will be called when the modal is closed or hidden
 * @returns The EditCompanyModal component is being returned.
 */
import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";
import config from "../../config";
import { Company } from "../../problemdomain/Interface/Interface";

// Define properties for the EditCompanyModal component
interface EditCompanyModalProps {
  onHide: () => void;
  show: boolean;
  company: Company;
  fetchCompanies: () => void;
}

const EditCompanyModal: React.FC<EditCompanyModalProps> = ({
  onHide,
  show,
  company,
  fetchCompanies,
}) => {
  // State hooks for managing company details
  const [name, setName] = useState(company?.name || "");
  const [address, setAddress] = useState(company?.address || "");
  const [phoneNumber, setPhoneNumber] = useState(company?.phoneNumber || "");
  const [website, setWebsite] = useState(company?.website || "");

  // Handler for updating the company details
  const handleUpdateCompany = async () => {
    const updatedCompany = {
      name,
      address,
      phoneNumber,
      website,
    };
    try {
      // API call to update the company details using axios
      await axios.put(
        `${config.backend}/api/company/${company.id}`,
        updatedCompany
      );
      fetchCompanies();
      onHide();
    } catch (error) {
      console.error(error);
    }
  };
  // Handler for deleting the company
  const handleDeleteCompany = async () => {
    try {
      // API call to delete the company using axios
      await axios.delete(`${config.backend}/api/company/${company.id}`);
      fetchCompanies();
      onHide();
    } catch (error) {
      console.error(error);
    }
  };

  // Return the EditCompanyModal component
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Google"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </Form.Group>
          <Form.Group controlId="formAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="123 Main St"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="555-555-5555"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              required
            />
          </Form.Group>
          <Form.Group controlId="formWebsite">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://www.example.com"
              onChange={(e) => setWebsite(e.target.value)}
              value={website}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleDeleteCompany}>
          Delete
        </Button>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateCompany}>
          Update Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditCompanyModal;
