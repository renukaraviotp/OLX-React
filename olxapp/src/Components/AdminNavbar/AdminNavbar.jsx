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
        <br /><br />
        <li><Link to="/admin-dashboard">Dashboard</Link></li> <br />
        <li><Link to="/admin-products"> Products</Link></li> <br />
        <li><Link to="/admin-customers"> Customers</Link></li> <br />
        <li><Link to="/admin-orders"> Orders</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
