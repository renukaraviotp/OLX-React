import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../../context/AuthContext';
import AdminNavbar from '../AdminNavbar/AdminNavbar'; 

const Navbar = () => {
  const { isAuthenticated, logout, isAdmin } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Search query:', searchQuery);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    // Force a re-render when authentication state changes
  }, [isAuthenticated, isAdmin]);

  // Render AdminSidebar if the user is an admin
  if (isAuthenticated && isAdmin) {
    return (
      <>
        <AdminNavbar />
        <nav className="navbar">
          <div className="navbar-links">
            <ul>
              <li><a href="#" onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </nav>
      </>
    );
  }

  // Render the regular navbar for all other users
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">OLX</Link>
      </div>
      <form className="navbar-search" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/categories">Categories</Link></li>
          <li><Link to="/post-ad">Sell</Link></li>
          <li><Link to="/account">My Account</Link></li>
          {isAuthenticated ? (
            <li><a href="#" onClick={handleLogout}>Logout</a></li>
          ) : (
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </div>
      <div className="hamburger" onClick={toggleNavbar}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
};

export default Navbar;
