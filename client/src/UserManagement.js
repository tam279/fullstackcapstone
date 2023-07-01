import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import NewUserModal from './NewUserModal';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users');
            setUsers(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUserCreated = () => {
        fetchUsers();
    };

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Company</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.UserID}>
                            <td>{user.FirstName}</td>
                            <td>{user.LastName}</td>
                            <td>{user.Email}</td>
                            <td>{user.RoleName}</td>
                            <td>{user.CompanyName}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <NewUserModal
                show={showModal}
                onHide={() => setShowModal(false)}
                onUserCreated={handleUserCreated}
            />
            <button onClick={() => setShowModal(true)}>Add User</button>
        </>
    );
};

export default UserManagement;
