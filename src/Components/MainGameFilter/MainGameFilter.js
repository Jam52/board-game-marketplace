import React, { Component } from 'react';

import {
  fetchDropdownOptions,
  fetchGameData,
} from '../../services/boardgameApi';
import classes from './MainGameFilter.module.scss';
import Label from './Label/Label';
import { searchQueryFromSelectedLabels } from './helperFunction';
import GameCardList from '../../Components/GameCardList/GameCardList';
import Spinner from '../../Components/Spinner/Spinner';
import CategoryDropdown from './CategoryDropdown/CategoryDropdown';
import SubLabelDropdown from './SubLabelDropdown/SubLabelDropdown';

class MainGameFilter extends Component {
  state = {
    categories: [],
    filteredCategories: [],
    mechanics: [],
    filteredMechanics: [],
    playerCount: { min: 0, max: 200 },
    playtime: { min: 0, max: 1000 },
    status: false,
    selectedLabels: [],
    selectedSubLables: [],
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
          playerCount: {
            min: await gameData.data.min_players,
            max: await gameData.data.max_players,
          },
          playtime: {
            min: await gameData.data.min_playtime,
            max: await gameData.data.max_playtime,
          },
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

  selectMainLabelHandler = (event, categories) => {
    const targetValue = event.target.value;
    if (targetValue !== 'null') {
      const labelObject = categories.find(
        (cat) => cat.name.toLowerCase() === targetValue.toLowerCase(),
      );
      this.addLabelObjToSelectedLabels(labelObject);
      event.target.children[0].selected = true;
    }
  };

  selectSubLabelHandler = (event, category) => {
    const value = event.target.value;
    console.log(value, category);
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
            <SubLabelDropdown
              for="player count"
              selectArr={[
                { value: 'null', label: 'player count' },
                { value: '1', label: '1 Player' },
                { value: '2', label: '2 Players' },
                { value: '4', label: '4 Players' },
                { value: '7', label: '7 Players' },
                { value: '10', label: '7+ Players' },
              ]}
              selectBoundaries={this.state.playerCount}
              selectHandler={this.selectSubLabelHandler}
            />

            <SubLabelDropdown
              for="play time"
              selectArr={[
                { value: 'null', label: 'play time' },
                { value: '15', label: '15 mins' },
                { value: '30', label: '30 mins' },
                { value: '60', label: '60 mins' },
                { value: '90', label: '90 mins' },
                { value: '120', label: '120 mins' },
                { value: '240', label: '240 mins' },
              ]}
              selectBoundaries={this.state.playtime}
              selectHandler={this.selectSubLabelHandler}
            />
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
