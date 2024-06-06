// pages/Home.js
import React from 'react';
import land from './land.jpeg';

const Home = () => {
    const containerStyle = {
        margin: 0,
        padding: 0,
        position: 'relative',
        width: '100%',
        height: '100vh', // Ensures the container takes the full viewport height
        display: 'flex',
        justifyContent: 'center', // Centers the image horizontally
        alignItems: 'flex-start', // Aligns the image to the top
        boxSizing: 'border-box',
      };
    
      const imageStyle = {
        maxWidth: '100%',   // Ensures the image doesn't exceed the container's width
        height: 'auto',     // Maintains aspect ratio
        display: 'block',
      };
  return (
    <div style={containerStyle}>
      <img src={land} alt="land" style={imageStyle} />
    </div>
  );
};

export default Home;

