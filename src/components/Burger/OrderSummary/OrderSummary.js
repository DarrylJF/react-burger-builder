import React, { Component } from 'react';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // This could be a functional component, doesn't have to be a class as the Modal component controls the updating of OrderSummary
  componentDidUpdate() {
    console.log('[OrderSummary] DidUpdate');
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igKey => {
      return (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
      </li>
      )
    });
  return (
    <Auxillary>
      <h3><strong>Your Order</strong></h3>
      <p>Burger contains the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price: £{this.props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout</p>
      <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
      <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
    </Auxillary>
    );
  }
};

export default OrderSummary;
