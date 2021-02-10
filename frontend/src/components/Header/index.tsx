import React from 'react';
import Navbar from 'react-bootstrap/esm/Navbar';

import Logo from '../../assets/business-target-checklist.svg';

const Header: React.FC = () => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="">
          <img
            src={Logo}
            width="60"
            height="60"
            className="d-inline-block"
            alt="logo"
          />{' '}
          Job Matching System
        </Navbar.Brand>
      </Navbar>
    </>
  );
};

export default Header;
