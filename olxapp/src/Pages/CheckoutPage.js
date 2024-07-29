import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product, products } = location.state;

  const handlePayment = () => {
    navigate('/dummy-payment-gateway', { state: { product, products } });
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      {product ? (
        <div>
          <h3>Product: {product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      ) : (
        <div>
          <h3>Products</h3>
          {products.map((item, index) => (
            <div key={index}>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p>${item.price}</p>
            </div>
          ))}
        </div>
      )}
      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
};

export default CheckoutPage;
