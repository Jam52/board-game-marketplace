import React, { Component } from 'react';

import {
  fetchDropdownOptions,
  fetchGameData,
} from '../../services/boardgameApi';
import classes from './MainGameFilter.module.scss';
import Label from '../../Components/Label/Label';
import { searchQueryFromSelectedLabels } from './helperFunction';
import GameCardList from '../../Components/GameCardList/GameCardList';
import Spinner from '../../Components/Spinner/Spinner';
import CategoryDropdown from './CategoryDropdown/CategoryDropdown';

class MainGameFilter extends Component {
  state = {
    categories: [],
    filteredCategories: [],
    mechanics: [],
    filteredMechanics: [],
    status: false,
    selectedLabels: [],
    gameData: [],
    gameDataLength: 0,
    loading: false,
  };

  componentDidMount = async () => {
    if (
      this.state.categories.length === 0 ||
      this.state.mechanics.length === 0
    ) {
      this.setState({
        status: 'loading',
      });
      const responseData = await this.fetchDropdownOptions();
      this.setState({
        categories: await responseData.categories.map((item) => {
          return { ...item, type: 'category' };
        }),
        mechanics: await responseData.mechanics.map((item) => {
          return { ...item, type: 'mechanic' };
        }),
        status: 'done',
      });
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      prevState.selectedLabels.length !== this.state.selectedLabels.length &&
      this.state.selectedLabels.length > 0
    ) {
      const searchQuery = searchQueryFromSelectedLabels(
        this.state.selectedLabels,
      );
      try {
        this.setState({ loading: true });
        const gameData = await fetchGameData(searchQuery);
        console.log(gameData);
        this.setState({
          gameData: await gameData.data.games,
          loading: false,
          gameDataLength: await gameData.data.length,
          filteredMechanics: await gameData.data.mechanics,
          filteredCategories: await gameData.data.categories,
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  fetchDropdownOptions = async () => {
    try {
      const dataFromApi = await fetchDropdownOptions();
      return await dataFromApi;
    } catch (error) {
      this.setState({
        status: 'error',
      });
    }
  };

  returnLabelObject = (name, data) => {
    const objectFromData = data.find(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    );
    return objectFromData;
  };

  selectMainLabelHandler = (event, data) => {
    if (event.target.value !== 'null') {
      const labelObject = this.returnLabelObject(event.target.value, data);
      this.addLabelObjToSelectedLabels(labelObject);
      event.target.children[0].selected = true;
    }
  };

  submitMainLabelHandler = (name, data) => {
    const labelObject = this.returnLabelObject(name, data);
    this.addLabelObjToSelectedLabels(labelObject);
  };

  selectSubLabelHandler = (event, category) => {
    const value = event.target.value;
    this.removeLabelFromSelectedLabels(category);
    if (value !== 'null') {
      const sufix = event.currentTarget.getAttribute('data-label');
      const labelObj = {
        id: value,
        name: `${value} ${sufix}`,
        type: category,
      };
      setTimeout(() => this.addLabelObjToSelectedLabels(labelObj), 100);
    }
  };

  addLabelObjToSelectedLabels = async (labelObj) => {
    if (
      this.state.selectedLabels.map((obj) => obj.name).includes(labelObj.name)
    ) {
      return;
    }
    this.setState({
      selectedLabels: [...this.state.selectedLabels, labelObj],
    });
  };

  removeLabelFromSelectedLabels = (category) => {
    const newSelectedLabels = this.state.selectedLabels.filter(
      (label) => label.type !== category,
    );
    this.setState({ selectedLabels: newSelectedLabels });
  };

  removeLabelHandler = (labelObj) => {
    const filteredSelectedLabels = this.state.selectedLabels.filter((obj) => {
      return obj.name !== labelObj.name;
    });

    this.setState({ selectedLabels: filteredSelectedLabels });
  };

  render() {
    let gameCards = null;
    if (this.state.selectedLabels.length > 0) {
      if (this.state.loading) {
        gameCards = <Spinner />;
      } else if (this.state.gameData.length > 0) {
        gameCards = <GameCardList games={this.state.gameData} />;
      }
    }

    return (
      <div>
        <form data-testid="component-main-game-filter" className={classes.form}>
          <div className={classes.mainSearch}>
            <CategoryDropdown
              for="category"
              filteredCategories={this.state.filteredCategories}
              selectArray={this.state.categories}
              selectedLabels={this.state.selectedLabels}
              onChangeHandler={this.selectMainLabelHandler}
              status={this.state.status}
            />
            <CategoryDropdown
              for="mechanic"
              filteredCategories={this.state.filteredMechanics}
              selectArray={this.state.mechanics}
              selectedLabels={this.state.selectedLabels}
              onChangeHandler={this.selectMainLabelHandler}
              status={this.state.status}
            />
          </div>
          <div className={classes.subSearch}>
            <div className={classes.subSearch_section}>
              <label className={classes.subSearch_label} htmlFor="player count">
                Player Count
              </label>
              <select
                id="player count"
                data-testid="player-count-dropdown"
                data-label="players"
                className={classes.subSearch_dropdown}
                onChange={(event) =>
                  this.selectSubLabelHandler(event, 'player-count')
                }
              >
                <option value="null">Player Count</option>
                <option value="1">1 Player</option>
                <option value="2">2 Players</option>
                <option value="4">4 Players</option>
                <option value="7">7 Players</option>
                <option value="100">7+ Players</option>
              </select>
            </div>
            <div className={classes.subSearch_section}>
              <label className={classes.subSearch_label} htmlFor="play time">
                Play Time
              </label>
              <select
                id="play time"
                data-testid="play-time-dropdown"
                data-label="minutes"
                className={classes.subSearch_dropdown}
                onChange={(event) =>
                  this.selectSubLabelHandler(event, 'play-time')
                }
              >
                <option value="null">Play time</option>
                <option value="15">15 Mins</option>
                <option value="30 ">30 Mins</option>
                <option value="60">60 Mins</option>
                <option value="90">90 Mins</option>
                <option value="120">120 Mins</option>
                <option value="240">240 Mins</option>
              </select>
            </div>
            <div className={classes.subSearch_section}>
              <label
                className={classes.subSearch_label}
                htmlFor="year published"
              >
                Year Published
              </label>
              <input
                type="number"
                placeholder="enter a date"
                data-testid="year-published-input"
                data-label="- year published"
                className={classes.subSearch_input}
                onKeyDown={(event) =>
                  event.key === 'Enter'
                    ? this.selectSubLabelHandler(event, 'year-published')
                    : null
                }
              />
            </div>
            <div className={classes.subSearch_section}>
              <label className={classes.subSearch_label} htmlFor="order by">
                Order By
              </label>
              <select
                id="order by"
                data-testid="order-by-dropdown"
                data-label=""
                className={classes.subSearch_dropdown}
                onChange={(event) =>
                  this.selectSubLabelHandler(event, 'order-by')
                }
              >
                <option value="null">Order by</option>
                <option value="name">Name</option>
                <option value="average_user_rating">Average User Rating</option>
                <option value="popularity">Popularity</option>
                <option value="price">Price</option>
                <option value="year published">Year Published</option>
                <option value="max playtime">Play Time</option>
              </select>
            </div>
          </div>
          <div className={classes.labelContainer}>
            {this.state.selectedLabels.length > 0
              ? this.state.selectedLabels
                  .filter((label) => {
                    return (
                      label.type === 'category' || label.type === 'mechanic'
                    );
                  })
                  .map((obj, index) => {
                    return (
                      <Label
                        key={index}
                        labelObj={obj}
                        remove={() => this.removeLabelHandler(obj)}
                      />
                    );
                  })
              : null}
          </div>
        </form>
        {gameCards}
      </div>
    );
  }
}

export default MainGameFilter;
