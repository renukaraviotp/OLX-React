import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-logo">
        <Link to="/admin-dashboard">Admin Dashboard</Link>
      </div>
      <ul>
        <li><Link to="/admin-dashboard">Dashboard</Link></li><br />
        <li><Link to="/admin-categories">Categories</Link></li><br />
        <li><Link to="/admin-customers">Customers</Link></li><br />
        <li><Link to="/admin-orders">Orders</Link></li><br />
        <li><Link to="/admin-notifications">Notifications</Link></li><br />
        <li><Link to="/admin/products">Products</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
