import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PropertyMortgageActions from '../actions/propertyMortgage';
// import { Loader } from '../components';

import './BlueJayContainer.css';
import { Header } from '../components';
import ChatContainer from './ChatContainer';

class BlueJayContainer extends Component {
  componentDidMount() {
    this.props.getPropertyMortgageInfo();
  }

  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      valueRequested: 0,
      installments: 0,
      installment_amount: 0,
    };
  }

  onStepHandler = value => {
    const { step } = this.state;
    switch (step) {
      case 1:
        return this.setState({
          step: 2,
          valueRequested: value,
        });
      case 2:
        return this.setState({
          step: 3,
          installments: value.installments,
          installment_amount: value.installment_amount,
        });
      default:
        return null;
    }
  };

  render() {
    const { step } = this.state;
    return (
      <div className="bluejay">
        {this.props.utils.isFetchingMortgageInfo ? (
          <h1>Cleaning the nest for your visit...</h1>
        ) : (
          <div className="bluejay-container">
            <Header
              title={this.props.propertyMortgage.property}
              address={this.props.propertyMortgage.address}
            />
            <ChatContainer
              step={step}
              nextStepHandler={this.onStepHandler}
              propertyMortgage={this.props.propertyMortgage}
              completedBody={{
                valueRequested: this.state.valueRequested,
                installments: this.state.installments,
                installment_amount: this.state.installment_amount,
              }}
            />
          </div>
        )}
      </div>
    );
  }
}

BlueJayContainer.propTypes = {
  getPropertyMortgageInfo: PropTypes.func,
};

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPropertyMortgageInfo: PropertyMortgageActions.getPropertyMortgageInfo,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BlueJayContainer);
