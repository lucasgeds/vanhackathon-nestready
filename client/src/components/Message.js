import React from 'react';
import { PropTypes } from 'prop-types';
import { BLUEJAY } from '../constants/utils';

import './Message.css';

const Message = props => (
  <div
    className={`message ${props.from === BLUEJAY && 'message-from-bluejay'}`}
  >
    {props.message}
  </div>
);

Message.propTypes = {
  from: PropTypes.string,
  message: PropTypes.string,
};

export default Message;
