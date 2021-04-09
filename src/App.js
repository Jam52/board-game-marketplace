import React, { Component } from 'react';
import classes from './App.module.scss';
import { BrowserRouter } from 'react-router-dom';
import axios from './axios';
import MainGameFilter from './Components/MainGameFilter/MainGameFilter';
import GameCardList from './Components/GameCardList/GameCardList';
import GameCardListPagination from './Components/GameCardListPagination/GameCardListPagination';

class App extends Component {
  state = {
    games: [],
    categoryOptions: [],
    loading: false,
  };

  componentDidMount = async () => {
    const categoryOptions = await axios.get('categories');
    this.setState({ categoryOptions: categoryOptions.data.categories });
  };

  categoryChangeHandler = async (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const categoryGameData = await axios.get(
      `search?category=${event.target.value}`,
    );
    this.setState({ loading: false, games: await categoryGameData.data.games });
  };

  render() {
    let categories = <option>Loading...</option>;
    if (this.state.categoryOptions.length > 0) {
      categories = this.state.categoryOptions.map((category) => {
        return (
          <option value={category.id} key={category.id}>
            {category.name}
          </option>
        );
      });
    }

    return (
      <BrowserRouter>
        <div className={classes.App}>
          <div className={classes.gamesContainer}>
            <MainGameFilter />
            <GameCardListPagination />
            <GameCardList></GameCardList>
            <GameCardListPagination />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
