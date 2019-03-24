import React from 'react';
import { PropTypes } from 'prop-types';

import './NavBar.css';

const NavBar = props => <div className="navbar" />;

NavBar.propTypes = {
  linksList: PropTypes.array,
};

export default NavBar;
