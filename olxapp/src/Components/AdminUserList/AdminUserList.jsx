import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './AdminUserList.module.css'; // Assuming you have CSS modules set up
import AdminNavbar from '../AdminNavbar/AdminNavbar';

const AdminUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/admin/users/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}` // Replace with your token management method
          }
        });
        setUsers(response.data); // Assuming response.data is an array of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <AdminNavbar />
      <h1>Registered Users</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Country</th>
            <th>State</th>
            <th>District</th>
            <th>Is Admin</th>
            <th>Is Active</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.first_name}</td>
              <td>{user.phone}</td>
              <td>{user.address}</td>
              <td>{user.country}</td>
              <td>{user.state}</td>
              <td>{user.district}</td>
              <td>{user.is_staff ? 'Yes' : 'No'}</td>
              <td>{user.is_active ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUserList;
