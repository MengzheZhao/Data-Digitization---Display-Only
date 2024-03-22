import React, { useEffect } from 'react';
import './OrderDetails.css';
import Texts from './Texts';
import FetchOrder from './FetchOrder';
import DisplayPO1 from './DisplayPO1';
import DisplayPackSpec1 from './DisplayPackSpec1';
import DisplayShopLayout1 from './DisplayShopLayout1';

const OrderDetails = () => {
  const [hideOutputs, setHideOutputs] = React.useState(false);
  const [displayComponent, setDisplayComponent] = React.useState(null);
  const [poName, setPoName] = React.useState('');
  const [packSpecName, setPackSpecName] = React.useState('');
  const [shopLayoutName, setShopLayoutName] = React.useState('');

  const handlePdfButton1Click = () => {
    if (poName !== 'No PDF is retrieved!') {
      setHideOutputs(true);
      setDisplayComponent(null);
    }
  };

  const handlePdfButton3Click = () => {
    if (packSpecName !== 'No PDF is retrieved!') {
      setHideOutputs(true);
      setDisplayComponent('PackSpec1');
    }
  };

  const handlePdfButton5Click = () => {
    if (shopLayoutName !== 'No PDF is retrieved!') {
      setHideOutputs(true);
      setDisplayComponent('ShopLayout1');
    }
  };

  const handleButtonClick = () => {
    // Do nothing for pdf-button2, pdf-button4, and pdf-button6
  };

  const handleBackClick = () => {
    setHideOutputs(false);
  };

  const updateButtonNames = (poName, packSpecName, shopLayoutName) => {
    setPoName(poName || 'No PDF is retrieved!');
    setPackSpecName(packSpecName || 'No PDF is retrieved!');
    setShopLayoutName(shopLayoutName || 'No PDF is retrieved!');
  };

  useEffect(() => {
    // Fetch the JSON data and update the state variables
    fetch('http://localhost:5000/get_file_paths')
      .then(response => response.json())
      .then(data => {
        const latestPoName = data.po_name || '';
        const latestPackSpecName = data.packing_sku_name || '';
        const latestShopLayoutName = data.shopping_sku_name || '';
        setPoName(latestPoName || 'No PDF is retrieved!');
        setPackSpecName(latestPackSpecName || 'No PDF is retrieved!');
        setShopLayoutName(latestShopLayoutName || 'No PDF is retrieved!');
      })
      .catch(error => {
        console.error('Error:', error);
        updateButtonNames('No PDF is retrieved!', 'No PDF is retrieved!', 'No PDF is retrieved!');
      });
  }, []); // Empty dependency array to run the effect only once on component mount

  const renderDisplayComponent = () => {
    switch (displayComponent) {
      case 'PackSpec1':
        return <DisplayPackSpec1 onBackClick={handleBackClick} />;
      case 'ShopLayout1':
        return <DisplayShopLayout1 onBackClick={handleBackClick} />;
      default:
        return <DisplayPO1 onBackClick={handleBackClick} />;
    }
  };

  return (
    <div className="order-details">
      {!hideOutputs && <div className="line"></div>}
      {!hideOutputs && <Texts />}
      {!hideOutputs && <FetchOrder updateButtonNames={updateButtonNames} />}
      {!hideOutputs && (
        <button className="pdf-button1" onClick={handlePdfButton1Click}>
          {poName}
        </button>
      )}
      {!hideOutputs && (
        <button className="pdf-button3" onClick={handlePdfButton3Click}>
          {packSpecName}
        </button>
      )}
      {!hideOutputs && (
        <button className="pdf-button5" onClick={handlePdfButton5Click}>
          {shopLayoutName}
        </button>
      )}
      {!hideOutputs && (
        <>
          <button className="pdf-button2" onClick={handleButtonClick}>
            PO2.PDF
          </button>
          <button className="pdf-button4" onClick={handleButtonClick}>
            Packing Spec 2.PDF
          </button>
          <button className="pdf-button6" onClick={handleButtonClick}>
            Shopping Layout 2.PDF
          </button>
        </>
      )}
      {hideOutputs && renderDisplayComponent()}
    </div>
  );
};

export default OrderDetails;
