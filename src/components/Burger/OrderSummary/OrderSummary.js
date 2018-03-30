import React, {Component} from 'react';
import Adj from '../../../hoc/Adj/AdjComponent';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
  //This could be a functional component
  render (){
    const ingredientSummary = Object.keys(this.props.ingredients)
        .map(ingrKey => {
          return  (
                  <li key={ingrKey}>
                    <span
                      style={{textTransform:'capitalize'}}>{ingrKey}</span>:
                    {this.props.ingredients[ingrKey]}
                  </li>
                )
        })
      return (
        <Adj>
          <h3>Your order</h3>
          <p>A delicious burger with the following ingredients:</p>
          <ul>
            {ingredientSummary}
          </ul>
          <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
          <p>Continue to Checkout?</p>
          <Button btnType="Danger" clicked={this.props.cancelPurchase}>CANCEL</Button>
          <Button btnType="Success" clicked={this.props.continuePurchase}>CONTINUE</Button>
        </Adj>
      )
  }
}

export default OrderSummary
