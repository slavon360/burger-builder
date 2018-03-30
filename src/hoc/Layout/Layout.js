import React, { Component } from 'react';
import { connect } from 'react-redux';
import Adj from '../Adj/AdjComponent';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

class Layout extends Component{
    state = {
      showSideDrawer:false
    }
    sideDrawerClosedHandler = () => {
      this.setState({
        showSideDrawer:false
      })
    }
    sideDrawerToggleHandler = () => {
      this.setState((prevState) => {
        return {showSideDrawer:!prevState.showSideDrawer};
      })
    }
  render(){
    return(
            <Adj>
              <Toolbar
                isAuth={this.props.isAuthenticated}
                drawerToggleClicked={this.sideDrawerToggleHandler}/>
              <SideDrawer
                isAuth={this.props.isAuthenticated} 
                open={this.state.showSideDrawer}
                closeSideDrawer={this.sideDrawerClosedHandler}/>
              <main className={classes.Content}>
                {this.props.children}
              </main>
            </Adj>
          );
  }
}
const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps, null)(Layout);
