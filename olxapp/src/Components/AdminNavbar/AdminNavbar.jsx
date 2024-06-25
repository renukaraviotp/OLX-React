import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="navbar-logo">
        <Link to="/admin-dashboard">Admin Dashboard</Link>
      </div>
      <div className="navbar-links">
        <ul>
          <li><Link to="/admin-dashboard">Dashboard</Link></li>
          <li><Link to="/admin-products">Manage Products</Link></li>
          <li><Link to="/admin-customers">Manage Customers</Link></li>
          <li><Link to="/admin-orders">Manage Orders</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNavbar;
