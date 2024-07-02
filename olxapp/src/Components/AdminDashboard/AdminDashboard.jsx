import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
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

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  const fetchData = async () => {
    try {
      const productsResponse = await axios.get('http://localhost:8000/api/products/');
      const categoriesResponse = await axios.get('http://localhost:8000/api/categories/');
      const subcategoriesResponse = await axios.get('http://localhost:8000/api/subcategories/');
      const customersResponse = await axios.get('http://localhost:8000/api/customers/');
      const ordersResponse = await axios.get('http://localhost:8000/api/orders/');
      
      setData({
        totalProducts: productsResponse.data.length,
        totalCategories: categoriesResponse.data.length,
        totalSubcategories: subcategoriesResponse.data.length,
        totalCustomers: customersResponse.data.length,
        totalOrders: ordersResponse.data.length,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/categories/');
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      await axios.post('http://localhost:8000/api/categories/', { name: newCategory });
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
      await axios.post('http://localhost:8000/api/subcategories/', { name: newSubcategory, category: selectedCategory });
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

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
      <br /><br /><br /><br /><br />
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
      <br /><br /><br /><br />

      {message && <div className="message">{message}</div>}

      {/* Form to add new category */}
      <div className="add-category-form">
        <input
          type="text"
          placeholder="Enter new category name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      {/* Form to add new subcategory */}
      <div className="add-subcategory-form">
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
      </div>
    </div>
  );
};

export default AdminDashboard;
