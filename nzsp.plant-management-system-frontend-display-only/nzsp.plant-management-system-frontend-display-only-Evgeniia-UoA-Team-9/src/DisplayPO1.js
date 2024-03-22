import React, { useState, useEffect } from 'react';
import './DisplayPO1.css';
import DisplayPackSpec1 from './DisplayPackSpec1';
import DisplayShopLayout1 from './DisplayShopLayout1';

const DisplayPO1 = ({ onBackClick }) => {
  const [showPackSpec, setShowPackSpec] = useState(false);
  const [showShopLayout, setShowShopLayout] = useState(false);
  const [poName, setPoName] = useState('');
  const [pdfSrc, setPdfSrc] = useState('');

  const handlePackSpecClick = () => {
    setShowPackSpec(true);
    setShowShopLayout(false);
  };

  const handleShopLayoutClick = () => {
    setShowPackSpec(false);
    setShowShopLayout(true);
  };

  useEffect(() => {
    fetch('http://localhost:5000/get_file_paths')
      .then(response => response.json())
      .then(data => {
        const latestPoName = data.po_name || '';
        const pdfAddress = data.po || '';
        setPoName(latestPoName);
        setPdfSrc(pdfAddress);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  if (showPackSpec) {
    return <DisplayPackSpec1 onBackClick={onBackClick} />;
  }

  if (showShopLayout) {
    return <DisplayShopLayout1 onBackClick={onBackClick} />;
  }

  return (
    <div>
      <div className="order-details line1-name">Line 1 (Mt wellington) - Production Order (PO)</div>
      <div className="pdf-menu-text1" onClick={onBackClick}>PDF Menu</div>
      <iframe src={pdfSrc} className="pdf-viewer" title="PDF Viewer" />
      <iframe src={require('./PDF files/BOM/101198133.pdf')} className="pdf-viewer" title="PDF Viewer" />
      <div className="path-text">URL: {pdfSrc}</div>
      <div className="pdf-button1-text">
        {poName}
      </div>
      <div className="pdf-pack-spec1" onClick={handlePackSpecClick}>Go to Packing Spec</div>
      <div className="pdf-shopping-layout1" onClick={handleShopLayoutClick}>Go to Shopping Layout</div>
    </div>
  );
};

export default DisplayPO1;
