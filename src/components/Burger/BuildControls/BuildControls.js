import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Bacon', type: 'bacon'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
  {label: 'Salad', type: 'salad'}
]
const buildControls = (props) => (
    <div className={classes.BuildControls}>
      <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map((ctr,index) => {
        return <BuildControl
                  label={ctr.label}
                  key={ctr.label + index}
                  added={() => props.ingredientAdded(ctr.type)}
                  removed={() => props.ingredientRemoved(ctr.type)}
                  disabled={props.disabled[ctr.type]}/>
      })}
      <button
          className={classes.OrderButton}
          disabled={!props.purchasable}
          onClick={ props.ordered }>{props.isAuth ? 'ORDER NOW' : 'Sign up to order'}</button>
    </div>
);

export default buildControls;
