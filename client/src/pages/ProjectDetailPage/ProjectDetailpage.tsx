import React, { useEffect, useState } from "react";
import { Button, Tabs, Tab, Table, Form, Row, Col } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import "./ProjectDetailPage.css";
import { Chart } from "react-google-charts";
import SidebarProject from "../../components/SidebarProject/SidebarProject";
import CreateNewTaskModal from "../../modals/CreateNewTaskModal/CreateNewTaskModal";
import TaskDetailModal from "../../modals/TaskDetailModal/TaskDetailModal";
import EditTaskModal from "../../modals/EditTaskModal/EditTaskModal";
import axios from "axios";
import { useParams } from "react-router-dom";
import config from "../../config";

interface Task {
  TASKID: number;
  NAME: string;
  STARTDATE: string;
  ENDDATE: string;
  PROGRESS: number;
  DESCRIPTION: string;
  STATUS: string;
  PRIORITY: string;
  ISACTIVE: number;
  PROJECTID: number;
  DURATION: number;
  TECHNICIAN: string;
  TAG: string;
  FILTER: string;
  TECHNICIAN_NAMES: string;
}
interface Manager {
  FIRSTNAME: string;
  LASTNAME: string;
}

interface Technician {
  FIRSTNAME: string;
  LASTNAME: string;
}

interface Viewer {
  FIRSTNAME: string;
  LASTNAME: string;
}

interface Project {
  PROJECTID: number;
  NAME: string;
  DESCRIPTION: string;
  STARTDATE: string;
  ENDDATE: string;
  STATUS: string;
  ISACTIVE: number;
  COMPANYID: number;
  manager: any[];
  technicians: any[];
  viewers: any[];
  total_tasks: number;
  completed_tasks: number;
}

interface UserActivity {
  ACTIVITYID: number;
  EMAIL: string;
  TIMESTAMP: string;
  DESCRIPTION: string;
  PROJECTID: number;
}

type TabKey = "Tasks" | "Grantt" | "Details" | "User activity";

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const [editModalShow, setEditModalShow] = useState(false);
  const handleEditModalClose = () => setEditModalShow(false);
  const handleEditModalShow = () => setEditModalShow(true);

  const [status, setStatus] = useState("");

  const [key, setKey] = useState<TabKey>("Tasks");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${config.backend}/api/tasks`);
        console.log("Tasks Response:", response.data);

        if (projectId) {
          const filteredTasks = response.data.filter(
            (task: Task) => task.PROJECTID === Number(projectId)
          );
          setTasks(filteredTasks);
        } else {
          setTasks(response.data);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    // Fetch tasks initially
    fetchTasks();

    // Fetch tasks periodically every 5 seconds (adjust the interval as needed)
    const intervalId = setInterval(fetchTasks, 5000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [projectId]);

  useEffect(() => {
    const fetchProject = async () => {
      const response = await axios.get(
        `${config.backend}/api/project/${projectId}`
      );
      setProject(response.data);
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const fetchUserActivity = async () => {
      const response = await axios.get(`${config.backend}/api/userActivity`);
      const filteredActivity = response.data.filter(
        (activity: UserActivity) =>
          activity.PROJECTID === parseInt(projectId || "", 10)
      );
      setUserActivity(filteredActivity);
    };

    fetchUserActivity();
  }, [projectId]);

  const data = [
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ],
    ...tasks.map((task) => [
      task.TASKID,
      task.NAME,
      new Date(task.STARTDATE),
      new Date(task.ENDDATE),
      null,
      task.PROGRESS,
      null,
    ]),
  ];

  const [task5ModalShow, setTask5ModalShow] = useState(false);
  const handleTask5ModalClose = () => setTask5ModalShow(false);
  const handleTask5ModalShow = () => setTask5ModalShow(true);
  const handleTask5Click = (task: Task) => {
    setSelectedTask(task);
    handleTask5ModalShow();
  };

  const originalWarn = console.warn;
  console.warn = function (...args) {
    const arg = args && args[0];
    if (arg && arg.includes("Attempting to load version '51' of Google Charts"))
      return;
    originalWarn(...args);
  };

  console.log("Tasks:", tasks);
  console.log("Project:", project);
  console.log("User Activity:", userActivity);

  return (
    <div
      className="project1-container"
      style={{ padding: "0", margin: "0", width: "100vw", height: "100vh" }}
    >
      <div className="sidebar-container">
        <SidebarProject />
      </div>
      <div className="content-container-project1">
        <div className="header">
          <div className="title">
            <h1>Project </h1>
          </div>
        </div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k as TabKey)}
        >
          <Tab eventKey="Tasks" title="Tasks">
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>
                    {" "}
                    <Button variant="primary" onClick={handleShow}>
                      + New Task
                    </Button>{" "}
                  </th>
                  <th>Priority</th>
                  <th>Technician name</th>
                  <th>Duration</th>
                  <th>Status</th>
                  {/* <th>Tag</th> */}

                  <th>
                    <button>Filter</button>
                    {/* a reminder to add filter option here */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.TASKID} onClick={() => handleTask5Click(task)}>
                    <td>
                      <Button variant="link" onClick={handleEditModalShow}>
                        <AiFillEdit size={20} />
                      </Button>
                      {task.NAME}
                    </td>
                    <td>
                      <Form.Control as="select">
                        <option>{task.PRIORITY}</option>
                        {/* Add more options here if needed */}
                      </Form.Control>
                    </td>
                    <td>{task.TECHNICIAN_NAMES}</td>{" "}
                    {/* display the technicians' names */}
                    <td>{task.DURATION} hours</td>
                    <td>{task.STATUS}</td>
                    {/* <td>{task.TAG}</td> */}
                    {/* <td>{task.FILTER}</td> */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="Grantt" title="Grantt">
            <Chart
              width={"100%"}
              chartType="Gantt"
              loader={<div>Loading Chart</div>}
              data={data}
              rootProps={{ "data-testid": "1" }}
            />
          </Tab>
          <Tab eventKey="Details" title="Details">
            {project ? (
              <Table striped bordered hover size="sm" className="mt-3">
                <tbody>
                  <tr>
                    <td>
                      <strong>Project:</strong>
                    </td>
                    <td>{project.NAME}</td>
                    <td>
                      <strong>Manager:</strong>
                    </td>
                    <td>
                      {project &&
                        project.manager.length > 0 &&
                        `${project.manager[0].NAME}`}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Description:</strong>
                    </td>
                    <td colSpan={Number(3)}>{project.DESCRIPTION}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Start Date:</strong>
                    </td>
                    <td>{new Date(project.STARTDATE).toLocaleDateString()}</td>
                    <td>
                      <strong>End Date:</strong>
                    </td>
                    <td>{new Date(project.ENDDATE).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Technicians:</strong>
                    </td>
                    <td>
                      {project &&
                        project.technicians.map((tech) => tech.NAME).join(", ")}
                    </td>
                    <td>
                      <strong>Viewers:</strong>
                    </td>
                    <td>
                      {project &&
                        project.viewers.map((tech) => tech.NAME).join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Tasks:</strong>
                    </td>
                    <td>{project.total_tasks}</td>
                    <td>
                      <strong>Completed Tasks:</strong>
                    </td>
                    <td>{project.completed_tasks}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Status:</strong>
                    </td>
                    <td>{project.STATUS}</td>
                    <td>
                      <strong></strong>
                    </td>
                    <td>
                      <Button variant="primary">Export data</Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              <p>Loading...</p>
            )}
          </Tab>

          <Tab eventKey="User activity" title="User activity">
            <div className="user-activity-mode">
              <h2>User Activity</h2>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>User</th>
                    <th>Detail</th>
                    <th>
                      <button>Filter</button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userActivity.map((activity) => (
                    <tr key={activity.ACTIVITYID}>
                      <td>
                        {new Date(activity.TIMESTAMP).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(activity.TIMESTAMP).toLocaleTimeString()}
                      </td>
                      <td>{activity.EMAIL}</td>
                      <td>{activity.DESCRIPTION}</td>
                      <td>Filter 1</td> {/* Update this as needed */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab>
        </Tabs>

        {projectId && (
          <CreateNewTaskModal
            show={show}
            handleClose={handleClose}
            projectId={parseInt(projectId, 10)}
          />
        )}
        {selectedTask && (
          <TaskDetailModal
            show={task5ModalShow}
            handleClose={handleTask5ModalClose}
            taskId={selectedTask.TASKID}
          />
        )}
        <EditTaskModal
          show={editModalShow}
          handleClose={handleEditModalClose}
        />
      </div>
    </div>
  );
};

export default ProjectDetailPage;
