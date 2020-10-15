import React, { Component } from 'react';
import classes from './MainNavBar.module.scss';
import diceLogo from '../../../images/dice.png';
import BrowseDropdown from '../BrowseDropdown/BrowseDropdown';

class MainNavBar extends Component {
  render() {
    return (
      <div data-test="component-main-nav" className={classes.NavBar}>
        <div className={classes.Container}>
          <img
            data-test="logo-main"
            className={classes.Logo}
            src={diceLogo}
            alt=""
          />
          <div className={classes.Navigation}>
            <BrowseDropdown />
          </div>
        </div>
      </div>
    );
  }
}

export default MainNavBar;
