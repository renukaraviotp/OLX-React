import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    setMessage(`${product.name} added to cart`);
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, message }}>
      {children}
    </CartContext.Provider>
  );
};
