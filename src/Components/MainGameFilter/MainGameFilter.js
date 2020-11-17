import React, { Component } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { fetchDropdownOptions } from '../../services/boardgameApi';

class MainGameFilter extends Component {
  state = {
    categories: [],
    mechanics: [],
    status: false,
    selectedLabels: [],
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

  submitSearchHandler = () => {
    console.log('SUBMIT');
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
        <div>
          <label htmlFor="categories">Add a category</label>
          <select data-testid="categories-dropdown" id="categories">
            <option>Categories</option>
            {categoryOptions}
          </select>
          <SearchBar
            testid="category-search"
            valid={this.state.categories}
            for="categories"
            placeholder="Category Search"
            submit={this.submitSearchHandler}
          />
        </div>
        <div>
          <label htmlFor="mechanics">Add a Mechnic</label>
          <select data-testid="mechanics-dropdown" id="mechanics">
            <option>Mechanics</option>
            {mechanicsOptions}
          </select>
          <SearchBar
            testid="mechanic-search"
            valid={this.state.mechanics}
            for="mechanics"
            placeholder="Mechanic Search"
          />
        </div>
        <div>
          <label htmlFor="player count">Max Player Count</label>
          <select id="player count" data-testid="player-count-dropdown">
            <option value="1">Single Player</option>
            <option value="2">2 Players</option>
            <option value="4">4 Players</option>
            <option value="7">7 Players</option>
            <option value="7+">7+ Players</option>
          </select>
        </div>
        <div>
          <label htmlFor="play time">Play Time</label>
          <select id="play time" data-testid="play-time-dropdown">
            <option value="30">30 Mins</option>
            <option value="60">60 Mins</option>
            <option value="90">90 Mins</option>
            <option value="120">120 Mins</option>
            <option value="120+">120+ Mins</option>
          </select>
        </div>
        <div>
          <label htmlFor="year published">Year Published</label>
          <input
            type="number"
            placeholder="enter a date"
            data-testid="year-published-input"
          />
        </div>
        <div>
          <label htmlFor="order by">Order By</label>
          <select id="order by" data-testid="order-by-dropdown">
            <option value="popularity">Popularity</option>
            <option value="price">Price</option>
            <option value="year_published">Year Published</option>
            <option value="max_playtime">Play Time</option>
          </select>
        </div>
      </form>
    );
  }
}

export default MainGameFilter;
