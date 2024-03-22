import React from 'react';
import logo from './images/logo.png';
import Buttons from './Buttons';
import './Style.css';

const Header = () => {
  const handleLogoutClick = () => {
    // Handle logout button click event
    console.log('Logout button clicked');
    // Add your logout logic here, e.g., redirect to the logout page
  };

  const handleProfileClick = () => {
    // Handle profile button click event
    console.log('Profile button clicked');
    // Add your profile logic here, if needed
  };

  const buttons = [
    {
      label: 'Profile',
      style: {
        width: '10vw',
        height: '8vh',
        paddingLeft: '1vw',
        paddingRight: '1vw',
        paddingTop: '1vh',
        paddingBottom: '1vh',
        borderRadius: '4px',
        border: '0.5px #005EB8 solid',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#005EB8',
        fontSize: '2.5vw',
        fontFamily: 'Bariol',
        fontWeight: '700',
        position: 'fixed',
        top: '1vh',
        right: '12vw',
      },
      onClick: handleProfileClick,
    },
    {
      label: 'Logout',
      style: {
        width: '10vw',
        height: '8vh',
        paddingLeft: '1vw',
        paddingRight: '1vw',
        paddingTop: '1vh',
        paddingBottom: '1vh',
        borderRadius: '4px',
        border: '0.5px #005EB8 solid',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: '#005EB8',
        fontSize: '2.5vw',
        fontFamily: 'Bariol',
        fontWeight: '700',
        position: 'fixed',
        top: '1vh',
        right: '1vw',
      },
      onClick: handleLogoutClick,
      linkTo: '/logout', // Add the linkTo property with the '/logout' path
    },
  ];

  return (
    <div className="header">
      <img src={logo} alt="Logo" className="logo" />
      <div className="header-text">
        <span className="header-text-content">Plant management system</span>
      </div>
      <Buttons buttons={buttons} />
    </div>
  );
};

export default Header;
