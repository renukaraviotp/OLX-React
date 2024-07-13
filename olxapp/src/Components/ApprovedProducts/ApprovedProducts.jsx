import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import { AuthContext } from '../../context/AuthContext';
import './ApprovedProducts.css';

const ApprovedProducts = () => {
  const [products, setProducts] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetchApprovedProducts();
  }, []);

  const fetchApprovedProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/approved-products/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching approved products:', error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/products/${productId}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Remove the deleted product from the state
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="product-list-page">
      <AdminNavbar />
      <h1>Approved Products</h1>
      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-item">
              <h3>{product.name}</h3>
              <p>Description: {product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category.name}</p>
              <p>Subcategory: {product.subcategory?.name}</p>
              {product.images && (
                <img src={product.images} alt={product.name} className="product-image" />
              )}
              <button 
                className="delete-button" 
                onClick={() => deleteProduct(product.id)}>
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No approved products found.</p>
        )}
      </div>
    </div>
  );
};

export default ApprovedProducts;
