import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import config from "../../config";
import {
  User as UserInterface,
  Company as CompanyInterface,
} from "../../problemdomain/Interface/Interface";

// interface EditUserModalProps {
//   show: boolean;
//   onHide: () => void;
//   user: UserInterface;
//   updateUser: (email: string, updatedUser: UserInterface) => void;
//   deleteUser: (email: string) => void;
//   fetchUsers: () => void;
//   companies: CompanyInterface[];
//   roles: Role[];
//   onUserUpdated: () => void; // Add this line
// }

// const EditUserModal: React.FC<EditUserModalProps> = ({
//   show,
//   onHide,
//   user,
//   updateUser,
//   deleteUser,
//   fetchUsers,
//   companies,
//   roles,
// }) => {
//   useEffect(() => {
//     if (user) {
//       setFirstName(user.firstName);
//       setLastName(user.lastName);
//       setCompanyId(user.companyId);
//       setPhoneNumber(user.phoneNumber);
//       setJobTitle(user.jobTitle);
//     }
//   }, [user]);

//   const [firstName, setFirstName] = useState(user.firstName);
//   const [lastName, setLastName] = useState(user.lastName);
//   const [companyId, setCompanyId] = useState(user.companyId);
//   const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
//   const [jobTitle, setJobTitle] = useState(user.jobTitle);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const updatedUser: UserInterface = {
//       ...user, // Include existing user properties
//       firstName: firstName,
//       lastName: lastName,
//       companyId: companyId,
//       phoneNumber: phoneNumber,
//       jobTitle: jobTitle,
//     };

//     try {
//       await axios.put(
//         `${config.backend}/api/updateUser/${user.email}`,
//         updatedUser
//       );
//       fetchUsers();
//       onHide();
//       onUserUpdated(); // Add this line
//     } catch (error) {
//       console.error("Error updating user", error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`${config.backend}/api/deleteUser/${user.email}`);
//       fetchUsers();
//       onHide();
//     } catch (error) {
//       console.error("Error deleting user", error);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide} size="lg">
//       <Modal.Header closeButton>
//         <Modal.Title>Edit User</Modal.Title>
//       </Modal.Header>
//       <Form onSubmit={handleSubmit}>
//         {" "}
//         {/* Here is the change */}
//         <Modal.Body>
//           <h2>Details</h2>
//           <Table striped bordered hover>
//             <tbody>
//               <tr>
//                 <td>
//                   <strong>Email:</strong>
//                 </td>
//                 <td>
//                   <Form.Control
//                     type="email"
//                     placeholder="Email"
//                     value={user.EMAIL}
//                     readOnly
//                   />
//                 </td>
//                 <td>
//                   <strong>First Name:</strong>
//                 </td>
//                 <td>
//                   <Form.Control
//                     type="text"
//                     placeholder="Please enter your first name!"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                   />
//                 </td>
//                 <td>
//                   <strong>Last Name:</strong>
//                 </td>
//                 <td>
//                   <Form.Control
//                     type="text"
//                     placeholder="Please enter your last name!"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <strong>Company:</strong>
//                 </td>
//                 <td>
//                   <Form.Control
//                     as="select"
//                     value={companyId}
//                     onChange={(e) => setCompanyId(e.target.value)}
//                   >
//                     {companies.map((comp) => (
//                       <option key={comp.COMPANYID} value={comp.COMPANYID}>
//                         {comp.COMPANYNAME}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </td>
//                 <td>
//                   <strong>Role:</strong>
//                 </td>
//                 <td>
//                   <Form.Control
//                     as="select"
//                     value={roleId}
//                     onChange={(e) => setRoleId(e.target.value)}
//                   >
//                     {roles.map((role) => (
//                       <option key={role.ROLEID} value={role.ROLEID}>
//                         {role.ROLENAME}
//                       </option>
//                     ))}
//                   </Form.Control>
//                 </td>
//               </tr>
//               <tr>
//                 <td>
//                   <strong>Phone Number:</strong>
//                 </td>
//                 <td>
//                   <Form.Control
//                     type="text"
//                     placeholder="Phone Number"
//                     value={phoneNumber}
//                     onChange={(e) => setPhoneNumber(e.target.value)}
//                   />
//                 </td>

//                 <td>
//                   <strong>User Status:</strong>
//                 </td>
//                 <td>{isDeleted ? "Active" : "Inactive"}</td>
//               </tr>
//               <tr>
//                 <td>
//                   <strong>Job Title:</strong>
//                 </td>
//                 <td colSpan={5}>
//                   <Form.Control
//                     type="text"
//                     placeholder="Job Title"
//                     value={jobTitle}
//                     onChange={(e) => setJobTitle(e.target.value)}
//                   />
//                 </td>
//               </tr>
//             </tbody>
//           </Table>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="danger" onClick={handleDelete}>
//             Delete
//           </Button>
//           <Button variant="secondary" onClick={onHide}>
//             Cancel
//           </Button>
//           <Button variant="primary" type="submit">
//             Update
//           </Button>
//         </Modal.Footer>
//       </Form>
//     </Modal>
//   );
// };

// export default EditUserModal;
// function onUserUpdated() {
//   throw new Error("Function not implemented.");
// }
