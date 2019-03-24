import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/lab/Slider';

import './Slider.css';

class SliderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || 0,
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.onChangeHandler && this.props.onChangeHandler(value);
  };

  render() {
    const { value } = this.state;

    return (
      <div className="root">
        <Typography id="label-1">
          {this.props.label}{' '}
          <b>{`${this.props.prefix || '$'}${value}${this.props.sufix ||
            ''}`}</b>
        </Typography>
        <Slider
          classes={{ container: 'slider' }}
          value={value}
          aria-labelledby="label-1"
          onChange={this.handleChange}
          min={this.props.min || 0}
          max={this.props.max || 10}
          step={this.props.step || 1}
        />
      </div>
    );
  }
}

SliderComponent.propTypes = {
  onChangeHandler: PropTypes.func,
  label: PropTypes.string,
  prefix: PropTypes.string,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

export default SliderComponent;
