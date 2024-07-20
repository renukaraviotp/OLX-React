import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Categories.css';

const Categories = () => {
  const [approvedProducts, setApprovedProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchApprovedProducts();
  }, []);

  const fetchApprovedProducts = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/approved-products/');
      const data = await response.json();
      setApprovedProducts(data);
    } catch (error) {
      console.error('Error fetching approved products:', error);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="products">
      {approvedProducts.length > 0 ? (
        approvedProducts.map((product) => (
          <div key={product.id} className="product">
            <img src={product.images} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))
      ) : (
        <p>No approved products available</p>
      )}
    </div>
  );
};

export default Categories;
