import React, { Component } from 'react';
import classes from './MainNavBar.module.scss';
import diceLogo from '../../../images/dice.jpg';
import BrowseDropdown from '../BrowseDropdown/BrowseDropdown';

class MainNavBar extends Component {
  render() {
    return (
      <div data-test="component-main-nav" className={classes.NavBar}>
        <img data-test="logo-main" className={classes.logo} src={diceLogo} />
        <BrowseDropdown />
      </div>
    );
  }
}

export default MainNavBar;
