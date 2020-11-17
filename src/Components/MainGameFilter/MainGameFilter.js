import React, { Component } from 'react';
import boardgameApi from '../../services/boardgameApi';

class MainGameFilter extends Component {
  state = {
    categories: [],
    mechanics: [],
    status: false,
  };

  componentDidMount = async () => {
    this.setState({
      status: 'loading',
    });
    const categoryData = await this.fetchCategories();
    this.setState({
      categories: categoryData,
      status: 'done',
    });
  };

  fetchCategories = async () => {
    try {
      const categoriesFromApi = await boardgameApi('categories');
      return await categoriesFromApi.categories;
    } catch (error) {
      this.setState({
        statue: 'error',
      });
    }
  };

  render() {
    let categoryOptions = <option>Unknown</option>;
    if (this.state.status === 'done') {
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
