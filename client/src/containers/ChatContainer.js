import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as PropertyMortgageActions from '../actions/propertyMortgage';
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
      propertyMortgage: this.props.propertyMortgage,
    };
  }

  componentDidMount() {
    this.sendStepMessage(1);
  }

  sendMessage = (from, message) => {
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

  stepOneHandler = (e, step) => {
    e.preventDefault();
    const target = e.target;
    const value = target.getAttribute('data-value');
    const label = target.innerHTML;
    this.sendMessage(this.props.propertyMortgage.borrower, label);
    this.props.nextStepHandler && this.props.nextStepHandler(value);
    setTimeout(() => this.sendStepMessage(2), 0);
    return null;
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
        <Button onClickHandler={e => this.stepOneHandler(e, 1)} value="25000">
          $ 25000.00
        </Button>
        <Button onClickHandler={e => this.stepOneHandler(e, 1)} value="50000">
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
    const requestedValue = this.props.completedBody.valueRequested || 0;
    let installmentValue = this.props.completedBody.valueRequested || 0;
    let numberInstallments = 1;

    // Logic for installments installmentValue x numberInstallments is missin =(

    return (
      <Fragment>
        <Slider
          label="Installment value:"
          value={installmentValue}
          sufix={'.00'}
          min={0}
          max={10}
          step={2}
          onChangeHandler={newValue => {
            numberInstallments = requestedValue / newValue;
            installmentValue = newValue;
          }}
        />
        <Slider
          label="Number of installments:"
          value={numberInstallments}
          prefix={'x'}
          min={0}
          max={10}
          onChangeHandler={newValue => {
            numberInstallments = requestedValue / newValue;
            numberInstallments = newValue;
          }}
        />
        <Button
          onClickHandler={() =>
            this.props.nextStepHandler &&
            this.props.nextStepHandler({
              installments: installmentValue,
              installment_amount: numberInstallments,
            })
          }
          value=""
          type="cta"
        >
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
    if (nextProps.propertyMortgage !== prevState.propertyMortgage) {
      return {
        propertyMortgage: nextProps.propertyMortgage,
      };
    }
    return null;
  }

  sendStepMessage = step => {
    if (this.state.propertyMortgage) {
      switch (step || this.state.step) {
        case 1:
          return this.sendMessage(
            BLUEJAY,
            `Hi Frederick! How much money do you need?`,
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
  };

  render() {
    return (
      <div className={`chatContainer ${this.state.step === 3 && 'completed'}`}>
        {this.state.step < 3 ? (
          <Fragment>
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
          </Fragment>
        ) : (
          <Fragment>
            <h1>
              You are all set!
              <br />
              Our trusted realtor will answer in 24 hours
            </h1>
            <p>Here's what you got:</p>
            <ul>
              <li>
                <b>Amount requested:</b>{' '}
                {`$ ${this.props.completedBody.valueRequested}.00`}
              </li>
              <li>
                <b>Installments details:</b>{' '}
                {`$ ${this.props.completedBody.installment_amount}.00 x ${
                  this.props.completedBody.installments
                }`}
              </li>
            </ul>
          </Fragment>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      postPropertyMortgageChange:
        PropertyMortgageActions.postPropertyMortgageChange,
    },
    dispatch,
  );

export default connect(mapDispatchToProps)(ChatContainer);
