import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Tabs, Tab, Table } from 'react-bootstrap';
import SidebarProject from '../../components/SidebarProject/SidebarProject';
import NewUserModal from '../../modals/CreateNewUserModal/CreateNewUserModal';
import EditUserModal from '../../modals/EditUserModal/EditUserModal';
import axios from 'axios';
import NewCompanyModal from '../../modals/CreateNewCompanyModal/CreateNewCompanyModal';

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
}


interface Company {
  COMPANYID: number;
  COMPANYNAME: string;
  ADDRESS: string; // Add ADDRESS field
  PHONE_NUMBER: string; // Add PHONE_NUMBER field
  WEBSITE: string; // Add WEBSITE field
}


interface Role {
  ROLEID: number;
  ROLENAME: string;
  // Add other properties of a role here
}

const UserManagementPage = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [companyData, setCompanyData] = useState<Company[]>([]);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleData, setRoleData] = useState<Role[]>([]);

  const fetchUserData = () => {
    axios
      .get('http://localhost:5000/api/users')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchUserData();
    fetchCompanyData();
    fetchRoleData();
  }, []);

  const fetchCompanyData = () => {
    axios
      .get('http://localhost:5000/api/companies')
      .then(response => {
        setCompanyData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const fetchRoleData = () => {
    axios
      .get('http://localhost:5000/api/roles')
      .then(response => {
        setRoleData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleHideModal = () => {
    setSelectedUser(null);
    setShowEditModal(false);
  };

  const handleShowUserModal = () => setShowUserModal(true);
  const handleCloseUserModal = () => setShowUserModal(false);

  const handleUpdateUser = (id: string, updatedUser: any) => {
    // Implement your user updating logic here
    // After updating, don't forget to call handleHideModal to close the modal.
  };

  const handleDeleteUser = (id: string) => {
    // Implement your user deleting logic here
  };

  const handleDeactivateUser = (id: string) => {
    // Implement your user deactivating logic here
  };

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:5000/api/users'),
      axios.get('http://localhost:5000/api/companies'),
      axios.get('http://localhost:5000/api/roles'),
    ]).then(([usersRes, companiesRes, rolesRes]) => {
      // Create mapping from companyID and roleID to their names


      setUserData(userData);
      setCompanyData(companiesRes.data);
      setRoleData(rolesRes.data);
    }).catch(error => console.error('Error:', error));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col xs={3} md={2} lg={2} className="p-0">
          <SidebarProject />
        </Col>
        <Col xs={9} md={10} lg={10}>
          <div className="d-flex align-items-center justify-content-between my-3">
            <h1>User Management</h1>
          </div>
          <Tabs defaultActiveKey="userlist" id="user-management-tabs" className="mb-3">
            <Tab eventKey="userlist" title="User List">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>
                      <Button onClick={handleShowUserModal}>+ New User</Button>
                    </th>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Login Methods</th>
                    <th>Tag</th>
                    <th>Phone Number</th>
                    <th>Job Title</th>
                    <th>User status</th>
                    <th>Filter</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index) => (
                    <tr key={index}>
                      <td>
                        <Button onClick={() => handleEditClick(user)}>Edit</Button>
                      </td>
                      <td>{user.EMAIL}</td>
                      <td>{user.FIRSTNAME}</td>
                      <td>{user.LASTNAME}</td>
                      <td>{user.COMPANYNAME}</td>
                      <td>{user.ROLENAME}</td>
                      <td>{user.METHODNAME}</td>
                      <td>{user.TAG}</td>
                      <td>{user.PHONE_NUMBER}</td>
                      <td>{user.JOB_TITLE}</td>
                      <td>{user.ISACTIVE}</td>

                      <td>
                        <Button>Filter</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
            <Tab eventKey="companies" title="Companies">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>
                      <Button onClick={() => setShowCompanyModal(true)} className="mb-3 ml-auto">
                        + New Company
                      </Button>
                    </th>
                    <th>Company ID</th>
                    <th>Company Name</th>
                    <th>Address</th> {/* Add Address column */}
                    <th>Phone Number</th> {/* Add Phone Number column */}
                    <th>Website</th> {/* Add Website column */}
                  </tr>
                </thead>
                <tbody>
                  {companyData.map((company, index) => (
                    <tr key={index}>
                      <td>
                        <Button onClick={() => console.log('Edit clicked:', company)}>Edit</Button>
                      </td>
                      <td>{company.COMPANYID}</td>
                      <td>{company.COMPANYNAME}</td>
                      <td>{company.ADDRESS}</td> {/* Display Address */}
                      <td>{company.PHONE_NUMBER}</td> {/* Display Phone Number */}
                      <td>{company.WEBSITE}</td> {/* Display Website */}
                    </tr>
                  ))}
                </tbody>
              </Table>

            </Tab>
          </Tabs>
        </Col>
      </Row>
      <NewUserModal show={showUserModal} onHide={handleCloseUserModal} onUserCreated={fetchUserData} />

      {selectedUser && (
        <EditUserModal
          show={showEditModal}
          onHide={handleHideModal}
          user={selectedUser}
          updateUser={handleUpdateUser}
          deleteUser={handleDeleteUser}
          deactivateUser={handleDeactivateUser}
          fetchUsers={fetchUserData}
          companies={companyData}
          roles={roleData}
        />
      )}

      <NewCompanyModal show={showCompanyModal} onHide={() => setShowCompanyModal(false)} onSuccess={fetchCompanyData} />
    </Container>
  );
};

export default UserManagementPage;