import React, { useEffect, useState } from "react";
import { Button, Tabs, Tab, Table, Form } from "react-bootstrap";
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
import {
  User,
  Project,
  Task,
  Activity,
  Company,
} from "../../problemdomain/Interface/Interface";
import {
  fetchUserData,
  fetchCompanyData,
} from "../../problemdomain/DataService/DataService";

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
  const [status, setStatus] = useState("");
  const [key, setKey] = useState<TabKey>("Tasks");
  const [show, setShow] = useState(false);
  const [newTaskId, setNewTaskId] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);

  const handleClose = () => {
    setShow(false);
    setNewTaskId(null); // reset newTaskId state when modal is closed
  };

  const handleShow = () => setShow(true);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);

  const [updatedTask, setUpdatedTask] = useState<Task | null>(null);

  const updateTask = async (task: Task) => {
    try {
      const response = await axios.put(
        `${config.backend}/api/tasks/${task.id}`,
        task
      );
      if (response.status === 200) {
        setUpdatedTask(task);
      } else {
        console.error("Update task failed:", response);
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `${config.backend}/api/project/${projectId}/tasks`
        );
        if (projectId) {
          let filteredTasks: Task[] = response.data;
          if (updatedTask) {
            filteredTasks = filteredTasks.map((task: Task) =>
              task.id === updatedTask.id ? updatedTask : task
            );
          }
          setTasks(filteredTasks);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [projectId, updatedTask, newTaskId]);

  useEffect(() => {
    const fetchProject = async () => {
      console.log("fetchProjects is called");

      if (projectId) {
        const response = await axios.get(
          `${config.backend}/api/project/${projectId}`
        );
        setProject(response.data);
      }
    };

    fetchProject();
  }, [projectId]);

  // useEffect(() => {
  //   const fetchUserActivity = async () => {
  //     if (projectId) {
  //       const response = await axios.get(`${config.backend}/api/userActivity`);
  //       setUserActivity(response.data);
  //     }
  //   };

  //   fetchUserActivity();
  // }, [projectId]);

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
      task.id,
      task.name,
      new Date(task.startDate),
      new Date(task.endDate),
      null, // You need to provide duration here
      null, // You need to provide percent complete here
      task.dependencies ? task.dependencies.join(", ") : null,
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
    if (
      arg &&
      arg.includes("Attempting to load version '51' of Google Charts")
    ) {
      return;
    }
    originalWarn(...args);
  };
  const handleEditModalClose = () => {
    setEditModalShow(false);
    setEditTask(null); // Reset editTask state when modal is closed
  };
  const handleEditModalShow = () => setEditModalShow(true);

  return (
    <div className="project1-container">
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
                    <Button variant="primary" onClick={handleShow}>
                      + New Task
                    </Button>
                  </th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Technician name</th>
                  <th>Dependency</th>
                  {/* <th>Duration</th> */}

                  <th>
                    <button>Filter</button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} onClick={() => handleTask5Click(task)}>
                    <td>
                      <Button
                        variant="link"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleEditModalShow();
                          setEditTask(task); // Set the task to be edited in the state
                        }}
                      >
                        <AiFillEdit size={20} />
                      </Button>
                      {task.name}
                    </td>
                    <td>{task.status}</td>
                    <td>
                      <Form.Control as="select">
                        <option>{task.priorityLevel}</option>
                      </Form.Control>
                    </td>
                    <td>
                      {task.technicians
                        .map((tech) => `${tech.firstName} ${tech.lastName}`)
                        .join(", ")}
                    </td>

                    {/* <td>{task.duration} hours</td> */}

                    <td>
                      {task.dependencies ? (
                        <span>{task.dependencies.join(", ")}</span>
                      ) : (
                        <span>No Dependency</span>
                      )}
                    </td>
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
                    <td>{project.name}</td>
                    <td>
                      <strong>Manager:</strong>
                    </td>
                    <td>
                      {project &&
                        project.manager &&
                        `${project.manager.firstName} ${project.manager.lastName}`}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Description:</strong>
                    </td>
                    <td colSpan={3}>{project.description}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Start Date:</strong>
                    </td>
                    <td>{new Date(project.startDate).toLocaleDateString()}</td>
                    <td>
                      <strong>End Date:</strong>
                    </td>
                    <td>{new Date(project.endDate).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Technicians:</strong>
                    </td>

                    <td>
                      {project &&
                        project.technicians
                          .map((tech) => `${tech.firstName} ${tech.lastName}`)
                          .join(", ")}
                    </td>
                    <td>
                      <strong>Viewers:</strong>
                    </td>
                    <td>
                      {project &&
                        project.viewers
                          .map(
                            (viewers) =>
                              `${viewers.firstName} ${viewers.lastName}`
                          )
                          .join(", ")}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Total Tasks:</strong>
                    </td>
                    <td>{project.tasks.length}</td>
                    <td>
                      <strong>Completed Tasks:</strong>
                    </td>
                    <td>{/* Update this line with the appropriate value */}</td>
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
          {/* <Tab eventKey="User activity" title="User activity">
            <div className="user-activity-mode">
              <h2>User Activity</h2>
              <table className="table table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>User</th>
                    <th>Detail</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Tab> */}
        </Tabs>

        {projectId && (
          <CreateNewTaskModal
            show={show}
            handleClose={handleClose}
            projectId={projectId}
          />
        )}
        {selectedTask && projectId && (
          <TaskDetailModal
            show={task5ModalShow}
            handleClose={handleTask5ModalClose}
            taskId={selectedTask.id}
            projectId={projectId}
          />
        )}

        {editTask && projectId && (
          <EditTaskModal
            handleClose={handleEditModalClose}
            task={editTask}
            projectId={projectId}
            show={editModalShow}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
