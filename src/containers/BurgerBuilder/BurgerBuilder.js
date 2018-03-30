import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from '../../axios-orders';
import Adj from '../../hoc/Adj/AdjComponent';
import Burger from '../../components/Burger/Burger';

import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';



export class BurgerBuilder extends Component {
    state = {
        purchasing:false
    }

    componentDidMount () {
      this.props.onInitIngredients()
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing:true});
        } else {
          this.props.onSetAuthRedirectPath('/checkout');
          this.props.history.push('/auth');
        }
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(ingr => {
          return ingredients[ingr];
        }).reduce((result,current) => {
          return result+=current;
        },0);
        return sum>0;
    }

    purchaseCancelHandler = () => {
      this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
      this.props.onInitPurchase()
      this.props.history.push('/checkout')
    }

    render(){
      const disabledInfo = {
        ...this.props.ings
      };
      for (let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
      let orderSummary = null;
      let burger = this.props.error ? <p>Cannot load ingredients</p> : <Spinner />;
      if (this.props.ings){
        burger = (
                    <Adj>
                      <Burger ingredients={this.props.ings}/>
                      <BuildControls
                        price={this.props.totalPrice}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}/>
                    </Adj>
                  )
        orderSummary = <OrderSummary
            ingredients={this.props.ings}
            continuePurchase={this.purchaseContinueHandler}
            cancelPurchase={this.purchaseCancelHandler}
            price={this.props.totalPrice}/>
      }

      return (
        <Adj>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
              {orderSummary}
          </Modal>
          {burger}
        </Adj>
      );
    }
}

const mapStateToProps = state => {
    return {
      ings: state.burgerBuilder.ingredients,
      totalPrice: state.burgerBuilder.totalPrice,
      error: state.burgerBuilder.error,
      isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
      onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
      onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
      onInitIngredients: () => dispatch(actions.initIngredients()),
      onInitPurchase: () => dispatch(actions.purchaseInit()),
      onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));