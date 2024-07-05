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

  const [newCategory, setNewCategory] = useState('');
  const [newSubcategory, setNewSubcategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  const { token } = useContext(AuthContext); // Get the token from AuthContext

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchNotifications();
  }, []);

  const fetchData = async () => {
    try {
      const productsResponse = await axios.get('http://localhost:8000/api/products/', {
        headers: { Authorization: `Bearer ${token}` } // Include token
      });
      const categoriesResponse = await axios.get('http://localhost:8000/api/categories/', {
        headers: { Authorization: `Bearer ${token}` } // Include token
      });
      const subcategoriesResponse = await axios.get('http://localhost:8000/api/subcategories/', {
        headers: { Authorization: `Bearer ${token}` } // Include token
      });
      const customersResponse = await axios.get('http://localhost:8000/api/customers/', {
        headers: { Authorization: `Bearer ${token}` } // Include token
      });
      // const ordersResponse = await axios.get('http://localhost:8000/api/orders/', {
      //   headers: { Authorization: `Bearer ${token}` } // Include token
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

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories/', {
        headers: { Authorization: `Bearer ${token}` } // Include token
      });
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // const fetchNotifications = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/api/notifications/', {
  //       headers: { Authorization: `Bearer ${token}` } // Include token
  //     });
  //     setNotifications(response.data);
  //   } catch (error) {
  //     console.error("Error fetching notifications:", error);
  //   }
  // };

  const handleAddCategory = async () => {
    try {
      await axios.post('http://localhost:8000/api/categories/', { name: newCategory }, {
        headers: { Authorization: `Bearer ${token}` } // Include token
      });
      setNewCategory('');
      setMessage('Category added successfully!');
      fetchData(); // Refresh data after adding category
    } catch (error) {
      console.error("Error adding category:", error);
      setMessage('Failed to add category.');
    } finally {
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  const handleAddSubcategory = async () => {
    try {
      await axios.post('http://localhost:8000/api/subcategories/', { name: newSubcategory, category: selectedCategory }, {
        headers: { Authorization: `Bearer ${token}` } // Include token
      });
      setNewSubcategory('');
      setSelectedCategory('');
      setMessage('Subcategory added successfully!');
      fetchData(); // Refresh data after adding subcategory
    } catch (error) {
      console.error("Error adding subcategory:", error);
      setMessage('Failed to add subcategory.');
    } finally {
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  const handleApproveProduct = async (productId) => {
    try {
        await axios.patch(`http://localhost:8000/api/products/${productId}/approve/`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Product approved successfully!');
        fetchNotifications(); // Fetch notifications after approving product
        fetchData(); // Refresh data after approving product
    } catch (error) {
        console.error("Error approving product:", error);
        setMessage('Failed to approve product.');
    } finally {
        setTimeout(() => setMessage(''), 3000);
    }
};

const handleRejectProduct = async (productId) => {
    try {
        await axios.patch(`http://localhost:8000/api/products/${productId}/reject/`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setMessage('Product rejected successfully!');
        fetchNotifications(); // Fetch notifications after rejecting product
        fetchData(); // Refresh data after rejecting product
    } catch (error) {
        console.error("Error rejecting product:", error);
        setMessage('Failed to reject product.');
    } finally {
        setTimeout(() => setMessage(''), 3000);
    }
};

const fetchNotifications = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/notifications/', {
            headers: { Authorization: `Bearer ${token}` }
        });
        setNotifications(response.data);
    } catch (error) {
        console.error("Error fetching notifications:", error);
    }
};


  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <br />
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
      <br /><br />

      {/* {message && <div className="message">{message}</div>} */}

      {/* Form to add new category */}
      {/* <div className="add-category-form">
        <input
          type="text"
          placeholder="Enter new category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div> */}

      {/* Form to add new subcategory */}
      {/* <div className="add-subcategory-form">
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter new subcategory name"
          value={newSubcategory}
          onChange={(e) => setNewSubcategory(e.target.value)}
        />
        <button onClick={handleAddSubcategory}>Add Subcategory</button>
      </div> */}

      {/* Notification list */}
      <div className="notifications-list">
        <h3>Pending Product Approvals</h3>
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id}>
              {notification.message}
              <button onClick={() => handleApproveProduct(notification.product.id)}>Approve</button>
              <button onClick={() => handleRejectProduct(notification.product.id)}>Reject</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
