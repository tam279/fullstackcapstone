import React, { FC, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import config from "../../config";

// Type definition for the component's props
interface NewCompanyModalProps {
  show: boolean;
  onHide: () => void;
}

// Component definition
const NewCompanyModal: FC<NewCompanyModalProps & { onSuccess: () => void }> = ({
  show,
  onHide,
  onSuccess,
}) => {
  // Local state to manage form input values
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [website, setWebsite] = useState("");

  // Handler to submit the form data
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    try {
      // Sending the data to the server using POST request
      await axios.post(`${config.backend}/api/companies`, {
        name,
        address,
        phoneNumber,
        website,
      });
      onHide(); // Hide the modal after successful submission
      onSuccess(); // Callback for successful data submission
    } catch (error) {
      console.error(error); // Log any errors encountered during submission
    }
  };

  // Render the modal form
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Company</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Details</h2>
        <Form onSubmit={handleSubmit}>
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
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

// Exporting the component for use in other parts of the application
export default NewCompanyModal;
