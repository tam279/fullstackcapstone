import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Table } from 'react-bootstrap';
import axios from 'axios';

interface User {
  EMAIL: string;
  FIRSTNAME: string;
  LASTNAME: string;
  COMPANYNAME: string;
  ROLENAME: string;
  METHODNAME: string;
  TAG: string;
  PHONE_NUMBER: string;
  JOB_TITLE: string;
  ISACTIVE: number;
  COMPANY: string;
  ROLE: string;
  LOGIN_METHOD: string;
  COMPANYID: number | undefined;
  ROLEID: number | undefined;
  METHODID: number | undefined;
}

interface Company {
  COMPANYID: number;
  COMPANYNAME: string;
  ADDRESS: string;
  PHONE_NUMBER: string;
  WEBSITE: string;
}

interface Role {
  ROLEID: number;
  ROLENAME: string;
}

interface LoginMethod {
  METHODID: number;
  METHODNAME: string;
}

interface EditUserModalProps {
  show: boolean;
  onHide: () => void;
  user: User;
  updateUser: (email: string, updatedUser: User) => void;
  deleteUser: (email: string) => void;
  deactivateUser: (email: string) => void; // Added deactivateUser prop
  activateUser: (email: string) => void; // Added activateUser prop
  fetchUsers: () => void;
  companies: Company[];
  roles: Role[];
  loginMethods: LoginMethod[];
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  show,
  onHide,
  user,
  updateUser,
  deleteUser,
  deactivateUser,
  fetchUsers,
  companies,
  roles,
  loginMethods,
}) => {
  const getCompanyId = (companyName: string) => {
    const company = companies.find((comp) => comp.COMPANYNAME === companyName);
    return company ? company.COMPANYID : undefined;
  };

  const getRoleId = (roleName: string) => {
    const role = roles.find((rol) => rol.ROLENAME === roleName);
    return role ? role.ROLEID : undefined;
  };

  const getMethodId = (methodName: string) => {
    const method = loginMethods.find((method) => method.METHODNAME === methodName);
    return method ? method.METHODID : undefined;
  };

  const getCompanyName = (companyId: number | undefined): string | undefined => {
    const company = companies.find(c => c.COMPANYID === companyId);
    return company ? company.COMPANYNAME : undefined;
  };

  const getRoleName = (roleId: number | undefined): string | undefined => {
    const role = roles.find(r => r.ROLEID === roleId);
    return role ? role.ROLENAME : undefined;
  };

  const getMethodName = (loginMethodId: number | undefined): string | undefined => {
    const method = loginMethods.find(m => m.METHODID === loginMethodId);
    return method ? method.METHODNAME : undefined;
  };

  useEffect(() => {
    console.log(loginMethods);
  }, [loginMethods]);

  useEffect(() => {
    if (user) {
      setFirstName(user.FIRSTNAME);
      setLastName(user.LASTNAME);
      setCompanyId(user.COMPANYID !== undefined ? user.COMPANYID.toString() : undefined);
      setRoleId(user.ROLEID !== undefined ? user.ROLEID.toString() : undefined);
      setLoginMethodId(user.METHODID !== undefined ? user.METHODID.toString() : undefined);
      setTag(user.TAG);
      setPhoneNumber(user.PHONE_NUMBER);
      setJobTitle(user.JOB_TITLE);
      setIsActive(user.ISACTIVE);
    }
  }, [user]);

  const [firstName, setFirstName] = useState(user.FIRSTNAME);
  const [lastName, setLastName] = useState(user.LASTNAME);
  const [companyId, setCompanyId] = useState<string | undefined>(
    user.COMPANYID !== undefined ? user.COMPANYID.toString() : undefined
  );
  const [roleId, setRoleId] = useState<string | undefined>(
    user.ROLEID !== undefined ? user.ROLEID.toString() : undefined
  );
  const [loginMethodId, setLoginMethodId] = useState<string | undefined>(
    user.METHODID !== undefined ? user.METHODID.toString() : undefined
  );
  const [tag, setTag] = useState(user.TAG);
  const [phoneNumber, setPhoneNumber] = useState(user.PHONE_NUMBER);
  const [jobTitle, setJobTitle] = useState(user.JOB_TITLE);
  const [isActive, setIsActive] = useState(user.ISACTIVE);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedUser: User = {
      ...user, // Include existing user properties
      FIRSTNAME: firstName,
      LASTNAME: lastName,
      COMPANYID: companyId !== undefined ? Number(companyId) : undefined,
      ROLEID: roleId !== undefined ? Number(roleId) : undefined,
      METHODID: loginMethodId !== undefined ? Number(loginMethodId) : undefined,
      TAG: tag,
      PHONE_NUMBER: phoneNumber,
      JOB_TITLE: jobTitle,
      ISACTIVE: isActive,
    };

    try {
      await axios.put(`http://localhost:5000/api/updateUser/${user.EMAIL}`, updatedUser);
      fetchUsers();
      onHide();
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const handleActivate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/activateUser/${user.EMAIL}`);
      fetchUsers();
      onHide();
    } catch (error) {
      console.error('Error activating user', error);
    }
  };

  const handleDeactivate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/deactivateUser/${user.EMAIL}`);
      fetchUsers();
      onHide();
    } catch (error) {
      console.error('Error deactivating user', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/deleteUser/${user.EMAIL}`);
      fetchUsers();
      onHide();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };
  const log = loginMethods
  console.log(loginMethods);
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>  {/* Here is the change */}
        <Modal.Body>
          <h2>Details</h2>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td><strong>Email:</strong></td>
                <td>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={user.EMAIL}
                    readOnly
                  />
                </td>
                <td><strong>First Name:</strong></td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Please enter your first name!"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </td>
                <td><strong>Last Name:</strong></td>
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
                <td><strong>Company:</strong></td>
                <td>
                  <Form.Control
                    as="select"
                    value={companyId}
                    onChange={(e) => setCompanyId(e.target.value)}
                  >
                    {companies.map((comp) => (
                      <option key={comp.COMPANYID} value={comp.COMPANYID}>
                        {comp.COMPANYNAME}
                      </option>
                    ))}
                  </Form.Control>
                </td>
                <td><strong>Role:</strong></td>
                <td>
                  <Form.Control
                    as="select"
                    value={roleId}
                    onChange={(e) => setRoleId(e.target.value)}
                  >
                    {roles.map((role) => (
                      <option key={role.ROLEID} value={role.ROLEID}>
                        {role.ROLENAME}
                      </option>
                    ))}
                  </Form.Control>
                </td>
                <td><strong>Login Method:</strong></td>
                <td>
                  <Form.Control
                    as="select"
                    value={loginMethodId}
                    onChange={(e) => setLoginMethodId(e.target.value)}
                  >
                    {loginMethods.map((method) => (
                      <option key={method.METHODID} value={method.METHODID}>
                        {method.METHODNAME}
                      </option>
                    ))}
                  </Form.Control>
                </td>
              </tr>
              <tr>
                <td><strong>Phone Number:</strong></td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </td>
                <td><strong>Tag:</strong></td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                </td>
                <td><strong>User Status:</strong></td>
                <td>
                  {isActive ? 'Active' : 'Inactive'}
                </td>

              </tr>
              <tr>
                <td><strong>Job Title:</strong></td>
                <td colSpan={5}>
                  <Form.Control
                    type="text"
                    placeholder="Job Title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
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
          <Button variant="warning" onClick={handleDeactivate}>
            Deactivate
          </Button>
          <Button variant="success" onClick={handleActivate}>
            Activate
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
