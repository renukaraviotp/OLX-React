import React from 'react';
import { Link } from 'react-router-dom';
import land from './land.jpeg';
import ProductCard from './ProductCard';

const Home = () => {
    const products = [
        {
            id: 1,
            name: 'Product 1',
            price: 99.99,
            description: 'This is a great product.',
            image: 'https://via.placeholder.com/300x200',
        },
        {
            id: 2,
            name: 'Product 2',
            price: 149.99,
            description: 'This is another great product.',
            image: 'https://via.placeholder.com/300x200',
        },
        // Add more products as needed
    ];

    const imageStyle = {
        width: '100%',
        height: 'auto',
        display: 'block',
    };

    const aboutUsContainerStyle = {
        padding: '20px',
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        width: '100%',
        textAlign: 'left',
    };

    const aboutUsHeadingStyle = {
        fontSize: '50px',
        marginBottom: '10px',
        textAlign: 'center',
        // backgroundColor: '#fff',
    };
    const productHeadingStyle = {
        fontSize: '50px',
        marginBottom: '10px',
        textAlign: 'center',
        backgroundColor: '#fff',
    };

    const aboutUsTextStyle = {
        fontSize: '16px',
        color: '#666',
        lineHeight: '1.5',
        marginBottom: '10px',
    };

    const aboutUsListStyle = {
        paddingLeft: '20px',
        marginTop: '20px',
    };

    const aboutUsListItemStyle = {
        marginBottom: '10px',
    };

    const productsContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: '20px',
        backgroundColor: '#fff',
    };

    const footerStyle = {
        marginTop: '100px',
        backgroundColor: '#333',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
    };

    const footerTextStyle = {
        margin: 0,
    };

    return (
        <div>
            <div>
                <img src={land} alt="land" style={imageStyle} />
            </div>
            <div style={aboutUsContainerStyle}>
                <h2 style={aboutUsHeadingStyle}>About Us</h2>
                <p style={aboutUsTextStyle}>
                    Welcome to OLX, your number one marketplace for buying and selling anything you need. Founded in 2006, OLX has come a long way from its beginnings as a small website to become one of the leading online classifieds platforms globally.
                </p>
                <p style={aboutUsTextStyle}>
                    Our mission is to empower individuals to create economic opportunity by providing a platform where anyone can buy, sell, and discover items in their community. We strive to make the process as simple and as enjoyable as possible.
                </p>
                <p style={aboutUsTextStyle}>
                    Our core values include:
                </p>
                <ul style={aboutUsListStyle}>
                    <li style={aboutUsListItemStyle}><strong>Trust:</strong> We believe in building a trustworthy community where safety and reliability are paramount.</li>
                    <li style={aboutUsListItemStyle}><strong>Innovation:</strong> We continuously innovate to provide the best user experience.</li>
                    <li style={aboutUsListItemStyle}><strong>Community:</strong> We are committed to fostering a supportive and inclusive community for our users.</li>
                </ul>
                <p style={aboutUsTextStyle}>
                    Thank you for being part of the OLX community. We hope you enjoy using our platform as much as we enjoy offering it to you.
                </p>
            </div>
            <h2 style={productHeadingStyle}>Products</h2>
            <div style={productsContainerStyle}>
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <footer style={footerStyle}>
                <div>
                    <p style={footerTextStyle}>&copy; 2024 Created by Renuka. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
