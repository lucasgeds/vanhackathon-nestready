import React from 'react';
import { PropTypes } from 'prop-types';

import Logo from '../images/NestReadyLogo.svg';

import './Header.css';

const Header = props => (
  <header className="header">
    <img src={Logo} alt="NestReady" />
    <div className="header-info">
      <h1>{props.title}</h1>
      <p>{props.address}</p>
    </div>
  </header>
);

Header.propTypes = {
  title: PropTypes.string,
  address: PropTypes.string,
};

export default Header;
