import React from 'react';
import './FetchOrder.css';

const FetchOrder = ({ updateButtonNames }) => {
  const handleButtonClick = (buttonName) => {
    if (buttonName === 'Fetch Latest Order 1') {
      fetch('http://localhost:5000/get_file_paths')
        .then(response => response.json())
        .then(data => {
          // Handle the API response data here
          console.log(data);
          if (data.po_name) {
            updateButtonNames(data.po_name, data.packing_sku_name, data.shopping_sku_name);
          } else {
            updateButtonNames('No PDF is retrieved!', 'No PDF is retrieved!', 'No PDF is retrieved!');
          }
        })
        .catch(error => {
          // Handle any errors that occurred during the API call
          console.error('Error:', error);
          updateButtonNames('No PDF is retrieved!', 'No PDF is retrieved!', 'No PDF is retrieved!');
        });
    }
    console.log(`Clicked ${buttonName}`);
  };

  return (
    <div>
      <button className="fetch-button-1" onClick={() => handleButtonClick('Fetch Latest Order 1')}>
        Fetch Latest Order
      </button>
      <button className="fetch-button-2" onClick={() => handleButtonClick('Fetch Latest Order 2')}>
        Fetch Latest Order
      </button>
    </div>
  );
};

export default FetchOrder;
