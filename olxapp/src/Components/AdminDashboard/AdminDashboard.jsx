import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import { AuthContext } from '../../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [data, setData] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalSubcategories: 0,
    totalCustomers: 0,
    totalOrders: 0,
  });

  const [categories, setCategories] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [approvalMessage, setApprovalMessage] = useState('');

  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchNotifications();
  }, []);
  
  const fetchData = async () => {
    try {
      const productsResponse = await axios.get('http://localhost:8000/api/products/', {
        headers: { Authorization: `Bearer ${token}` } ,
      });
      const categoriesResponse = await axios.get('http://localhost:8000/api/categories/', {
        headers: { Authorization: `Bearer ${token}` } ,
      });
      const subcategoriesResponse = await axios.get('http://localhost:8000/api/subcategories/', {
        headers: { Authorization: `Bearer ${token}` } ,
      });
      const customersResponse = await axios.get('http://localhost:8000/api/customers/', {
        headers: { Authorization: `Bearer ${token}` } ,
      });
      // const ordersResponse = await axios.get('http://localhost:8000/api/orders/', {
      //   headers: { Authorization: Bearer ${token} } // Include token
      // });

      setData({
        totalProducts: productsResponse.data.length,
        totalCategories: categoriesResponse.data.length,
        totalSubcategories: subcategoriesResponse.data.length,
        totalCustomers: customersResponse.data.length,
        // totalOrders: ordersResponse.data.length,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const productsResponse = await axios.get('http://localhost:8000/api/products/', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const categoriesResponse = await axios.get('http://localhost:8000/api/categories/', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const subcategoriesResponse = await axios.get('http://localhost:8000/api/subcategories/', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const customersResponse = await axios.get('http://localhost:8000/api/customers/', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const ordersResponse = await axios.get('http://localhost:8000/api/orders/', {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     setData({
  //       totalProducts: productsResponse.data.length,
  //       totalCategories: categoriesResponse.data.length,
  //       totalSubcategories: subcategoriesResponse.data.length,
  //       totalCustomers: customersResponse.data.length,
  //       totalOrders: ordersResponse.data.length,
  //     });
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/notifications/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // const handleAddCategory = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post('http://localhost:8000/api/categories/', { name: message }, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setCategories([...categories, response.data]);
  //     setMessage('');
  //   } catch (error) {
  //     console.error('Error adding category:', error);
  //   }
  // };

  const handleApproveProduct = async (productId) => {
    if (!productId) {
      console.error('Product ID is undefined');
      return;
    }
    try {
      const response = await axios.patch(`http://localhost:8000/api/products/${productId}/approve/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      setApprovalMessage(response.data.status || 'Product approved successfully.');
      console.log(setApprovalMessage(response.data.status || 'Product approved successfully.'));
      fetchNotifications(); // Refresh the notifications after approving the product
    } catch (error) {
      console.error(error);
      setApprovalMessage('Failed to approve product.');
    } finally {
      setTimeout(() => setApprovalMessage(''), 3000);
    }
  };

  const handleRejectProduct = async (productId) => {
    try {
      await axios.patch(`http://localhost:8000/api/products/${productId}/reject/`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotifications(); 
    } catch (error) {
      console.error('Error rejecting product:', error);
    }
  };

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <br /><br />
      <div className="dashboard-stats">
        <div className="stat-item">
          <h2>Total Products</h2>
          <p>{data.totalProducts}</p>
        </div>
        <div className="stat-item">
          <h2>Total Customers</h2>
          <p>{data.totalCustomers}</p>
        </div>
        <div className="stat-item">
          <h2>Total Orders</h2>
          <p>{data.totalOrders}</p>
        </div>
      </div>

      <div className="notifications">
        <h2>Notifications</h2>
        <ul>
          {notifications.map(notification => (
            <li key={notification.id}>
              {notification.message}
              <button onClick={() => handleApproveProduct(notification.product)}>Approve</button>
              <button onClick={() => handleRejectProduct(notification.product)}>Reject</button>
            </li>
          ))}
        </ul>
      </div>

      {/* <form onSubmit={handleAddCategory}>
        <label>
          Add New Category:
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </label>
        <button type="submit">Add Category</button>
      </form> */}
    </div>
  );
};

export default AdminDashboard;
