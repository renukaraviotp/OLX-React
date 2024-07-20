import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import Navbar from './Components/Navbar/Navbar';
import './App.css';
import Home from './Pages/Home';
import Categories from './Pages/Categories';
import AddProduct from './Components/AddProduct/AddProduct';
import Account from './Pages/Account';
import ProductDetails from './Pages/ProductDetails';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';
import AdminUserList from './Components/AdminUserList/AdminUserList';
import CategoryAdd from './Components/CategoryAdd/CategoryAdd';
import AdminNotifications from './Components/AdminNotifications/AdminNotifications';
import ApprovedProducts from './Components/ApprovedProducts/ApprovedProducts';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/post-ad" element={<AddProduct />} />
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-customers" element={<AdminUserList />} />
            <Route path="/admin-categories" element={<CategoryAdd />} />
            <Route path="/admin-notifications" element={<AdminNotifications />} />
            <Route path="/admin/products" element={<ApprovedProducts />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
