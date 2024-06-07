// pages/Home.js
import React from 'react';
import land from './land.jpeg';

const Home = () => {
    const containerStyle = {
        margin: 0,
        marginTop:-7,
        padding: 0,
        position: 'relative',
        width: '100%',
        height: '100vh', 
        justifyContent: 'center', 
        boxSizing: 'border-box',
      };
    
      const imageStyle = {
        maxWidth: '100%',   // Ensures the image doesn't exceed the container's width
        height: 'auto',     // Maintains aspect ratio
        display: 'block',
      };
  return (
    <div style={containerStyle}> <br></br>
      <img src={land} alt="land" style={imageStyle} />
      
    </div>
  );
};

export default Home;

