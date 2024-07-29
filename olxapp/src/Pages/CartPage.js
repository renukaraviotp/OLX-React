import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleBuyNow = (product) => {
    // Redirect to checkout page or handle purchase
    console.log('Buying now:', product);
    navigate('/checkout', { state: { product } });
  };

  const handleBuyAllNow = () => {
    // Redirect to checkout page or handle purchase for all items
    console.log('Buying all now:', cart);
    navigate('/checkout', { state: { products: cart } });
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((product, index) => (
            <div key={index} className="cart-item">
              <img src={product.images} alt={product.name} />
              <div className="cart-item-details">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>${product.price}</p>
                <button onClick={() => removeFromCart(product.id)}>Remove</button>
                <button onClick={() => handleBuyNow(product)}>Buy Now</button>
              </div>
            </div>
          ))}
          <button onClick={clearCart}>Clear Cart</button>
          <button onClick={handleBuyAllNow}>Buy All Now</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartPage;
