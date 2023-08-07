import React, { useState, useEffect, useMemo } from "react";
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
import EditUserModal from "../../modals/EditUserModal/EditUserModal";
import EditCompanyModal from "../../modals/EditCompanyModal/EditCompanyModal";

const UserManagementPage = () => {
  const [userData, setUserData] = useState<User[]>([]);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [activeTab, setActiveTab] = useState<string | null>("userlist");
  const [showModal, setShowModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showEditCompanyModal, setShowEditCompanyModal] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const [userFilter, setUserFilter] = useState("");
  const [userSort, setUserSort] = useState<"asc" | "desc">("asc");

  const [companyFilter, setCompanyFilter] = useState("");
  const [companySort, setCompanySort] = useState<"asc" | "desc">("asc");

  const filterAndSortUsers = (users: User[]) => {
    return users
      .filter((user) =>
        user.email.toLowerCase().includes(userFilter.toLowerCase())
      )
      .sort((a, b) => {
        if (a.email < b.email) {
          return userSort === "asc" ? -1 : 1;
        } else if (a.email > b.email) {
          return userSort === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      });
  };

  const filterAndSortCompanies = (companies: Company[]) => {
    return companies
      .filter((company) =>
        company.name.toLowerCase().includes(companyFilter.toLowerCase())
      )
      .filter((company) => !company.deleted) // This line filters out the deleted companies
      .sort((a, b) => {
        if (a.name < b.name) {
          return companySort === "asc" ? -1 : 1;
        } else if (a.name > b.name) {
          return companySort === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      });
  };

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
    setEditingUser(user);
    setShowEditUserModal(true);
  };

  const handleCloseEditUserModal = () => {
    setEditingUser(null);
    setShowEditUserModal(false);
  };

  const handleShowEditCompanyModal = (company: Company) => {
    setEditingCompany(company);
    setShowEditCompanyModal(true);
  };

  const handleCloseEditCompanyModal = () => {
    setEditingCompany(null);
    setShowEditCompanyModal(false);
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={1} md={1} lg={2} className="p-0 vh-100">
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
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Filter
                </InputGroup.Text>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => setUserFilter(e.target.value)}
                />
                <InputGroup.Text id="inputGroup-sizing-default">
                  Sort
                </InputGroup.Text>
                <select
                  onChange={(e) =>
                    setUserSort(e.target.value as "asc" | "desc")
                  }
                  value={userSort}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </InputGroup>

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
                    <th>Is deleted</th>
                    <th>Tags</th>
                  </tr>
                </thead>
                <tbody>
                  {filterAndSortUsers(userData)
                    .filter((user) => !user.deleted)
                    .map((user, index) => (
                      <tr key={user.id}>
                        <td>
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
                        <td>{user.tags}</td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Tab>

            <Tab eventKey="companies" title="Companies">
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <InputGroup.Text id="inputGroup-sizing-default">
                    Filter
                  </InputGroup.Text>
                </InputGroup.Text>
                <FormControl
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  onChange={(e) => setCompanyFilter(e.target.value)}
                />
                <InputGroup.Text>
                  <InputGroup.Text id="inputGroup-sizing-default">
                    Sort
                  </InputGroup.Text>
                </InputGroup.Text>
                <select
                  onChange={(e) =>
                    setCompanySort(e.target.value as "asc" | "desc")
                  }
                  value={companySort}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </InputGroup>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Edit</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Website</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filterAndSortCompanies(companies).map((company, index) => (
                    <tr key={company.id}>
                      <td>
                        <Button
                          variant="link"
                          onClick={() => handleShowEditCompanyModal(company)}
                        >
                          Edit
                        </Button>{" "}
                      </td>
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
      {editingUser && (
        <EditUserModal
          show={showEditUserModal}
          onHide={handleCloseEditUserModal}
          user={editingUser}
          onUserUpdated={fetchAndSetUserData}
          updateUser={function (email: string, updatedUser: User): void {
            throw new Error("Function not implemented.");
          }}
          deleteUser={function (email: string): void {
            throw new Error("Function not implemented.");
          }}
          fetchUsers={fetchAndSetUserData}
          companies={companies}
          roles={[]}
        />
      )}

      {editingCompany && (
        <EditCompanyModal
          show={showEditCompanyModal}
          onHide={handleCloseEditCompanyModal}
          company={editingCompany}
          fetchCompanies={fetchAndSetCompanyData}
        />
      )}
    </Container>
  );
};

export default UserManagementPage;
