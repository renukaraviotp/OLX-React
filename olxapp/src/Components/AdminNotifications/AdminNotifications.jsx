import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import './AdminNotifications.css';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/notifications/');
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleApproveProduct = async (productId) => {
    try {
      await axios.patch(`http://localhost:8000/api/products/${productId}/approve/`);
      setMessage('Product approved successfully!');
      fetchNotifications(); // Refresh notifications after approving product
    } catch (error) {
      console.error("Error approving product:", error);
      setMessage('Failed to approve product.');
    } finally {
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}/`);
      setMessage('Product deleted successfully!');
      fetchNotifications(); // Refresh notifications after deleting product
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage('Failed to delete product.');
    } finally {
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <div className="admin-notifications">
      <AdminNavbar />
      <br /><br /><br /><br /><br />
      {message && <div className="message">{message}</div>}
      <div className="notifications">
        <h2>New Product Listings</h2>
        {notifications.length === 0 ? (
          <p>No new notifications</p>
        ) : (
          notifications.map(notification => (
            <div key={notification.id} className="notification-item">
              <p>{notification.message}</p>
              <button onClick={() => handleApproveProduct(notification.productId)}>Approve</button>
              <button onClick={() => handleDeleteProduct(notification.productId)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;
