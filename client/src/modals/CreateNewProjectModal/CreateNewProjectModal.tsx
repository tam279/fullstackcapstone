/* The above code is a TypeScript React component that represents a modal for creating a new project.
It uses React Bootstrap components for the modal, form, and buttons. The component receives props
such as `show` (to control the visibility of the modal), `handleClose` (a function to close the
modal), `companies` (an array of company objects), and `refetchProjects` (a function to refresh the
projects after successful creation). */
import React, { FC, useState, useEffect, ChangeEvent } from "react";
import { Modal, Button, Form } from "react-bootstrap";
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

// Props type definition for the CreateNewProjectModal component
interface CreateNewProjectModalProps {
  show: boolean;
  handleClose: () => void;
  companies: CompanyInterface[];
  refetchProjects: () => void;
}

const CreateNewProjectModal: FC<CreateNewProjectModalProps> = ({
  show,
  handleClose,
  refetchProjects,
}) => {
  // Local state definitions for the form fields and fetched data
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

  // Utility function to convert a date string to full ISO string
  const toISOStringWithFullPrecision = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toISOString();
  };

  // Fetch users and companies on component mount
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

  // Handler to process form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Format the start and end date for proper server-side processing
    const formattedStartDate = toISOStringWithFullPrecision(startDate);
    const formattedEndDate = toISOStringWithFullPrecision(endDate);

    // Find the manager's user object based on the selected manager name
    const managerUser = users.find(
      (user) => `${user.firstName} ${user.lastName}` === manager
    );

    // Validate the manager selection
    if (!managerUser) {
      alert("Please select a manager before submitting");
      return;
    }

    try {
      // Make a POST request to create a new project
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

      // Close the modal and refresh the projects after successful creation
      handleClose();
      refetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  // Handler for when a company is selected
  const handleCompanyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCompanyId(e.target.value);
  };

  // Render the modal containing the project creation form
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

// Exporting the component for use in other parts of the application
export default CreateNewProjectModal;
