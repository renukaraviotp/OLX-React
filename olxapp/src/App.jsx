import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import Navbar from './Components/Navbar/Navbar';
import './App.css';
import Home from './Pages/Home';
import Categories from './Pages/Categories';
import PostAd from './Pages/PostAd';
import Account from './Pages/Account';
import ProductDetails from './Pages/ProductDetails';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import AdminNavbar from './Components/AdminNavbar/AdminNavbar';
import AdminUserList from './Components/AdminUserList/AdminUserList'; 
import ProductList from './Components/ProductList/ProductList'; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/post-ad" element={<PostAd />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-customers" element={<AdminUserList />} /> 
          <Route path="/admin-products" exact component={ProductList} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
