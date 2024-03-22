import React, { useState } from 'react';
import Header from './Header';
import Background from './Background';
import Navigation from './Navigation';
import OrderDetails from './OrderDetails';

const MainPage = () => {
  const [displayOrderDetails, setDisplayOrderDetails] = useState(false);

  return (
    <Background>
      <Header />
      <Navigation setDisplayOrderDetails={setDisplayOrderDetails} />
      <div className="main-content">
        {!displayOrderDetails ? (
          <div className="placeholder">Click on "DISPLAY ONLY" to see the order details</div>
        ) : (
          <OrderDetails />
        )}
      </div>
    </Background>
  );
};

export default MainPage;
