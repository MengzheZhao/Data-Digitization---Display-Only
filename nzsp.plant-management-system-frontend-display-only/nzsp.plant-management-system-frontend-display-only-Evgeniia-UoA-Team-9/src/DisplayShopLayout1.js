import React, { useState, useEffect } from 'react';
import './DisplayShopLayout1.css';
import DisplayPO1 from './DisplayPO1';
import DisplayPackSpec1 from './DisplayPackSpec1';

const DisplayShopLayout1 = ({ onBackClick }) => {
  const [showProductionOrder, setShowProductionOrder] = useState(false);
  const [showPackingSpec, setShowPackingSpec] = useState(false);
  const [shoppingSkuName, setShoppingSkuName] = useState('');
  const [shoppingSkuUrl, setShoppingSkuUrl] = useState('');

  const handleProductionOrderClick = () => {
    setShowProductionOrder(true);
  };

  const handlePackingSpecClick = () => {
    setShowPackingSpec(true);
  };

  useEffect(() => {
    fetch('http://localhost:5000/get_file_paths')
      .then(response => response.json())
      .then(data => {
        const latestShoppingSkuName = data.shopping_sku_name || '';
        const latestShoppingSkuUrl = data.shopping_sku || '';
        setShoppingSkuName(latestShoppingSkuName);
        setShoppingSkuUrl(latestShoppingSkuUrl);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  if (showProductionOrder) {
    return <DisplayPO1 />;
  }

  if (showPackingSpec) {
    return <DisplayPackSpec1 />;
  }

  return (
    <div>
      <div className="order-details line1-name">Line 1 (Mt wellington) - Shopping Layout</div>
      <div className="pdf-menu-text3" onClick={onBackClick}>PDF Menu</div>
      <iframe src={require('./PDF files/Transit Hall Shopping layout/Shopping Layout 000000 Something+1 FGS 11.14.pdf')} className="pdf-viewer" title="PDF Viewer" />
      <div className="pdf-button5-text">
        {shoppingSkuName}
      </div>
      <div className="path-shop-sku-text">URL: {shoppingSkuUrl}</div>
      <div className="pdf-production-order1" onClick={handleProductionOrderClick}>Go to Production Order</div>
      <div className="pdf-pack-spec11" onClick={handlePackingSpecClick}>Go to Packing Spec</div> 
    </div>
  );
};

export default DisplayShopLayout1;
