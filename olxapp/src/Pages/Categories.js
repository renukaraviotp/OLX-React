import React from 'react';
import Arrow from './Arrow';

import './Categories.css';

function Banner() {
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
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
            <Arrow></Arrow> 
          </div>
          <div className="otherQuickOptions">
            <span>Cars</span>
            <span>Motorcy...</span>
            <span>Mobile Ph...</span>
            <span>For Sale:Houses & Apart...</span>
            <span>Scoot...</span>
            <span>Commercial & Other Ve...</span>
            <span>For Rent: House & Apart...</span>
          </div>
        </div>
        <div className="banner">
          <img
            src="../../../Images/banner copy.png"
            alt=""
          />
        </div>
      </div><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <footer style={footerStyle}>
                <div>
                    <p style={footerTextStyle}>&copy; 2024 Created by Renuka. All rights reserved.</p>
                </div>
      </footer>
      
    </div>
  );
}

export default Banner;
