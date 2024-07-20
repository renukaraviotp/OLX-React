import React from 'react';

const ProductCard = ({ product, handleAddToCart }) => {
  return (
    <div style={styles.productCard} key={product.id}>
      <img
        style={styles.productImage}
        src={product.image_url}
        alt={product.name}
        onError={(e) => e.target.src = '/path/to/default/image.jpg'}
      />
      <h3 style={styles.productName}>{product.name}</h3>
      <p style={styles.productPrice}>Price: ${product.price}</p>
      <p style={styles.productDescription}>{product.description}</p>
      <button
        style={styles.addToCartButton}
        onClick={() => handleAddToCart(product.id)}
      >
        Add to Cart
      </button>
    </div>
  );
};

const styles = {
  productCard: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '20px',
    width: '250px',
    height: '390px',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  productImage: {
    maxWidth: '250px',
    height: '200px',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  productName: {
    fontSize: '1.2em',
    fontWeight: 'bold',
    margin: '10px 0',
  },
  productPrice: {
    fontSize: '1em',
    color: '#555',
    margin: '5px 0',
  },
  productDescription: {
    fontSize: '0.9em',
    color: '#777',
    margin: '5px 0',
    padding: '0 10px',
  },
  addToCartButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '1em',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: 'auto',
    width: '100%',
    transition: 'background-color 0.3s ease',
  },
};

export default ProductCard;
