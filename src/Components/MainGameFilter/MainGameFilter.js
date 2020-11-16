import React, { Component } from 'react';
import { categoryOptions } from '../../services/boardgameApi';

class MainGameFilter extends Component {
  state = {
    categories: [],
  };

  componentDidMount = async () => {
    const fetchCategories = await categoryOptions();
    this.setState({
      categories: fetchCategories,
    });
  };

  render() {
    let categoryOptions = <option>Unknown</option>;
    if (this.state.categories.length > 0) {
      categoryOptions = this.state.categories.map((category, index) => {
        return (
          <option key={index} value={category.id} data-test="category-option">
            {category.name}
          </option>
        );
      });
    }
    return (
      <div data-test="component-main-game-filter">
        <select data-test="category-dropdown">{categoryOptions}</select>
      </div>
    );
  }
}

export default MainGameFilter;
