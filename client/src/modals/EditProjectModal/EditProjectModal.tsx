import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import config from "../../config";
import {
  Project,
  User,
  Company,
  Role,
} from "../../problemdomain/Interface/Interface";
import {
  fetchUserData,
  fetchCompanyData,
} from "../../problemdomain/DataService/DataService";

interface EditProjectModalProps {
  show: boolean;
  handleClose: () => void;
  project: Project;
  refetchProjects: () => void;
  users: User[];
  companies: Company[];
}

const EditProjectModal: FC<EditProjectModalProps> = ({
  show,
  handleClose,
  project,
  refetchProjects,
  companies,
}) => {
  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [managerId, setManagerId] = useState("");
  const [technicianIds, setTechnicianIds] = useState<string[]>([]);
  const [viewerIds, setViewerIds] = useState<string[]>([]);
  const [companyId, setCompanyId] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const formattedStartDate = new Date(project.startDate)
    .toISOString()
    .split("T")[0];
  const formattedEndDate = new Date(project.endDate)
    .toISOString()
    .split("T")[0];

  useEffect(() => {
    if (project) {
      setName(project.name);

      if (project.startDate) {
        const formattedStartDate = new Date(project.startDate)
          .toISOString()
          .substring(0, 16);
        setStartDate(formattedStartDate);
      }

      if (project.endDate) {
        const formattedEndDate = new Date(project.endDate)
          .toISOString()
          .substring(0, 16);
        setEndDate(formattedEndDate);
      }

      setManagerId(project.manager.id);
      setTechnicianIds(project.technicians.map((technician) => technician.id));
      setViewerIds(project.viewers.map((viewer) => viewer.id));
      setCompanyId(project.company.id);
      setIsActive(!project.deleted);
      setDescription(project.description);
    }
  }, [project]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const userData = await fetchUserData();
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const PROGRESS = 0;
      const ISOStartDate = new Date(startDate).toISOString();
      const ISOEndDate = new Date(endDate).toISOString();

      await axios.put(
        `${config.backend}/api/project/${project?.id}`,
        {
          name,
          startDate: ISOStartDate,
          endDate: ISOEndDate,
          progress: PROGRESS,
          description,
          companyId,
          managerId,
          technicianIds,
          viewerIds,
        },
        { withCredentials: true }
      );
      handleClose();
      refetchProjects();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${config.backend}/api/project/${project?.id}`, {
        withCredentials: true,
      });
      handleClose();
      refetchProjects();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSelectChange = (
    e: ChangeEvent<unknown>,
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const selectedOptions = Array.from(
      (e.target as HTMLSelectElement).selectedOptions,
      (option) => option.value
    );
    setState(selectedOptions);
  };

  const handleCompanyChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setCompanyId(e.target.value);
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Project</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {project ? (
          <Form>
            <Row>
              <Col xs={12}>
                <Form.Group controlId="projectName">
                  <Form.Label>Project Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="startDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="endDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="manager">
                  <Form.Label>Manager</Form.Label>
                  <Form.Control
                    as="select"
                    value={managerId}
                    onChange={(e) => setManagerId(e.target.value)}
                  >
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="technicians">
                  <Form.Label>Technician</Form.Label>
                  <Form.Control
                    as="select"
                    multiple
                    value={technicianIds}
                    onChange={(e) =>
                      handleSelectChange(
                        e as unknown as ChangeEvent<HTMLSelectElement>,
                        setTechnicianIds
                      )
                    }
                  >
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="viewers">
                  <Form.Label>Viewer</Form.Label>
                  <Form.Control
                    as="select"
                    multiple
                    value={viewerIds}
                    onChange={(e) =>
                      handleSelectChange(
                        e as unknown as ChangeEvent<HTMLSelectElement>,
                        setViewerIds
                      )
                    }
                  >
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.firstName} {user.lastName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="company">
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    as="select"
                    value={companyId}
                    onChange={handleCompanyChange}
                  >
                    {companies.map((company) => (
                      <option key={company.id} value={company.id}>
                        {company.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="isActive">
                  <Form.Check
                    type="checkbox"
                    label="Active"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        ) : (
          <p>Loading project data...</p>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Row className="w-100">
          <Col xs={4}>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Col>
          <Col xs={8} className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleUpdate}>
              Update
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProjectModal;
