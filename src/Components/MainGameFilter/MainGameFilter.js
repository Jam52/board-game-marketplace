import React, { Component } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { fetchDropdownOptions } from '../../services/boardgameApi';
import classes from './MainGameFilter.module.scss';

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
      <form data-testid="component-main-game-filter" className={classes.form}>
        <div className={classes.mainSearch}>
          <div className={classes.mainSearch_section}>
            <label className={classes.mainSearch_label} htmlFor="categories">
              Add a category
            </label>
            <div className={classes.mainSearch_inputs}>
              <select
                data-testid="categories-dropdown"
                id="categories"
                className={classes.mainSearch_dropdown}
              >
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
          </div>

          <div className={classes.mainSearch_section}>
            <label className={classes.mainSearch_label} htmlFor="mechanics">
              Add a Mechnic
            </label>
            <div className={classes.mainSearch_inputs}>
              <select
                data-testid="mechanics-dropdown"
                id="mechanics"
                className={classes.mainSearch_dropdown}
              >
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
          </div>
        </div>
        <div className={classes.subSearch}>
          <div className={classes.subSearch_section}>
            <label className={classes.subSearch_label} htmlFor="player count">
              Max Player Count
            </label>
            <select
              id="player count"
              data-testid="player-count-dropdown"
              className={classes.subSearch_dropdown}
            >
              <option value="1">Single Player</option>
              <option value="2">2 Players</option>
              <option value="4">4 Players</option>
              <option value="7">7 Players</option>
              <option value="7+">7+ Players</option>
            </select>
          </div>
          <div className={classes.subSearch_section}>
            <label className={classes.subSearch_label} htmlFor="play time">
              Play Time
            </label>
            <select
              id="play time"
              data-testid="play-time-dropdown"
              className={classes.subSearch_dropdown}
            >
              <option value="30">30 Mins</option>
              <option value="60">60 Mins</option>
              <option value="90">90 Mins</option>
              <option value="120">120 Mins</option>
              <option value="120+">120+ Mins</option>
            </select>
          </div>
          <div className={classes.subSearch_section}>
            <label className={classes.subSearch_label} htmlFor="year published">
              Year Published
            </label>
            <input
              type="number"
              placeholder="enter a date"
              data-testid="year-published-input"
              className={classes.subSearch_input}
            />
          </div>
          <div className={classes.subSearch_section}>
            <label className={classes.subSearch_label} htmlFor="order by">
              Order By
            </label>
            <select
              id="order by"
              data-testid="order-by-dropdown"
              className={classes.subSearch_dropdown}
            >
              <option value="popularity">Popularity</option>
              <option value="price">Price</option>
              <option value="year_published">Year Published</option>
              <option value="max_playtime">Play Time</option>
            </select>
          </div>
        </div>
      </form>
    );
  }
}

export default MainGameFilter;
