import React, { useState, useEffect } from 'react';
import './DisplayPackSpec1.css';
import DisplayPO1 from './DisplayPO1';
import DisplayShopLayout1 from './DisplayShopLayout1';

const DisplayPackSpec1 = ({ onBackClick }) => {
  const [showProductionOrder, setShowProductionOrder] = useState(false);
  const [showShoppingLayout, setShowShoppingLayout] = useState(false);
  const [packingSkuName, setPackingSkuName] = useState('');
  const [packingSkuUrl, setPackingSkuUrl] = useState('');

  const handleProductionOrderClick = () => {
    setShowProductionOrder(true);
  };

  const handleShoppingLayoutClick = () => {
    setShowShoppingLayout(true);
  };

  useEffect(() => {
    fetch('http://localhost:5000/get_file_paths')
      .then(response => response.json())
      .then(data => {
        const latestPackingSkuName = data.packing_sku_name || '';
        const latestPackingSkuUrl = data.packing_sku || '';
        setPackingSkuName(latestPackingSkuName);
        setPackingSkuUrl(latestPackingSkuUrl);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  if (showProductionOrder) {
    return <DisplayPO1 />;
  }

  if (showShoppingLayout) {
    return <DisplayShopLayout1 />;
  }

  return (
    <div>
      <div className="order-details line1-name">Line 1 (Mt wellington) - Packing Spec</div>
      <div className="pdf-menu-text2" onClick={onBackClick}>PDF Menu</div>
      <iframe src={require('./PDF files/Packing Spec/Packing Spec 000000 Something+1 FGS 11.14.pdf')} className="pdf-viewer" title="PDF Viewer" />
      <div className="pdf-button3-text">
        {packingSkuName}
      </div>  
      <div className="path-spec-sku-text">URL: {packingSkuUrl}</div> {/* Display the packing SKU URL address as text */}
      <div className="pdf-production-order1" onClick={handleProductionOrderClick}>Go to Production Order</div>
      <div className="pdf-shopping-layout1" onClick={handleShoppingLayoutClick}>Go to Shopping Layout</div>
    </div>
  );
};

export default DisplayPackSpec1;
