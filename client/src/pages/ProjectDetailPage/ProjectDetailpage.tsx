// Importing necessary libraries and components
import React, { useEffect, useState } from "react";
import { Tabs, Tab, Table } from "react-bootstrap";
import "./ProjectDetailPage.css";
import { Chart } from "react-google-charts";
import SidebarProject from "../../components/SidebarProject/SidebarProject";
import CreateNewTaskModal from "../../modals/CreateNewTaskModal/CreateNewTaskModal";
import TaskDetailModal from "../../modals/TaskDetailModal/TaskDetailModal";
import EditTaskModal from "../../modals/EditTaskModal/EditTaskModal";
import axios from "axios";
import { useParams } from "react-router-dom";
import config from "../../config";
import { Project, Task, Status } from "../../problemdomain/Interface/Interface";
import TaskTable from "./TaskTable";

// Define type for TabKey
type TabKey = "Tasks" | "Grantt" | "Details";

const ProjectDetailPage: React.FC = () => {
  // Using React Router's useParams to get project ID from URL
  const { projectId } = useParams<{ projectId: string }>();

  // State management for the component
  const [tasks, setTasks] = useState<Task[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editModalShow, setEditModalShow] = useState(false);
  const [status, setStatus] = useState("");
  const [key, setKey] = useState<TabKey>("Tasks");
  const [show, setShow] = useState(false);
  const [createTaskModalShow, setCreateTaskModalShow] = useState(false);
  const [newTaskId, setNewTaskId] = useState<string | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [updatedTask, setUpdatedTask] = useState<Task | null>(null);

  // Handler for closing the modal
  const handleClose = () => {
    setShow(false);
    setNewTaskId(null); // reset newTaskId state when modal is closed
  };

  // Handlers for showing modals
  const handleShow = () => setCreateTaskModalShow(true);
  const handleEditModalShow = () => setEditModalShow(true);

  // Handler for closing the edit modal
  const handleEditModalClose = () => {
    setEditModalShow(false);
    setEditTask(null);
  };

  // Function to update a task
  const updateTask = async (task: Task) => {
    try {
      const response = await axios.put(
        `${config.backend}/api/project/${projectId}/task/${task.id}`,
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

  // useEffect to fetch tasks and handle task updates
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
            setUpdatedTask(null); // Reset updatedTask here
          }
          setTasks(filteredTasks);
        }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, [projectId, updatedTask, newTaskId]);

  // useEffect to fetch project details
  useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        const response = await axios.get(
          `${config.backend}/api/project/${projectId}`
        );
        setProject(response.data);
      }
    };

    fetchProject();
  }, [projectId]);

  // Helper function to calculate percentage of completed tasks
  const calculateCompletedPercentage = (tasks: Task[]): number => {
    const completedTasks = tasks.filter(
      (task) => task.status === Status.COMPLETED
    ).length;
    const totalTasks = tasks.length;

    return (completedTasks / totalTasks) * 100;
  };

  // Data preparation for Gantt chart
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
    ...tasks.map((task) => {
      console.log("task", task);
      const durationInDays =
        (new Date(task.endDate).getTime() -
          new Date(task.startDate).getTime()) /
        (1000 * 3600 * 24);
      return [
        task.id,
        task.name,
        new Date(task.startDate),
        new Date(task.endDate),
        durationInDays,
        calculateCompletedPercentage(tasks),
        console.log(task.dependencies),
      ];
    }),
  ];

  // Handlers and functions for various modals and interactions
  const [task5ModalShow, setTask5ModalShow] = useState(false);
  const handleTask5ModalClose = () => setTask5ModalShow(false);
  const handleTask5ModalShow = () => setTask5ModalShow(true);
  const handleTask5Click = (task: Task) => {
    setSelectedTask(task);
    setShow(true); // Change this line
  };

  const countCompletedTasks = (tasks: Task[]) => {
    return tasks.filter((task) => task.status === Status.COMPLETED).length;
  };

  const addNewTask = (task: Task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    setNewTaskId(task.id); // Set the new task id here
  };

  // Task table event handlers
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShow(true);
  };

  const handleEditTask = (task: Task) => {
    setEditModalShow(true);
    setEditTask(task);
  };

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
            <TaskTable
              tasks={tasks}
              handleTaskClick={handleTaskClick}
              handleEditModalShow={handleShow}
              handleEditTask={handleEditTask}
            />
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
                    <td>{countCompletedTasks(project.tasks)}</td>
                    {/* <td>
                      <Button variant="primary">Export data</Button>
                    </td> */}
                  </tr>
                </tbody>
              </Table>
            ) : (
              <p>Loading...</p>
            )}
          </Tab>
        </Tabs>
        {projectId && (
          <CreateNewTaskModal
            show={createTaskModalShow}
            handleClose={() => setCreateTaskModalShow(false)}
            projectId={projectId}
            addNewTask={addNewTask} // pass the function here
          />
        )}
        <TaskDetailModal
          show={show}
          handleClose={handleClose}
          task={selectedTask}
          projectId={projectId || ""}
          taskId={selectedTask?.id || ""}
          onTaskUpdated={(updatedTask: Task) => {
            setTasks((prevTasks) =>
              prevTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
              )
            );
          }}
        />

        {editTask && (
          <EditTaskModal
            show={editModalShow}
            handleClose={handleEditModalClose}
            task={editTask}
            projectId={projectId || ""}
            onTaskUpdated={(updatedTask) => {
              updateTask(updatedTask);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectDetailPage;
