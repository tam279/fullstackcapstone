import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Table,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";
import config from "../../config";
import SidebarProject from "../../components/SidebarProject/SidebarProject";
import NewUserModal from "../../modals/CreateNewUserModal/CreateNewUserModal";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: Company;
  role: string;
  phoneNumber: string;
  jobTitle: string;
  deleted: any;
}

interface Company {
  name: string;
  address: string;
  phoneNumber: string;
  website: string;
  deleted: boolean;
}

const UserManagementPage = () => {
  // Handle show the list of users
  const [userData, setUserData] = useState<User[]>([]);
  const [showNewUserModal, setShowNewUserModal] = useState(false);
  const handleShowNewUserModal = () => setShowNewUserModal(true);
  const handleCloseNewUserModal = () => setShowNewUserModal(false);
  const fetchUserData = () => {
    axios
      .get(`${config.backend}/api/users`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  // Handle showing the list of companies:
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  const fetchCompanyData = async () => {
    try {
      const response = await axios.get(`${config.backend}/api/companies`);
      setCompanies(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Container>
      <Row>
        <Col xs={3} md={2} lg={2} className="p-0 offset-lg-0">
          <SidebarProject />
        </Col>

        <Col xs={9} md={10} lg={10}>
          <div className="d-flex align-items-center justify-content-between my-3">
            <h1>User Management</h1>
            <Button onClick={handleShowNewUserModal}>+ New User</Button>
          </div>
          <Tabs
            defaultActiveKey="userlist"
            id="user-management-tabs"
            className="mb-3"
          >
            <Tab eventKey="userlist" title="User List">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Phone Number</th>
                    <th>Job Title</th>
                    <th>User status</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user) => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.company.name}</td>
                      <td>{user.role}</td>
                      <td>{user.phoneNumber}</td>
                      <td>{user.jobTitle}</td>
                      <td>{user.deleted ? "True" : "False"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>

            <Tab eventKey="companies" title="Companies">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Website</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {companies.map((company, index) => (
                    <tr key={index}>
                      <td>{company.name}</td>
                      <td>{company.address}</td>
                      <td>{company.phoneNumber}</td>
                      <td>{company.website}</td>
                      <td>{company.deleted ? "Deleted" : "Active"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <NewUserModal
        show={showNewUserModal}
        onHide={handleCloseNewUserModal}
        onUserCreated={fetchUserData}
      />
    </Container>
  );
};

export default UserManagementPage;
