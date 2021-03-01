import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCategoryMechanicOptions,
  addSelectedLabel,
  removeSelectedLabel,
} from '../../store/features/gamesFilter/gamesFilterSlice';
import classes from './MainGameFilter.module.scss';
import Label from './Label/Label';
import GameCardList from '../../Components/GameCardList/GameCardList';
import CategoryDropdown from './CategoryDropdown/CategoryDropdown';
import SubLabelDropdown from './SubLabelDropdown/SubLabelDropdown';

const MainGameFilter = (props) => {
  const dispatch = useDispatch();
  const {
    asc,
    gamesData,
    selectedLabels,
    mechanicOptions,
    categoryOptions,
    loading,
  } = useSelector((state) => state.gamesFilter);

  const [state, setState] = useState({
    filteredCategories: [],
    filteredMechanics: [],
  });

  useEffect(() => {
    dispatch(fetchCategoryMechanicOptions());
  }, [mechanicOptions, categoryOptions]);

  const selectMainLabelHandler = (event, categories, type) => {
    const targetValue = event.target.value;
    if (targetValue !== 'null') {
      const labelObject = categories.find(
        (cat) => cat.name.toLowerCase() === targetValue.toLowerCase(),
      );
      const newLabelObj = {
        type: type,
        id: labelObject.id,
        name: labelObject.name,
      };
      dispatch(addSelectedLabel(newLabelObj));
      event.target.children[0].selected = true;
    }
  };

  return (
    <div>
      <form data-testid="component-main-game-filter" className={classes.form}>
        <div className={classes.mainSearch}>
          <CategoryDropdown
            for="category"
            filteredCategories={state.filteredCategories}
            selectArray={categoryOptions}
            selectedLabels={selectedLabels}
            onChangeHandler={selectMainLabelHandler}
          />
          <CategoryDropdown
            for="mechanic"
            filteredCategories={state.filteredMechanics}
            selectArray={mechanicOptions}
            selectedLabels={selectedLabels}
            onChangeHandler={selectMainLabelHandler}
          />
        </div>
        {/* <div className={classes.subSearch}>
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
            selectBoundaries={state.playerCount}
            selectHandler={selectSubLabelHandler}
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
            <label className={classes.subSearch_label} htmlFor="year published">
              Year Published
            </label>
            <input
              type="number"
              placeholder="enter a date"
              data-testid="year-published-input"
              data-label="- year published"
              className={classes.subSearch_input}
              onChange={(event) =>
                this.selectSubLabelHandler(event, 'year-published')
              }
            />
          </div>
          <SubLabelDropdown
            for="order by"
            selectArr={[
              { value: 'null', label: 'order by' },
              { value: 'name', label: 'name' },
              { value: 'average_user_rating', label: 'user raiting' },
              { value: 'year_published', label: 'year published' },
              { value: 'max_playtime', label: 'playtime' },
            ]}
            selectHandler={this.selectSubLabelHandler}
            toggleAsc={this.toggleAscHandler}
            isAsc={this.state.asc}
          /> */}
        {/* </div> */}
        <div className={classes.labelContainer}>
          {selectedLabels.length > 0
            ? selectedLabels.map((obj, index) => {
                return (
                  <Label
                    key={index}
                    labelObj={obj}
                    remove={() => dispatch(removeSelectedLabel(obj))}
                  />
                );
              })
            : null}
        </div>
      </form>
      <GameCardList games={gamesData} loading={loading}></GameCardList>
    </div>
  );
};

export default MainGameFilter;
