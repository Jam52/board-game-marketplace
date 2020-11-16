import React, { Component } from 'react';
import classes from './App.module.scss';
import GameCardList from './Components/GameCardList/GameCardList';
import { BrowserRouter } from 'react-router-dom';
import axios from './axios';
import Spinner from './Components/Spinner/Spinner';

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

    let gameCards = null;
    if (this.state.loading) {
      gameCards = <Spinner />;
    } else if (this.state.games.length > 0) {
      gameCards = <GameCardList games={this.state.games} />;
    }

    return (
      <BrowserRouter>
        <div className={classes.App}>
          <select
            className={classes.dropdown}
            onChange={(event) => this.categoryChangeHandler(event)}
          >
            {categories}
          </select>
          {gameCards}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
