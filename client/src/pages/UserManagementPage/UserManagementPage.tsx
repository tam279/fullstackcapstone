import React, { useState } from 'react';
import { Button, Container, Row, Col, Tabs, Tab, Table } from 'react-bootstrap';
import SidebarProject from '../../components/SidebarProject/SidebarProject';
import NewUserModal from '../../modals/CreateNewUserModal/CreateNewUserModal';
import NewCompanyModal from '../../modals/CreateNewCompanyModal/CreateNewCompanyModal';
import EditUserModal from '../../modals/EditUserModal/EditUserModal';
import EditCompanyModal from '../../modals/EditCompanyModal/EditCompanyModal'; // Import the EditCompanyModal

interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  tag: string;
}

interface Company {
  id: string;
  name: string;
  icon: string;
}

const UserManagementPage = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null); // Add selectedCompany state

  const updateUser = (id: string, updatedUser: User) => {
    setUserData(userData.map(user => (user.id === id ? updatedUser : user)));
  };

  const deleteUser = (id: string) => {
    setUserData(userData.filter(user => user.id !== id));
  };

  const updateCompany = (id: string, updatedCompany: Company) => {
    setCompanyData(companyData.map(company => (company.id === id ? updatedCompany : company)));
  };

  const deleteCompany = (id: string) => {
    setCompanyData(companyData.filter(company => company.id !== id));
  };

  const deactivateUser = (id: string) => {
    // Implement your deactivateUser functionality here.
  };

  const [userData, setUserData] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'johndoe@email.com',
      company: 'Vitra',
      role: 'Admin',
      tag: 'Project Manager',
    },
    /* more users... */
  ]);

  const [companyData, setCompanyData] = useState<Company[]>([
    { id: '1', name: 'Google', icon: 'google-icon.png' },
    { id: '2', name: 'Microsoft', icon: 'microsoft-icon.png' },
    // add more company data as needed
  ]);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showCompanyModal, setShowCompanyModal] = useState(false);

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
          <h5>{userData.length} users found</h5>

          <Tabs defaultActiveKey="userlist" id="user-management-tabs" className="mb-3">
            <Tab eventKey="userlist" title="User List">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>            <Button onClick={() => setShowUserModal(true)}>+ New User</Button>
</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Tag</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map(user => (
                    <tr key={user.id}>
                      <td>
                        <Button onClick={() => setSelectedUser(user)}>Edit</Button>
                      </td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.company}</td>
                      <td>{user.role}</td>
                      <td>{user.tag}</td>
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
                    <th>    <Button onClick={() => setShowCompanyModal(true)} className="mb-3 ml-auto">
                      + New Company
                    </Button>
                    </th>
                    <th>Icon</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {companyData.map(company => (
                    <tr key={company.id}>
                      <td>
                        <Button onClick={() => setSelectedCompany(company)}>Edit</Button>
                      </td>
                      <td>
                        <img src={company.icon} alt={`${company.name} Icon`} />
                      </td>
                      <td>{company.name}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>

          {selectedUser && (
            <EditUserModal
              show={selectedUser != null}
              onHide={() => setSelectedUser(null)}
              user={selectedUser}
              updateUser={updateUser}
              deleteUser={deleteUser}
              deactivateUser={deactivateUser}
            />
          )}

          {selectedCompany && (
            <EditCompanyModal
              show={selectedCompany != null}
              onHide={() => setSelectedCompany(null)}
              company={selectedCompany}
              updateCompany={updateCompany}
              deleteCompany={deleteCompany}
            />
          )}

          <NewUserModal show={showUserModal} onHide={() => setShowUserModal(false)} />
          <NewCompanyModal show={showCompanyModal} onHide={() => setShowCompanyModal(false)} />
        </Col>
      </Row>
    </Container>
  );
};

export default UserManagementPage;
