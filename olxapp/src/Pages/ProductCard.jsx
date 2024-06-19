import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const cardStyle = {
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '16px',
        margin: '16px',
        textAlign: 'left',
        width: '300px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    };

    const imgStyle = {
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '4px 4px 0 0',
    };

    const titleStyle = {
        fontSize: '18px',
        margin: '8px 0',
    };

    const priceStyle = {
        color: '#b12704',
        fontSize: '16px',
        marginBottom: '8px',
    };

    const linkStyle = {
        display: 'inline-block',
        marginTop: '8px',
        color: '#0073bb',
        textDecoration: 'none',
    };

    return (
        <div style={cardStyle}>
            <img src={product.image} alt={product.name} style={imgStyle} />
            <h3 style={titleStyle}>{product.name}</h3>
            <p style={priceStyle}>${product.price}</p>
            <Link to={`/product/${product.id}`} style={linkStyle}>View Details</Link>
        </div>
    );
};

export default ProductCard;
