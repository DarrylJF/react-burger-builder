import React, {Component} from 'react';
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }

  updatePurchaseState = (ingredients) => {
    // retrieve keys of ingredients object as string values to an array
    const sum = Object.keys(ingredients)
    // map values of each ingredient to an array
      .map(igkey => {
        return ingredients[igkey];
      })
      // reduce values of array to one value: sum + el - return 0 if not
      .reduce((sum, el) => {
        return sum + el
      }, 0);
      // update state if sum is greater than 0 returns true or false
      this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchaseState(updatedIngredients);
  }

  purchaseHandler = () => {
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice.toFixed(2),
      customer: {
        name: 'Test name',
        address: {
          street: 'Teststreet',
          postcode: '55654',
          country: 'UK'
        },
        email: 'test@firebase'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false});
      })
      .catch(error => {
        this.setState({loading: false,  purchasing: false});
      });
  }
  
  render() {
    // create copy of original state object to retain immutablity
    const disabledInfo = {
      ...this.state.ingredients
    };
    // check if disabledInfo key value is equal to zero, returns true or false
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    // disabledInfo {salad: true, meat: false, ...}

    let orderSummary = <OrderSummary
    price={this.state.totalPrice}
    ingredients={this.state.ingredients}
    purchaseCancelled={this.purchaseCancelHandler}
    purchaseContinued={this.purchaseContinueHandler}/>

    if (this.state.loading) {
      orderSummary = <Spinner/>
    }
    return (
      <Auxillary>
        <Modal show={this.state.purchasing} modalClose={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientsRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler}/>
      </Auxillary>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);
