import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import AdjComponent from '../../../hoc/Adj/AdjComponent';
import classes from './SideDrawer.css';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open){
      attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
      <AdjComponent>
          <Backdrop show={props.open} clicked={props.closeSideDrawer}/>
          <div className={attachedClasses.join(' ')} onClick={props.closeSideDrawer}>
              <div className={classes.Logo}>
                <Logo/>
              </div>
              <nav>
                <NavigationItems isAuthenticated={props.isAuth} />
              </nav>
          </div>
      </AdjComponent>
    );
}

export default sideDrawer;
