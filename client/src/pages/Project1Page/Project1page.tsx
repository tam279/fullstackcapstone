import React, { useState, ChangeEvent } from 'react';
import { Button, Tabs, Tab, Table, Form } from 'react-bootstrap';
import { AiFillEdit } from 'react-icons/ai';
import './Project1Page.css';
import { Chart } from 'react-google-charts';
import SidebarProject from '../../components/SidebarProject/SidebarProject';
import CreateNewTaskModal from '../../modals/CreateNewTaskModal/CreateNewTaskModal';
import Task5Project1Modal from '../../modals/Task5Project1Modal/Task5Project1Modal';
import EditTaskModal from '../../modals/EditTaskModal/EditTaskModal';


type TabKey = 'Tasks' | 'Grantt' | 'Details' | 'User activity';

const Project1Page: React.FC = () => {

  const [editModalShow, setEditModalShow] = useState(false);
  const handleEditModalClose = () => setEditModalShow(false);
  const handleEditModalShow = () => setEditModalShow(true);


  const [key, setKey] = useState<TabKey>('Tasks');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Data for Gantt chart
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
    ['Task 1', 'Task 1 name', new Date(2023, 6, 1), new Date(2023, 6, 3), null, 100, null],
    ['Task 2', 'Task 2 name', new Date(2023, 6, 4), new Date(2023, 6, 6), null, 80, null],
    ['Task 3', 'Task 3 name', new Date(2023, 6, 7), new Date(2023, 6, 9), null, 50, null],
    ['Task 4', 'Task 4 name', new Date(2023, 6, 10), new Date(2023, 6, 12), null, 30, null],
    ['Task 5', 'Task 5 name', new Date(2023, 6, 13), new Date(2023, 6, 15), null, 0, null]
    // Add more tasks here...
  ];

  const [task5ModalShow, setTask5ModalShow] = useState(false);
  const handleTask5ModalClose = () => setTask5ModalShow(false);
  const handleTask5ModalShow = () => setTask5ModalShow(true);
  const handleTask5Click = () => {
    handleTask5ModalShow();
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
                  <th>Name</th>
                  <th>Priority</th>
                  <th>Technician</th>
                  <th>Duration</th>
                  <th>Tag</th>
                  <th>Filter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td >
                    <Button variant="link" onClick={handleEditModalShow}><AiFillEdit size={20} /></Button>
                    Task 1
                  </td>
                  <td>
                    <Form.Control as="select">
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </Form.Control>
                  </td>
                  <td>Technician 1</td>
                  <td>5 hours</td>
                  <td>Tag 1</td>
                  <td>Filter 1</td>
                </tr>

                <tr>
                  <td>
                    <Button variant="link" onClick={handleEditModalShow}><AiFillEdit size={20} /></Button>
                    Task 2</td>
                  <td>
                    <Form.Control as="select">
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </Form.Control>
                  </td>
                  <td>Technician 1</td>
                  <td>5 hours</td>
                  <td>Tag 1</td>
                  <td>Filter 1</td>
                </tr>

                <tr>
                  <td> <Button variant="link" onClick={handleEditModalShow}><AiFillEdit size={20} /></Button>
                    Task 3</td>
                  <td>
                    <Form.Control as="select">
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </Form.Control>
                  </td>
                  <td>Technician 1</td>
                  <td>5 hours</td>
                  <td>Tag 1</td>
                  <td>Filter 1</td>
                </tr>


                <tr>
                  <td>  <Button variant="link" onClick={handleEditModalShow}><AiFillEdit size={20} /></Button>
                    Task 4</td>
                  <td>
                    <Form.Control as="select">
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </Form.Control>
                  </td>
                  <td>Technician 1</td>
                  <td>5 hours</td>
                  <td>Tag 1</td>
                  <td>Filter 1</td>
                </tr>


                <tr>
                  <td onClick={handleTask5Click}> <Button variant="link" onClick={handleEditModalShow}><AiFillEdit size={20} /></Button>
                    Task 5</td>
                  <td>
                    <Form.Control as="select">
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </Form.Control>
                  </td>
                  <td>Technician 1</td>
                  <td>5 hours</td>
                  <td>Tag 1</td>
                  <td>Filter 1</td>
                </tr>                     </tbody>
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
            <Form className="mt-3">
              <Form.Group controlId="project">
                <Form.Label>Project:</Form.Label>
                <Form.Control type="text" value="Project 1" readOnly />
              </Form.Group>
              <Form.Group controlId="manager">
                <Form.Label>Manager:</Form.Label>
                <Form.Control type="text" value="John Doe" readOnly />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description:</Form.Label>
                <Form.Control as="textarea" rows={4} value="This project involves developing a custom ERP (Enterprise Resource Planning) software solution for Acme Corporation. The ERP system will integrate various business functions, including finance, human resources, supply chain management, and customer relationship management, into a single, streamlined software platform. The project will encompass the full software development life cycle, from requirements gathering and system design to development, testing, deployment, and post-implementation support." readOnly />
              </Form.Group>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date:</Form.Label>
                <Form.Control type="text" value="June 1, 2023" readOnly />
              </Form.Group>
              <Form.Group controlId="endDate">
                <Form.Label>End Date:</Form.Label>
                <Form.Control type="text" value="May 31, 2024" readOnly />
              </Form.Group>
              <Form.Group controlId="technicians">
                <Form.Label>Technicians:</Form.Label>
                <Form.Control as="select" multiple value={['jane Smith', 'Mark Johnson', 'Emily Roberts']} readOnly>
                  <option>jane Smith</option>
                  <option>Mark Johnson</option>
                  <option>Emily Roberts</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="viewers">
                <Form.Label>Viewers:</Form.Label>
                <Form.Control as="select" multiple value={['Steve', 'Aderson', 'Linda Davis']} readOnly>
                  <option>Steve</option>
                  <option>Aderson</option>
                  <option>Linda Davis</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="status">
                <Form.Label>Status:</Form.Label>
                <Form.Control as="select" defaultValue="In process" readOnly>
                  <option>In process</option>
                  <option>Pending</option>
                  <option>Completed</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="totalTasks">
                <Form.Label>Total Tasks:</Form.Label>
                <Form.Control type="text" value="26" readOnly />
              </Form.Group>
              <Form.Group controlId="completedTasks">
                <Form.Label>Completed Tasks:</Form.Label>
                <Form.Control type="text" value="11" readOnly />
              </Form.Group>
              <Button variant="primary" className="mt-3">
                Export
              </Button>
            </Form>
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
                  <tr>
                    <td>2023-06-15</td>
                    <td>14:30</td>
                    <td>User A</td>
                    <td>Performed action X</td>
                    <td>Filter 1</td>
                  </tr>
                  <tr>
                    <td>2023-06-16</td>
                    <td>09:45</td>
                    <td>User B</td>
                    <td>Viewed page Y</td>
                    <td>Filter 2</td>
                  </tr>
                  <tr>
                    <td>2023-06-17</td>
                    <td>18:20</td>
                    <td>User C</td>
                    <td>Updated record Z</td>
                    <td>Filter 3</td>
                  </tr>
                  <tr>
                    <td>2023-06-18</td>
                    <td>12:00</td>
                    <td>User D</td>
                    <td>Deleted item W</td>
                    <td>Filter 4</td>
                  </tr>
                  <tr>
                    <td>2023-06-19</td>
                    <td>16:45</td>
                    <td>User E</td>
                    <td>Created new record V</td>
                    <td>Filter 5</td>
                  </tr>
                  <tr>
                    <td>2023-06-20</td>
                    <td>10:30</td>
                    <td>User F</td>
                    <td>Performed action U</td>
                    <td>Filter 6</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </Tab>
        </Tabs>

        <CreateNewTaskModal show={show} handleClose={handleClose} />
        <Task5Project1Modal show={task5ModalShow} handleClose={handleTask5ModalClose} />
        <EditTaskModal show={editModalShow} handleClose={handleEditModalClose} />


      </div>
    </div>
  );
};


export default Project1Page;