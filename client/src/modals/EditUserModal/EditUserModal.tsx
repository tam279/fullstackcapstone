import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
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
  deactivateUser: (email: string) => void;
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
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter your first name!"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please enter your last name!"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formCompany">
                <Form.Label>Company</Form.Label>
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
              </Form.Group>

              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
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
              </Form.Group>

              <Form.Group controlId="formMethod">
                <Form.Label>Login Method</Form.Label>
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
              </Form.Group>


              <Form.Group controlId="formTag">
                <Form.Label>Tag</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tag"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPhoneNumber">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formJobTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Job Title"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formIsActive">
                <Form.Label>User Status</Form.Label>
                <Form.Control
                  as="select"
                  value={isActive}
                  onChange={(e) => setIsActive(Number(e.target.value))}
                >
                  <option value={1}>Active</option>
                  <option value={0}>Inactive</option>
                </Form.Control>
              </Form.Group>

              <Button variant="danger" className="mt-4" onClick={handleDeactivate}>
                Deactivate
              </Button>
            </Col>

            <Col>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={user.EMAIL}
                  readOnly
                />
              </Form.Group>

              <Button variant="danger" className="mt-4" onClick={handleDelete}>
                Delete
              </Button>
            </Col>
          </Row>
          <Button className="w-100 mt-4" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;
