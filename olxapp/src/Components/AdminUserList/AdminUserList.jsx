import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import styles from './AdminUserList.module.css';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log('Token:', token); // Check if the token is present

        if (!token) {
          throw new Error('No authentication token found');
        }

        console.log('Using token:', token); // Log the token to verify it's being used

        const response = await axios.get('http://localhost:8000/api/customers/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className={styles['admin-customers-page']}>
      <AdminNavbar />
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <div className={styles['admin-customers']}>
        <h1 className='head1'> Customers</h1>
        <table className={styles['customers-table']}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Country</th>
              <th>State</th>
              <th>District</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.first_name}</td>
                <td>{customer.username}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>{customer.country}</td>
                <td>{customer.state}</td>
                <td>{customer.district}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
