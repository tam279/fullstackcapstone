import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Tabs, Tab, Table, InputGroup, FormControl } from 'react-bootstrap';
import SidebarProject from '../../components/SidebarProject/SidebarProject';
import NewUserModal from '../../modals/CreateNewUserModal/CreateNewUserModal';
import EditUserModal from '../../modals/EditUserModal/EditUserModal';
import axios from 'axios';
import NewCompanyModal from '../../modals/CreateNewCompanyModal/CreateNewCompanyModal';
import EditCompanyModal from '../../modals/EditCompanyModal/EditCompanyModal';




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
  ADDRESS: string; // Add ADDRESS field
  PHONE_NUMBER: string; // Add PHONE_NUMBER field
  WEBSITE: string; // Add WEBSITE field
  ISACTIVE: number; // Add ISACTIVE field
}


interface Role {
  ROLEID: number;
  ROLENAME: string;
  // Add other properties of a role here
}

interface LoginMethod {
  METHODID: number;
  METHODNAME: string;
  // Add other properties of a login method here
}

const UserManagementPage = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [companyData, setCompanyData] = useState<Company[]>([]);
  const [showCompanyModal, setShowCompanyModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [roleData, setRoleData] = useState<Role[]>([]);
  const [loginMethodData, setLoginMethodData] = useState<LoginMethod[]>([]);

  const [userFilter, setUserFilter] = useState("");
  const [userSort, setUserSort] = useState<"asc" | "desc">("asc");

  const [companyFilter, setCompanyFilter] = useState("");
  const [companySort, setCompanySort] = useState<"asc" | "desc">("asc");

  const filterAndSortUsers = (users: User[]) => {
    return users
      .filter(user => user.EMAIL.toLowerCase().includes(userFilter.toLowerCase()))
      .sort((a, b) => {
        if (a.EMAIL < b.EMAIL) {
          return userSort === "asc" ? -1 : 1;
        } else if (a.EMAIL > b.EMAIL) {
          return userSort === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      });
  };

  const filterAndSortCompanies = (companies: Company[]) => {
    return companies
      .filter(company => company.COMPANYNAME.toLowerCase().includes(companyFilter.toLowerCase()))
      .sort((a, b) => {
        if (a.COMPANYNAME < b.COMPANYNAME) {
          return companySort === "asc" ? -1 : 1;
        } else if (a.COMPANYNAME > b.COMPANYNAME) {
          return companySort === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      });
  };

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
    fetchLoginMethodData();
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

  const fetchLoginMethodData = () => {
    axios
      .get('http://localhost:5000/api/loginMethods')
      .then(response => {
        setLoginMethodData(response.data);
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

  const handleUpdateUser = (email: string, updatedUser: User) => {
    axios
      .put(`http://localhost:5000/api/updateUser/${email}`, updatedUser)
      .then(response => {
        console.log(response.data);
        handleHideModal(); // to close the modal
        fetchUserData(); // to refresh the user data
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };


  const handleDeleteUser = (email: string) => {
    axios
      .delete(`http://localhost:5000/api/deleteUser/${email}`)
      .then(response => {
        console.log(response.data);
        fetchUserData(); // Refresh the user data
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleActivateUser = (email: string) => {
    axios
      .put(`http://localhost:5000/api/activateUser/${email}`)
      .then(response => {
        console.log(response.data);
        fetchUserData(); // to refresh the user data
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  const handleDeactivateUser = (email: string) => {
    axios
      .put(`http://localhost:5000/api/deactivateUser/${email}`)
      .then(response => {
        console.log(response.data);
        fetchUserData(); // to refresh the user data
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const [showEditCompanyModal, setShowEditCompanyModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleEditCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setShowEditCompanyModal(true);
  };

  const handleHideCompanyModal = () => {
    setSelectedCompany(null);
    setShowEditCompanyModal(false);
  };

  const handleUpdateCompany = (COMPANYID: number, updatedCompany: any) => {
    axios
      .put(`http://localhost:5000/api/updateCompany/${COMPANYID}`, updatedCompany)
      .then(response => {
        console.log(response.data);
        handleHideCompanyModal(); // to close the modal
        fetchCompanyData(); // to refresh the company data
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  const handleDeleteCompany = (COMPANYID: number) => {
    axios
      .delete(`http://localhost:5000/api/deleteCompany/${COMPANYID}`)
      .then(response => {
        console.log(response.data);
        fetchCompanyData(); // Refresh the company data
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleActivateCompany = (companyId: number) => {
    axios
      .put(`http://localhost:5000/api/activateCompany/${companyId}`)
      .then(response => {
        console.log(response.data);
        fetchCompanyData(); // to refresh the company data
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const handleDeactivateCompany = (companyId: number) => {
    axios
      .put(`http://localhost:5000/api/deactivateCompany/${companyId}`)
      .then(response => {
        console.log(response.data);
        fetchCompanyData(); // to refresh the company data
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

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
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">Filter</InputGroup.Text>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => setUserFilter(e.target.value)}
                />
                <InputGroup.Text id="inputGroup-sizing-default">Sort</InputGroup.Text>
                <select
                  onChange={(e) => setUserSort(e.target.value as "asc" | "desc")}
                  value={userSort}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </InputGroup>
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
                  </tr>
                </thead>
                <tbody>
                  {filterAndSortUsers(userData).map((user, index) => (
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
                      <td>{user.ISACTIVE === 1 ? 'Active' : user.ISACTIVE === 0 ? 'Inactive' : 'Unknown'}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>



            <Tab eventKey="companies" title="Companies">
              <InputGroup className="mb-3">
                <InputGroup.Text >
                  <InputGroup.Text id="inputGroup-sizing-default">Filter</InputGroup.Text>
                </InputGroup.Text >
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => setCompanyFilter(e.target.value)}
                />
                <InputGroup.Text >
                  <InputGroup.Text id="inputGroup-sizing-default">Sort</InputGroup.Text>
                </InputGroup.Text >
                <select
                  onChange={(e) => setCompanySort(e.target.value as "asc" | "desc")}
                  value={companySort}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </InputGroup>
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
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Website</th>
                    <th>Company status</th> {/* New column */}
                    <th>Actions</th> {/* New column */}
                  </tr>
                </thead>
                <tbody>
                  {filterAndSortCompanies(companyData).map((company, index) => (
                    <tr key={index}>
                      <td>
                        <Button onClick={() => handleEditCompanyClick(company)}>Edit</Button>
                      </td>
                      <td>{company.COMPANYID}</td>
                      <td>{company.COMPANYNAME}</td>
                      <td>{company.ADDRESS}</td>
                      <td>{company.PHONE_NUMBER}</td>
                      <td>{company.WEBSITE}</td>
                      <td>{company.ISACTIVE === 1 ? 'Active' : company.ISACTIVE === 0 ? 'Inactive' : 'Unknown'}</td> {/* New column */}
                      <td>
                        <Button onClick={() => handleActivateCompany(company.COMPANYID)}>Activate</Button>
                        <Button variant="warning" onClick={() => handleDeactivateCompany(company.COMPANYID)}>Deactivate</Button>
                      </td> {/* New column */}
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
          loginMethods={loginMethodData}
          activateUser={handleActivateUser}
        />
      )}
      {selectedCompany && (
        <EditCompanyModal
          show={showEditCompanyModal}
          onHide={handleHideCompanyModal}
          company={selectedCompany}
          updateCompany={handleUpdateCompany}
          fetchCompanies={fetchCompanyData}
          deleteCompany={handleDeleteCompany}
        />
      )}
      <NewCompanyModal show={showCompanyModal} onHide={() => setShowCompanyModal(false)} onSuccess={fetchCompanyData} />
    </Container>
  );
};

export default UserManagementPage;
