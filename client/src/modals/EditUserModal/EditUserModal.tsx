/* The above code is a TypeScript React component that represents a modal for editing user details. It
imports necessary modules from packages such as React, react-bootstrap, and axios. The component
takes in various props such as the user to be edited, companies and roles dropdown values, and
functions for updating and deleting users. */
// Import necessary modules from their respective packages.
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import axios from "axios";
import config from "../../config";
import {
  User as UserInterface,
  Company as CompanyInterface,
  Role,
} from "../../problemdomain/Interface/Interface";

// Define prop types for the EditUserModal component.
interface EditUserModalProps {
  show: boolean;
  onHide: () => void;
  user: UserInterface;
  updateUser: (email: string, updatedUser: UserInterface) => void;
  deleteUser: (email: string) => void;
  fetchUsers: () => void;
  companies: CompanyInterface[];
  roles: Role[];
  onUserUpdated: () => void;
}

// Define the EditUserModal functional component.
const EditUserModal: React.FC<EditUserModalProps> = ({
  show,
  onHide,
  user,
  fetchUsers,
  companies,
  roles,
  onUserUpdated,
}) => {
  // State declarations for various user attributes.
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [company, setCompany] = useState(user.company ? user.company.id : "");
  const [role, setRole] = useState(user.role);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [jobTitle, setJobTitle] = useState(user.jobTitle);
  const [tags, setTags] = useState(user.tags);

  // Side-effect to update local state whenever user prop or related dropdown values change.
  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhoneNumber(user.phoneNumber);
      setJobTitle(user.jobTitle);
      setRole(user.role);
      setCompany(user.company ? user.company.id : "");
      setTags(user.tags || ""); // Safely handle potentially null or undefined tags.
    }
  }, [user, companies, roles]);

  // Handler for form submission to update user details.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Guard clause for missing company.
    if (!company) {
      return;
    }

    // Construct updated user object.
    const updatedUser: UserInterface = {
      ...user,
      firstName: firstName,
      lastName: lastName,
      companyId: company,
      phoneNumber: phoneNumber,
      jobTitle: jobTitle,
      role: role,
      tags: tags,
    };

    try {
      // Send updated user data to backend and refresh user list.
      await axios.put(`${config.backend}/api/user/${user.id}`, updatedUser);
      await fetchUsers();
      onHide();
      onUserUpdated();
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  // Handler for user deletion.
  const handleDelete = async () => {
    try {
      // Delete user from backend and refresh user list.
      await axios.delete(`${config.backend}/api/user/${user.id}`);
      fetchUsers();
      onHide();
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  // Return JSX for the modal.
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <h2>Details</h2>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>
                  <strong>Email:</strong>
                </td>
                <td>{user.email}</td>
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
                    onChange={(e) => {
                      setCompany(e.target.value);
                    }}
                  >
                    <option value="">Select Company</option>
                    {[...companies]
                      .sort((a, b) => (b.id === user.company.id ? 1 : -1))
                      .map((company) => (
                        <option key={company.id} value={company.id}>
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
                  <strong>Phone Number:</strong>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </td>
                <td>
                  <strong>User Status:</strong>
                </td>
                <td>{user.deleted ? "Inactive" : "Active"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Job Title:</strong>
                </td>
                <td colSpan={5}>
                  <Form.Control
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Tags:</strong>
                </td>
                <td colSpan={5}>
                  <Form.Control
                    type="text"
                    placeholder="Tags (separate with comma)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
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
      </Form>
    </Modal>
  );
};

export default EditUserModal;
