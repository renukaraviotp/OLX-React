import React from 'react';
import { useLocation } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
  const location = useLocation();
  const { product, products } = location.state;

  return (
    <div className="order-confirmation">
      <h2>Order Confirmation</h2>
      {product ? (
        <div>
          <h3>Thank you for your purchase!</h3>
          <p>Product: {product.name}</p>
          <p>Price: ${product.price}</p>
        </div>
      ) : (
        <div>
          <h3>Thank you for your purchase!</h3>
          <h4>Items in your order:</h4>
          {products.map((item, index) => (
            <div key={index}>
              <p>{item.name} - ${item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
