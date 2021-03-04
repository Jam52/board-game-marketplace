import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCategoryMechanicOptions,
  addSelectedLabel,
  removeSelectedLabel,
  setAsc,
  addSubLabelToSelectedLabels,
  setOrderBy,
} from '../../store/features/gamesFilter/gamesFilterSlice';
import classes from './MainGameFilter.module.scss';
import Label from './Label/Label';
import GameCardList from '../../Components/GameCardList/GameCardList';
import CategoryDropdown from './CategoryDropdown/CategoryDropdown';
import SubLabelDropdown from './SubLabelDropdown/SubLabelDropdown';
import GameCardListPagination from '../GameCardListPagination/GameCardListPagination';

const MainGameFilter = (props) => {
  const dispatch = useDispatch();
  const {
    gamesData,
    selectedLabels,
    mechanicOptions,
    categoryOptions,
    filteredCategories,
    filteredMechanics,
    playerCount,
    playtime,
    loading,
    isAsc,
  } = useSelector((state) => state.gamesFilter);

  useEffect(() => {
    dispatch(fetchCategoryMechanicOptions());
  }, [mechanicOptions, categoryOptions]);

  // useEffect(() => {
  //   console.log(gamesData);
  // }, [gamesData]);

  const selectLabelHandler = (event, categories, type) => {
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

  const selectSubLabelHandler = (event, type) => {
    const targetValue = event.target.value;
    const labelObj = {
      id: targetValue,
      type,
    };
    dispatch(addSubLabelToSelectedLabels(labelObj));
  };

  return (
    <div>
      <form data-testid="component-main-game-filter" className={classes.form}>
        <legend>Filter games</legend>
        <div className={classes.mainSearch}>
          <CategoryDropdown
            for="category"
            filteredCategories={filteredCategories}
            selectArray={categoryOptions}
            selectedLabels={selectedLabels}
            onChangeHandler={selectLabelHandler}
          />
          <CategoryDropdown
            for="mechanic"
            filteredCategories={filteredMechanics}
            selectArray={mechanicOptions}
            selectedLabels={selectedLabels}
            onChangeHandler={selectLabelHandler}
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
            selectBoundaries={playerCount}
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
            selectBoundaries={playtime}
            selectHandler={selectSubLabelHandler}
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
                selectSubLabelHandler(event, 'year-published')
              }
            />
          </div>
          <SubLabelDropdown
            for="order by"
            selectArr={[
              { value: 'average_user_rating', label: 'user raiting' },
              { value: 'name', label: 'name' },
              { value: 'year_published', label: 'year published' },
              { value: 'max_playtime', label: 'playtime' },
            ]}
            selectHandler={(event) => dispatch(setOrderBy(event.target.value))}
            toggleAsc={() => dispatch(setAsc(!isAsc))}
            isAsc={isAsc}
          />
        </div>
        <div className={classes.labelContainer}>
          {selectedLabels.length > 0
            ? selectedLabels
                .filter(
                  (label) =>
                    label.type === 'mechanic' || label.type === 'category',
                )
                .map((obj, index) => {
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
      {gamesData.length > 0 ? <GameCardListPagination /> : null}
    </div>
  );
};

export default MainGameFilter;
