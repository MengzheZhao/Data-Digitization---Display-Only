import React, { useState } from 'react';
import './Navigation.css';

const Navigation = ({ setDisplayOrderDetails }) => {
  const [clickedItem, setClickedItem] = useState(null);

  const handleClick = (index) => {
    setClickedItem(index);
    if (index === 3) {
      setDisplayOrderDetails(true);
    } else {
      setDisplayOrderDetails(false);
    }
  };

  const navItemClass = (index) => {
    return clickedItem === index ? 'nav-item clicked' : 'nav-item';
  };

  return (
    <div className="navigation-bar">
      <div className={navItemClass(0)} onClick={() => handleClick(0)}>
        Identity management and access management
      </div>
      <div className={navItemClass(1)} onClick={() => handleClick(1)}>
        Operators performance
      </div>
      <div className={navItemClass(2)} onClick={() => handleClick(2)}>
        Any other module
      </div>
      <div className={`nav-item ${navItemClass(3)}`} onClick={() => handleClick(3)}>
        DISPLAY ONLY
      </div>
    </div>
  );
};

export default Navigation;
