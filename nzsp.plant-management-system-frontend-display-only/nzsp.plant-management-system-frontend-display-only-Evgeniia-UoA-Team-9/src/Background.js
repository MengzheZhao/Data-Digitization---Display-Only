import React from 'react';
import backgroundImage from './images/background.png';
import './Background.css';

const Background = ({ children }) => {
  return (
    <div className="page-container">
      <div className="content-container">
        <img src={backgroundImage} alt="Background" className="background-image" />
        {children}
      </div>
    </div>
  );
};

export default Background;
