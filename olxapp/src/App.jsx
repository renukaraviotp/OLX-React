import React from 'react';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import Categories from './Pages/Categories';
import PostAd from './Pages/PostAd';
import Account from './Pages/Account';
import ProductDetails from './Pages/ProductDetails';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main> {/* Wrap the Routes with a main tag */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/post-ad" element={<PostAd />} />
          <Route path="/account" element={<Account />} />
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/product/:productId" component={ProductDetails} />
        </Routes>
      </main>
    </Router>
  );
};


export default App;
