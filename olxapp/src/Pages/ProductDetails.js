import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products }) => {
    const { productId } = useParams();
    const product = products.find(p => p.id === parseInt(productId));

    if (!product) {
        return <h2>Product not found!</h2>;
    }

    const detailsStyle = {
        padding: '20px',
        textAlign: 'left',
    };

    const imgStyle = {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
    };

    const titleStyle = {
        fontSize: '32px',
        margin: '16px 0',
    };

    const priceStyle = {
        color: '#b12704',
        fontSize: '24px',
        marginBottom: '16px',
    };

    const descriptionStyle = {
        fontSize: '18px',
        lineHeight: '1.6',
    };

    return (
        <div style={detailsStyle}>
            <img src={product.image} alt={product.name} style={imgStyle} />
            <h2 style={titleStyle}>{product.name}</h2>
            <p style={priceStyle}>${product.price}</p>
            <p style={descriptionStyle}>{product.description}</p>
        </div>
    );
};

export default ProductDetails;
