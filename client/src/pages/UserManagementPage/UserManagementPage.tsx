import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Tabs, Tab, Table } from 'react-bootstrap';
import SidebarProject from '../../components/SidebarProject/SidebarProject';
import NewUserModal from '../../modals/CreateNewUserModal/CreateNewUserModal';
import axios from 'axios';

interface User {
  EMAIL: string;
  FIRSTNAME: string;
  LASTNAME: string;
  ISACTIVE: boolean;
  IS_EMAIL_VERIFIED: boolean;
  TAG: string;
  COMPANYID: number;
  ROLEID: number;
  METHODID: number;
  ROLENAME: string;
  COMPANYNAME: string;
  METHODNAME: string;
}

interface Company {
  COMPANYID: number;
  COMPANYNAME: string;
  CREATED_AT: string;
  ISACTIVE: number;
}

const UserManagementPage = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [companyData, setCompanyData] = useState<Company[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);

  const handleShowUserModal = () => {
    setShowUserModal(true);
  };

  const handleCloseUserModal = () => {
    setShowUserModal(false);
  };

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/companies')
      .then(response => {
        setCompanyData(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
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
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Tag</th>
                    <th>Filter</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index) => (
                    <tr key={index}>
                      <td>
                        <Button onClick={() => console.log('Edit clicked:', user)}>Edit</Button>
                      </td>
                      <td>{user.FIRSTNAME}</td>
                      <td>{user.LASTNAME}</td>
                      <td>{user.EMAIL}</td>
                      <td>{user.COMPANYNAME}</td>
                      <td>{user.ROLENAME}</td>
                      <td>{user.TAG}</td>
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
                    <th>Company ID</th>
                    <th>Company Name</th>
                  </tr>
                </thead>
                <tbody>
                  {companyData.map((company, index) => (
                    <tr key={index}>
                      <td>{company.COMPANYID}</td>
                      <td>{company.COMPANYNAME}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <NewUserModal show={showUserModal} onHide={handleCloseUserModal} />
    </Container>
  );
};

export default UserManagementPage;
