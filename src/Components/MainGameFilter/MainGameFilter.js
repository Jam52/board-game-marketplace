import React, { Component } from 'react';
import { fetchOptions } from '../../services/boardgameApi';

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
    const categoryData = await this.fetchDropdownOptions('categories');
    const mechanicsData = await this.fetchDropdownOptions('mechanics');
    this.setState({
      categories: await categoryData.categories,
    });
    this.setState({
      mechanics: await mechanicsData.mechanics,
      status: 'done',
    });
  };

  fetchDropdownOptions = async (term) => {
    try {
      const dataFromApi = await fetchOptions(term);
      return await dataFromApi;
    } catch (error) {
      this.setState({
        status: 'error',
      });
    }
  };

  render() {
    let mechanicsOptions = <option>Unknown</option>;
    let categoryOptions = <option>Unknown</option>;
    if (this.state.categories.length > 0) {
      categoryOptions = this.state.categories.map((category, index) => {
        return (
          <option key={index} value={category.id} data-testid="category-option">
            {category.name}
          </option>
        );
      });
    }
    if (this.state.mechanics.length > 0) {
      mechanicsOptions = this.state.mechanics.map((mechanic, index) => {
        return (
          <option key={index} value={mechanic.id} data-test="category-option">
            {mechanic.name}
          </option>
        );
      });
    }
    return (
      <form data-testid="component-main-game-filter">
        <label htmlFor="category">Add a category</label>
        <select data-testid="categories-dropdown" id="category">
          <option>Categories</option>
          {categoryOptions}
        </select>

        <select data-testid="mechanics-dropdown">
          <option>Mechanics</option>
          {mechanicsOptions}
        </select>
      </form>
    );
  }
}

export default MainGameFilter;
