import React, { Component } from 'react';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { fetchDropdownOptions } from '../../services/boardgameApi';
import classes from './MainGameFilter.module.scss';
import Label from '../../Components/Label/Label';
import { searchQueryFromSelectedLabels } from './helperFunction';

class MainGameFilter extends Component {
  state = {
    categories: [],
    mechanics: [],
    status: false,
    selectedLabels: [],
  };

  componentDidMount = async () => {
    this._isMounted = true;
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

  componentWillUnmount() {
    this._isMounted = false;
  }

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
    const objectFromData = data.filter(
      (item) => item.name.toLowerCase() === name.toLowerCase(),
    );
    return objectFromData[0];
  };

  selectMainLabelHandler = (event, data) => {
    const labelObject = this.returnLabelObject(event.target.value, data);
    this.addLabelObjToSelectedLabels(labelObject);
  };

  submitMainLabelHandler = (name, data) => {
    const labelObject = this.returnLabelObject(name, data);
    this.addLabelObjToSelectedLabels(labelObject);
  };

  selectSubLabelHandler = (event, category) => {
    if (
      this.state.selectedLabels.map((label) => label.type).includes(category)
    ) {
      alert('filter type already set, please remove existing filter first.');
    } else {
      const value = event.target.value;
      const sufix = event.currentTarget.getAttribute('data-label');
      const labelObj = { id: value, name: `${value} ${sufix}`, type: category };
      this.addLabelObjToSelectedLabels(labelObj);
    }
  };

  addLabelObjToSelectedLabels = (labelObj) => {
    if (
      this.state.selectedLabels.map((obj) => obj.name).includes(labelObj.name)
    ) {
      return;
    }
    this.setState({
      selectedLabels: [...this.state.selectedLabels, labelObj],
    });
    const searchQuery = searchQueryFromSelectedLabels(
      this.state.selectedLabels,
    );
  };

  removeLabelHandler = (labelObj) => {
    const filteredSelectedLabels = this.state.selectedLabels.filter((obj) => {
      return obj.name !== labelObj.name;
    });

    this.setState({ selectedLabels: filteredSelectedLabels });
  };

  render() {
    let mechanicsOptions = <option>Unknown</option>;
    let categoryOptions = <option>Unknown</option>;
    if (this.state.status === 'done') {
      categoryOptions = this.state.categories.map((category, index) => {
        return (
          <option
            key={index}
            value={category.name}
            data-testid="category-option"
          >
            {category.name}
          </option>
        );
      });
      mechanicsOptions = this.state.mechanics.map((mechanic, index) => {
        return (
          <option
            key={index}
            value={mechanic.name}
            data-testid="mechanic-option"
          >
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
                onChange={(event) =>
                  this.selectMainLabelHandler(event, this.state.categories)
                }
              >
                {categoryOptions}
              </select>
              <SearchBar
                testid="category-search"
                valid={this.state.categories}
                for="categories"
                placeholder="Category Search"
                submit={this.submitMainLabelHandler}
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
                onChange={(event) =>
                  this.selectMainLabelHandler(event, this.state.mechanics)
                }
              >
                {mechanicsOptions}
              </select>
              <SearchBar
                testid="mechanic-search"
                valid={this.state.mechanics}
                for="mechanics"
                placeholder="Mechanic Search"
                submit={this.submitMainLabelHandler}
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
              data-label="players"
              className={classes.subSearch_dropdown}
              onChange={(event) =>
                this.selectSubLabelHandler(event, 'player-count')
              }
            >
              <option value="1">Single Player</option>
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
              <option value="15">15 Mins</option>
              <option value="30 ">30 Mins</option>
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
              <option value="popularity">Popularity</option>
              <option value="price">Price</option>
              <option value="year published">Year Published</option>
              <option value="max playtime">Play Time</option>
            </select>
          </div>
        </div>
        <div className={classes.labelContainer}>
          {this.state.selectedLabels.length > 0
            ? this.state.selectedLabels.map((obj, index) => {
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
    );
  }
}

export default MainGameFilter;
