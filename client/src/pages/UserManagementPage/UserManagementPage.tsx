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
import SidebarProject from "../../components/SidebarProject/SidebarProject";
import NewUserModal from "../../modals/CreateNewUserModal/CreateNewUserModal";
import NewCompanyModal from "../../modals/CreateNewCompanyModal/CreateNewCompanyModal";
import { User, Company } from "../../problemdomain/Interface/Interface";
import {
  fetchUserData,
  fetchCompanyData,
} from "../../problemdomain/DataService/DataService";
// import EditUserModal from "../../modals/EditUserModal/EditUserModal";

const UserManagementPage = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>("userlist");
  const [showModal, setShowModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false); // to control EditUserModal visibility
  const [editingUser, setEditingUser] = useState<User | null>(null); // to hold the user that is being edited

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const fetchAndSetUserData = async () => {
    try {
      const newUserData = await fetchUserData();
      setUserData(newUserData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAndSetCompanyData = async () => {
    try {
      const newCompanyData = await fetchCompanyData();
      setCompanies(newCompanyData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, companyData] = await Promise.all([
          fetchUserData(),
          fetchCompanyData(),
        ]);
        setUserData(userData);
        setCompanies(companyData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);
  const handleShowEditUserModal = (user: User) => {
    setEditingUser(user); // set the user that is being edited
    setShowEditUserModal(true); // show the EditUserModal
  };

  const handleCloseEditUserModal = () => {
    setEditingUser(null); // reset the user that is being edited
    setShowEditUserModal(false); // hide the EditUserModal
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
            <Button onClick={handleShowModal}>
              {activeTab === "userlist" ? "+ New User" : "+ New Company"}
            </Button>
          </div>
          <Tabs
            defaultActiveKey="userlist"
            id="user-management-tabs"
            className="mb-3"
            onSelect={(k) => k !== null && setActiveTab(k)}
          >
            <Tab eventKey="userlist" title="User List">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Edit</th>
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
                      <td>
                        {" "}
                        <Button
                          variant="link"
                          onClick={() => handleShowEditUserModal(user)}
                        >
                          Edit
                        </Button>{" "}
                      </td>
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
                  {companies.map((company) => (
                    <tr key={company.id}>
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
      {activeTab === "userlist" ? (
        <NewUserModal
          show={showModal}
          onHide={handleCloseModal}
          onUserCreated={fetchAndSetUserData}
        />
      ) : (
        <NewCompanyModal
          show={showModal}
          onHide={handleCloseModal}
          onSuccess={fetchAndSetCompanyData}
        />
      )}

      {/* {editingUser && (
        <EditUserModal
          show={showEditUserModal}
          onHide={handleCloseEditUserModal}
          user={editingUser}
          onUserUpdated={fetchAndSetUserData}
        />
      )} */}
    </Container>
  );
};

export default UserManagementPage;
