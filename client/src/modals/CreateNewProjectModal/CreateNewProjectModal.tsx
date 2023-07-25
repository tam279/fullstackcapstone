import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import config from "../../config";
import {
  User,
  Company as CompanyInterface,
} from "../../problemdomain/Interface/Interface";
import {
  fetchUserData,
  fetchCompanyData,
} from "../../problemdomain/DataService/DataService";

/* The `CreateNewProjectModalProps` interface defines the props that are passed to the
`CreateNewProjectModal` component. */
interface CreateNewProjectModalProps {
  show: boolean;
  handleClose: () => void;
  companies: CompanyInterface[];
  refetchProjects: () => void;
}

/* The code block is defining a functional component called `CreateNewProjectModal` that takes in props
of type `CreateNewProjectModalProps`. */
const CreateNewProjectModal: FC<CreateNewProjectModalProps> = ({
  show,
  handleClose,
  refetchProjects,
}) => {
  const [name, setName] = useState("");
  const [manager, setManager] = useState("");
  const [technicians, setTechnicians] = useState<string[]>([]);
  const [viewers, setViewers] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [companyId, setCompanyId] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [companies, setCompanies] = useState<CompanyInterface[]>([]);


  /**
   * The function converts a given date string to an ISO string with full precision.
   * @param {string} dateString - The `dateString` parameter is a string representing a date. It is
   * used to create a new `Date` object.
   * @returns The function `toISOStringWithFullPrecision` returns a string representation of the given
   * date in ISO 8601 format with full precision.
   */
  const toISOStringWithFullPrecision = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await fetchUserData();
        const companiesData = await fetchCompanyData();
        setUsers(usersData);
        setCompanies(companiesData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

 /**
  * The handleSubmit function is used to handle form submission in a TypeScript React application,
  * where it sends a POST request to create a new project with the provided data.
  * @param event - The event parameter is of type React.FormEvent<HTMLFormElement>. It represents the
  * form submission event triggered by the user.
  * @returns The function does not explicitly return anything.
  */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedStartDate = toISOStringWithFullPrecision(startDate);
    const formattedEndDate = toISOStringWithFullPrecision(endDate);

    const managerUser = users.find(
      (user) => `${user.firstName} ${user.lastName}` === manager
    );

    if (!managerUser) {
      alert("Please select a manager before submitting");
      return;
    }

    try {
      const response = await axios.post(
        `${config.backend}/api/projects`,
        {
          name,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          manager: managerUser.id,
          technicians,
          viewers,
          description,
          company: companyId,
          isDeleted,
        },
        {
          withCredentials: true,
        }
      );

      handleClose();
      refetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

/**
 * The function "handleCompanyChange" is a TypeScript function that handles the change event of a HTML
 * select element and updates the state variable "companyId" with the selected value.
 * @param e - The parameter `e` is of type `ChangeEvent<HTMLSelectElement>`. This means it is an event
 * object that is triggered when the value of a `<select>` element changes.
 */
const handleCompanyChange = (e: ChangeEvent<HTMLSelectElement>) => {
  setCompanyId(e.target.value);

  // console.log(e.target.value); // Add this line



  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Create New Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Client Company</Form.Label>
            <Form.Select value={companyId} onChange={handleCompanyChange}>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Manager</Form.Label>
            <Form.Select
              value={manager}
              onChange={(e) => setManager(e.target.value)}
            >
              <option value="">Select Manager</option>
              {users.map((user) => (
                <option
                  key={user.id}
                  value={`${user.firstName} ${user.lastName}`}
                >
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Technicians</Form.Label>
            <Form.Select
              value={technicians}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions);
                const selectedTechnicianIds = selectedOptions.map(
                  (option) => option.value
                );
                setTechnicians(selectedTechnicianIds);
              }}
              multiple
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Viewers</Form.Label>
            <Form.Select
              value={viewers}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions);
                const selectedViewerIds = selectedOptions.map(
                  (option) => option.value
                );
                setViewers(selectedViewerIds);
              }}
              multiple
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              defaultValue="Welcome 👋This project involves developing a custom ERP (Enterprise Resource Planning) software solution for Acme Corporation. The ERP system will integrate various business functions, including finance, human resources, supply chain management, and customer relationship management, into a single, streamlined software platform. The project will encompass the full software development life cycle, from requirements gathering and system design to development, testing, deployment, and post-implementation support."
            />
          </Form.Group>
          {/* <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            />
          </Form.Group> */}
          {/* 
          <Form.Group>
            <Form.Label>Is Deleted</Form.Label>
            <Form.Check
              type="checkbox"
              checked={isDeleted}
              onChange={(e) => setIsDeleted(e.target.checked)}
            />
          </Form.Group> */}
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewProjectModal;
