import React from 'react';
import { PropTypes } from 'prop-types';

import './Button.css';

const Button = props => (
  <button
    className={`button ${props.type}`}
    onClick={props.onClickHandler}
    data-value={props.value}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  onClickHandler: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
