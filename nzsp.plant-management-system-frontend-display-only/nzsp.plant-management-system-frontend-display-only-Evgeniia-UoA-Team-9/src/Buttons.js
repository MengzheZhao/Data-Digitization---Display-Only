import React from 'react';

const Buttons = ({ buttons }) => {
  return (
    <div className="header-buttons">
      <div className="button-container">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="btn"
            style={button.style}
            onClick={button.linkTo ? () => { window.location.href = button.linkTo; } : button.onClick}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Buttons;
