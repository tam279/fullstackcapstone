import React, { FC, useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { Company, User, Role } from "../../problemdomain/Interface/Interface";
import { fetchCompanyData } from "../../problemdomain/DataService/DataService";
import config from "../../config";

interface NewUserModalProps {
  show: boolean;
  onHide: () => void;
  onUserCreated: (newUser: User) => void;
}

const NewUserModal: FC<NewUserModalProps> = ({
  show,
  onHide,
  onUserCreated,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [company, setCompany] = useState<Company | null>(null); // Change here
  const [role, setRole] = useState<Role | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetchCompanyData()
      .then((data) => {
        console.log("Companies:", data);
        setCompanies(data);
      })
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
      companyId: company.id, // Change here
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
        onUserCreated(data);
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
                  value={company ? company.id : ""}
                  onChange={(e) => {
                    const selectedCompanyId = e.target.value;
                    console.log("Selected company ID:", selectedCompanyId);
                    const selectedCompany = companies.find(
                      (company) => company.id === selectedCompanyId
                    );
                    console.log("Selected company:", selectedCompany);
                    setCompany(selectedCompany || null);
                  }}
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
                  onChange={(e) => setRole(e.target.value as Role)}
                >
                  <option value="">Select Role</option>
                  {Object.values(Role).map((role, index) => (
                    <option key={index} value={role}>
                      {role}
                    </option>
                  ))}
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
              <td>
                <strong>Job Title:</strong>
              </td>
              <td>
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
