import React, { Component } from 'react';
// import classes from './BrowesDropdown.module.scss';
import NavItem from '../NavItem/NavItem';
import onClickOutside from 'react-onclickoutside';

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

    const dropDownItems = this.state.dropDownIsVisible ? (
      <ul>
        {browesCategories.map((category, index) => {
          return (
            <NavItem
              to={category.toLowerCase().replace(' ', '-')}
              categoryName={category}
              click={this.toggleDropdown}
              key={index}
            />
          );
        })}
      </ul>
    ) : null;

    return (
      <div data-test="component-browse-dropdown">
        <div data-test="browse-dropdown" onClick={this.toggleDropdown}>
          Browes Games
        </div>
        {dropDownItems}
      </div>
    );
  }
}

export default onClickOutside(BrowseDropdown);
