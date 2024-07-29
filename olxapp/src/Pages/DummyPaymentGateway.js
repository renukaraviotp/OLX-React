import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './DummyPaymentGateway.css';

const DummyPaymentGateway = () => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { product, products } = location.state;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({
      ...paymentDetails,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    const { cardNumber, expirationDate, cvv } = paymentDetails;

    if (!cardNumber || cardNumber.length !== 16) {
      errors.cardNumber = 'Card number must be 16 digits long.';
    }

    if (!/^\d{2}\/\d{2}$/.test(expirationDate)) {
      errors.expirationDate = 'Expiration date must be in MM/YY format.';
    }

    if (!cvv || cvv.length !== 3) {
      errors.cvv = 'CVV must be 3 digits long.';
    }

    return errors;
  };

  const handlePayment = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const success = Math.random() > 0.5; // Simulate 50% chance of success
      setPaymentStatus(success ? 'success' : 'failure');
      if (success) {
        // Redirect to order confirmation page
        navigate('/order-confirmation', { state: { product, products } });
      }
    }, 2000); // Simulate payment processing time
  };

  return (
    <div className="payment-gateway">
      <h2>Dummy Payment Gateway</h2>
      <p>Simulating online payment processing...</p>
      <div className="payment-form">
        <label>
          Card Number:
          <input
            type="text"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            maxLength="16"
          />
          {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}
        </label>
        <label>
          Expiry Date (MM/YY):
          <input
            type="text"
            name="expirationDate"
            value={paymentDetails.expirationDate}
            onChange={handleChange}
            placeholder="MM/YY"
          />
          {errors.expirationDate && <p className="error">{errors.expirationDate}</p>}
        </label>
        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={paymentDetails.cvv}
            onChange={handleChange}
            maxLength="3"
          />
          {errors.cvv && <p className="error">{errors.cvv}</p>}
        </label>
        <button onClick={handlePayment} disabled={loading}>
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
      {paymentStatus && (
        <div className={`payment-status ${paymentStatus}`}>
          {paymentStatus === 'success' ? 'Payment Successful!' : 'Payment Failed. Please try again.'}
        </div>
      )}
    </div>
  );
};

export default DummyPaymentGateway;
