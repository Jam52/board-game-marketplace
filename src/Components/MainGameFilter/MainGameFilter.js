import React, { Component } from 'react';
import { fetchDropdownOptions } from '../../services/boardgameApi';

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
    const responseData = await this.fetchDropdownOptions();
    this.setState({
      categories: await responseData.categories,
      mechanics: await responseData.mechanics,
      status: 'done',
    });
  };

  fetchDropdownOptions = async (trm) => {
    try {
      const dataFromApi = await fetchDropdownOptions();
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
    if (this.state.status === 'done') {
      categoryOptions = this.state.categories.map((category, index) => {
        return (
          <option key={index} value={category.id} data-testid="category-option">
            {category.name}
          </option>
        );
      });
      mechanicsOptions = this.state.mechanics.map((mechanic, index) => {
        return (
          <option key={index} value={mechanic.id} data-testid="mechanic-option">
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
