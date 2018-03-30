import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_,index) => {
              return <BurgerIngredient key={igKey+index} type={igKey} />
            })
        }).reduce((result,current) => {
          return result.concat(current)
        },[]);
        transformedIngredients.length === 0 && (transformedIngredients=<p>Please, add some ingredients</p>)
  return (
      <div className={classes.Burger}>
        <BurgerIngredient type="bread-top"/>
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom"/>
      </div>
  );
}

export default withRouter(burger);
