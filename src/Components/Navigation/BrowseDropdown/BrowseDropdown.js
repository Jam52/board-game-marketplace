import React, { Component } from 'react';
import NavItem from '../NavItem/NavItem';
import onClickOutside from 'react-onclickoutside';
import classes from './BrowserDropdown.module.scss';
import smallArrow from '../../../images/arrow_down_small.png';
import { CSSTransition } from 'react-transition-group';
import './transition.css';

export class BrowseDropdown extends Component {
  state = {
    dropDownIsVisible: false,
  };

  handleClickOutside(evt) {
    this.setState({ dropDownIsVisible: false });
  }

  toggleDropdown = () => {
    this.setState({ dropDownIsVisible: !this.state.dropDownIsVisible });
  };

  render() {
    const browesCategories = ['Category', 'Mechanics', 'Player Count', 'Year'];

    return (
      <div
        data-test="component-browse-dropdown"
        className={this.state.dropDownIsVisible ? classes.selected : null}
      >
        <div
          data-test="browse-dropdown"
          onClick={this.toggleDropdown}
          className={classes.Container}
        >
          <div className={classes.Title}>Browes Games</div>
          <img className={classes.Arrow} src={smallArrow} />
        </div>

        <CSSTransition
          in={this.state.dropDownIsVisible}
          timeout={400}
          classNames="transition"
          unmountOnExit
        >
          <ul className={classes.DropdownItems}>
            {browesCategories.map((category, index) => {
              return (
                <li key={index}>
                  <NavItem
                    to={category.toLowerCase().replace(' ', '-')}
                    categoryName={category}
                    click={this.toggleDropdown}
                  />
                </li>
              );
            })}
          </ul>
        </CSSTransition>
      </div>
    );
  }
}

export default onClickOutside(BrowseDropdown);
