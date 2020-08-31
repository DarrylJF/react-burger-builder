import React from 'react';
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';

const BurgerBuilder = () => {
  return (
    <Auxillary>
      <Burger/>
      <div>Burger Controls</div>
    </Auxillary>
  )
}

export default BurgerBuilder;
