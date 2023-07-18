import React, { FC, useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import config from "../../config";

interface NewUserModalProps {
  show: boolean;
  onHide: () => void;
  onUserCreated: () => void;
}

interface Company {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  website: string;
  deleted: boolean;
}

const NewUserModal: FC<NewUserModalProps> = ({
  show,
  onHide,
  onUserCreated,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState<number | null>(null);
  const [role, setRole] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tag, setTag] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetch(`${config.backend}/api/companies`)
      .then((response) => response.json())
      .then((data) => setCompanies(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleCreateUser = () => {
    if (
      !firstName ||
      !lastName ||
      !company ||
      !role ||
      !email ||
      !password ||
      !phoneNumber ||
      !jobTitle
    ) {
      alert("Please fill out all fields");
      return;
    }

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      companyId: company,
      role: role,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      jobTitle: jobTitle,
      deleted: false,
    };

    fetch(`${config.backend}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create user");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        onUserCreated();
      })
      .catch((error) => {
        alert(error);
        console.error("Error:", error);
      });

    setFirstName("");
    setLastName("");
    setCompany(null);
    setRole(null);
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setJobTitle("");

    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h2>Details</h2>
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td>
                <strong>Email:</strong>
              </td>
              <td>
                <Form.Control
                  type="email"
                  placeholder="Johndoes@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
              <td>
                <strong>First Name:</strong>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Please enter your first name!"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </td>
              <td>
                <strong>Last Name:</strong>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Please enter your last name!"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Company:</strong>
              </td>
              <td>
                <Form.Control
                  as="select"
                  value={company || ""}
                  onChange={(e) => setCompany(Number(e.target.value) || null)}
                >
                  <option value="">Select Company</option>
                  {companies.map((company, index) => (
                    <option key={index} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </Form.Control>
              </td>
              <td>
                <strong>Role:</strong>
              </td>
              <td>
                <Form.Control
                  as="select"
                  value={role || ""}
                  onChange={(e) => setRole(Number(e.target.value) || null)}
                >
                  <option value="">Select Role</option>
                  <option value={1}>Admin</option>
                  <option value={2}>Project Manager</option>
                  <option value={3}>IT Technicians</option>
                  <option value={4}>Viewers</option>
                </Form.Control>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Password:</strong>
              </td>
              <td>
                <Form.Control
                  type="password"
                  placeholder="Enter a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
              <td>
                <strong>Tag:</strong>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="A+ Certification, Cisco +"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </td>
              <td>
                <strong>Phone Number:</strong>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Job Title:</strong>
              </td>
              <td colSpan={5}>
                <Form.Control
                  type="text"
                  placeholder="Enter job title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateUser}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewUserModal;
