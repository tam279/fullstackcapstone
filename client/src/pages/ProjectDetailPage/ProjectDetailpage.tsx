import React, { useEffect, useState } from 'react';
import { Button, Tabs, Tab, Table, Form, Row, Col } from 'react-bootstrap';
import { AiFillEdit } from 'react-icons/ai';
import './ProjectDetailPage.css';
import { Chart } from 'react-google-charts';
import SidebarProject from '../../components/SidebarProject/SidebarProject';
import CreateNewTaskModal from '../../modals/CreateNewTaskModal/CreateNewTaskModal';
import TaskDetailModal from '../../modals/TaskDetailModal/TaskDetailModal';
import EditTaskModal from '../../modals/EditTaskModal/EditTaskModal';
import axios from 'axios';

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
}

interface Project {
  PROJECTID: number;
  NAME: string;
  MANAGEREMAIL: string;
  TECHNICIANS: string;
  VIEWERS: string;
  DESCRIPTION: string;
  STARTDATE: string;
  ENDDATE: string;
  STATUS: string;
  TOTAL_TASKS: number;
  COMPLETED_TASKS: number;
  PROGRESS: number;
  ISACTIVE: number;
  COMPANYID: number;
}

interface UserActivity {
  ACTIVITYID: number;
  EMAIL: string;
  TIMESTAMP: string;
  DESCRIPTION: string;
  PROJECTID: number;
}

type TabKey = 'Tasks' | 'Grantt' | 'Details' | 'User activity';

const Project1Page: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [project, setProject] = useState<Project | null>(null);
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);


  const [editModalShow, setEditModalShow] = useState(false);
  const handleEditModalClose = () => setEditModalShow(false);
  const handleEditModalShow = () => setEditModalShow(true);


  const [key, setKey] = useState<TabKey>('Tasks');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    }

    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchProject = async () => {
      // replace '1' with the project ID you need
      const projectId = '1';
      const response = await axios.get(`http://localhost:5000/api/project/${projectId}`);
      setProject(response.data);
    }

    fetchProject();
  }, []);


  useEffect(() => {
    const fetchUserActivity = async () => {
      const response = await axios.get('http://localhost:5000/api/userActivity');
      setUserActivity(response.data);
    };

    fetchUserActivity();
  }, []);
  const data = [
    [
      { type: 'string', label: 'Task ID' },
      { type: 'string', label: 'Task Name' },
      { type: 'date', label: 'Start Date' },
      { type: 'date', label: 'End Date' },
      { type: 'number', label: 'Duration' },
      { type: 'number', label: 'Percent Complete' },
      { type: 'string', label: 'Dependencies' },
    ],
    ...tasks.map(task => ([task.TASKID, task.NAME, new Date(task.STARTDATE), new Date(task.ENDDATE), null, task.PROGRESS, null])),
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
    if (arg && arg.includes('Attempting to load version \'51\' of Google Charts')) return;
    originalWarn(...args);
  };


  return (
    <div className="project1-container" style={{ padding: '0', margin: '0', width: '100vw', height: '100vh' }}>
      <div className="sidebar-container">
        <SidebarProject />
      </div>
      <div className="content-container-project1">
        <div className="header">
          <div className="title">
            <h1>Project 1</h1>
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
                  <th>          <Button variant="primary" onClick={handleShow}>+ New Task</Button> </th>
                  <th>Priority</th>
                  <th>Technician email</th>
                  <th>Duration</th>
                  <th>Tag</th>

                  <th>Filter</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.TASKID} onClick={() => handleTask5Click(task)}>
                    <td>
                      <Button variant="link" onClick={handleEditModalShow}><AiFillEdit size={20} /></Button>
                      {task.NAME}
                    </td>
                    <td>
                      <Form.Control as="select">
                        <option>{task.PRIORITY}</option>
                        {/* Add more options here if needed */}
                      </Form.Control>
                    </td>
                    <td>{task.TECHNICIAN}</td>
                    <td>{task.DURATION} hours</td>
                    <td>{task.TAG}</td>
                    <td>{task.FILTER}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Tab>
          <Tab eventKey="Grantt" title="Grantt">
            <Chart
              width={'100%'}
              chartType="Gantt"
              loader={<div>Loading Chart</div>}
              data={data}
              rootProps={{ 'data-testid': '1' }}
            />
          </Tab>
          <Tab eventKey="Details" title="Details">
            {project ? (
              <Table striped bordered hover size="sm" className="mt-3">
                <tbody>
                  <tr>
                    <td><strong>Project:</strong></td>
                    <td>{project.NAME}</td>
                    <td><strong>Manager:</strong></td>
                    <td>{project.MANAGEREMAIL}</td>
                  </tr>
                  <tr>
                    <td><strong>Description:</strong></td>
                    <td colSpan={Number(3)}>{project.DESCRIPTION}</td>
                  </tr>
                  <tr>
                    <td><strong>Start Date:</strong></td>
                    <td>{new Date(project.STARTDATE).toLocaleDateString()}</td>
                    <td><strong>End Date:</strong></td>
                    <td>{new Date(project.ENDDATE).toLocaleDateString()}</td>
                  </tr>
                  <tr>
                    <td><strong>Technicians:</strong></td>
                    <td>{project.TECHNICIANS && project.TECHNICIANS.split(',').join(", ")}</td>
                    <td><strong>Viewers:</strong></td>
                    <td>{project.VIEWERS && project.VIEWERS.split(',').join(", ")}</td>
                  </tr>
                  <tr>
                    <td><strong>Total Tasks:</strong></td>
                    <td>{project.TOTAL_TASKS}</td>
                    <td><strong>Completed Tasks:</strong></td>
                    <td>{project.COMPLETED_TASKS}</td>
                  </tr>
                  <tr>
                    <td><strong>Status:</strong></td>
                    <td>{project.STATUS}</td>
                    <td><strong></strong></td>
                    <td><Button variant="primary">Export data</Button></td>
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
                    <th><button>Filter</button></th>
                  </tr>
                </thead>
                <tbody>
                  {userActivity.map((activity) => (
                    <tr key={activity.ACTIVITYID}>
                      <td>{new Date(activity.TIMESTAMP).toLocaleDateString()}</td>
                      <td>{new Date(activity.TIMESTAMP).toLocaleTimeString()}</td>
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

        <CreateNewTaskModal show={show} handleClose={handleClose} />
        {selectedTask && <TaskDetailModal show={task5ModalShow} handleClose={handleTask5ModalClose} taskId={selectedTask.TASKID} />}
        <EditTaskModal show={editModalShow} handleClose={handleEditModalClose} />


      </div>
    </div>
  );
};


export default Project1Page;