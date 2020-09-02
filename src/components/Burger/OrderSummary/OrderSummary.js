import React from 'react';
import Auxillary from '../../../hoc/Auxillary';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(igKey => {
      return (
      <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
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
      <p>Continue to Checkout</p>
    </Auxillary>
  )
};

export default orderSummary;
