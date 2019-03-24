import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import * as PropertyMortgageActions from '../actions/propertyMortgage';
// import { Loader } from '../components';

import './ChatContainer.css';
import { BLUEJAY } from '../constants/utils';
import { Message, Button, Slider } from '../components';

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: this.props.step,
      writing: true,
      chatMessages: [],
      request: {},
      showSliderStepOne: false,
    };
  }

  componentDidMount() {
    this.sendStepMessage();
  }

  sendMessage = (from, message) => {
    // console.log(this.state.chatMessages);
    const actualChat = this.state.chatMessages.concat();
    if (from === BLUEJAY) {
      this.setState({ writing: true }, () => {
        setTimeout(() => {
          this.setState({ writing: false }, () => {
            actualChat.push({ from, message });
            this.setState({
              chatMessages: actualChat,
            });
          });
        }, 500);
      });
    } else {
      actualChat.push({ from, message });
      this.setState({
        chatMessages: actualChat,
      });
    }
  };

  stepHandler = (e, step) => {
    e.preventDefault();
    const target = e.target;
    const value = target.getAttribute('data-value');
    const label = target.innerHTML;
    switch (step) {
      case 1:
        this.sendMessage(this.props.propertyMortgage.borrower, label);
        this.props.nextStepHandler && this.props.nextStepHandler(value);
        setTimeout(() => this.sendStepMessage(2), 0);
        return null;
      case 2:
        return null;
      default:
        return null;
    }
  };

  stepOneSliderHandler = (e, value) => {
    e.preventDefault();
    this.sendMessage(this.props.propertyMortgage.borrower, `$ ${value}.00`);
    this.props.nextStepHandler && this.props.nextStepHandler(value);
  };

  renderStepOptions = step => {
    switch (step) {
      case 1:
        return this.renderStepOne();
      case 2:
        return this.renderStepTwo();
      default:
        return null;
    }
  };

  renderStepOne = () => {
    const { showSliderStepOne } = this.state;
    let value = 0;
    return (
      <Fragment>
        <Button onClickHandler={e => this.stepHandler(e, 1)} value="25000">
          $ 25000.00
        </Button>
        <Button onClickHandler={e => this.stepHandler(e, 1)} value="50000">
          $ 50000.00
        </Button>
        {!showSliderStepOne ? (
          <Button
            onClickHandler={e => this.setState({ showSliderStepOne: true })}
            value=""
          >
            Other Value
          </Button>
        ) : (
          <div className="slider-with-button">
            <Slider
              label="How much do you need:"
              value={value}
              sufix={'.00'}
              min={0}
              max={10}
              onChangeHandler={newValue => (value = newValue)}
            />
            <Button
              onClickHandler={e => this.stepOneSliderHandler(e, value)}
              value=""
              type="cta"
            >
              Confirm
            </Button>
          </div>
        )}
      </Fragment>
    );
  };

  renderStepTwo = () => {
    let installmentValue = 0;
    let numberInstallments = 0;

    // Logic for installments value x number

    return (
      <Fragment>
        <Slider
          label="Installment value:"
          value={installmentValue}
          sufix={'.00'}
          min={0}
          max={10}
          step={2}
          onChangeHandler={newValue => (installmentValue = newValue)}
        />
        <Slider
          label="Number of installments:"
          value={numberInstallments}
          prefix={'x'}
          min={0}
          max={10}
          onChangeHandler={newValue => (numberInstallments = newValue)}
        />
        <Button onClickHandler={e => console.log(e)} value="" type="cta">
          Confirm
        </Button>
      </Fragment>
    );
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.step !== prevState.step) {
      return {
        step: nextProps.step,
      };
    }
    return null;
  }

  sendStepMessage(step) {
    switch (step || this.state.step) {
      case 1:
        return this.sendMessage(
          BLUEJAY,
          `Hi ${
            this.props.propertyMortgage.borrower
          }! How much money do you need?`,
        );
      case 2:
        return this.sendMessage(
          BLUEJAY,
          'What fits better for you? Ajust if you whant to pay more each month or pay less  for more months...',
        );
      default:
        return null;
    }
  }

  render() {
    console.log(this.state.step);
    return (
      <div className="chatContainer">
        <div className="chat">
          {this.state.chatMessages.map((message, index) => (
            <Message
              key={index}
              from={message.from}
              message={message.message}
            />
          ))}
        </div>
        {!this.state.writing && (
          <div className="step-options">
            {this.renderStepOptions(this.props.step)}
          </div>
        )}
      </div>
    );
  }
}

ChatContainer.propTypes = {
  propertyMortgage: PropTypes.object,
  postPropertyMortgageChange: PropTypes.func,
  step: PropTypes.number,
  nextStepHandler: PropTypes.func,
};

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // postPropertyMortgageChange: PropertyMortgageActions.postPropertyMortgageChange,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatContainer);
