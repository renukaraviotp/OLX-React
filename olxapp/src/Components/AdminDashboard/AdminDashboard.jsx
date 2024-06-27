import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [data, setData] = useState({
    totalProducts: 0,
    totalCustomers: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get('http://localhost:8000/api/products/');
        const customersResponse = await axios.get('http://localhost:8000/api/customers/');
        const ordersResponse = await axios.get('http://localhost:8000/api/orders/');
        
        setData({
          totalProducts: productsResponse.data.length,
          totalCustomers: customersResponse.data.length,
          totalOrders: ordersResponse.data.length,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminNavbar />
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
    </div>
  );
};

export default AdminDashboard;
