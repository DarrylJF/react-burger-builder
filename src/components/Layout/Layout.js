import React, {Component} from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './Layout.module.scss';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  
  state = {
    showSideDrawer: false
  }
  
  sideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render() {
    return (
    <Auxillary>
      <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
      <SideDrawer 
        open={this.state.showSideDrawer}
        closed={this.sideDrawerCloseHandler}/>
      <main className={classes.Content}>
        {this.props.children}
      </main>
    </Auxillary>
    )
  }
};

export default Layout;
