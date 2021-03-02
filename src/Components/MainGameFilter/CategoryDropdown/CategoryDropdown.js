import React from 'react';
import classes from '../MainGameFilter.module.scss';

const CategoryDropdown = (props) => {
  let categoryOptions = <option>Unknown</option>;

  // filters select array if selectedLables or fileredCategories is not === 0
  const filterSet = (option, filteredCategories) => {
    if (props.selectedLabels.length === 0) {
      return true;
    }
    if (filteredCategories.length === 0) {
      return true;
    }
    if (filteredCategories.includes(option.id)) {
      return true;
    }
    return false;
  };

  //apply filter and map selectArry to options
  categoryOptions = props.selectArray
    .filter((category) => {
      return filterSet(category, props.filteredCategories);
    })
    .map((category, index) => {
      return (
        <option
          key={index}
          value={category.name}
          data-id={category.id}
          data-testid={category.id}
        >
          {category.name}
        </option>
      );
    });

  return (
    <div
      className={classes.mainSearch_section}
      data-testid={`${props.for}-dropdown`}
    >
      <label className={classes.mainSearch_label} htmlFor={props.for}>
        Add a {props.for}
      </label>
      <select
        id={props.for}
        name={props.for}
        className={classes.mainSearch_dropdown}
        onChange={(event) =>
          props.onChangeHandler(event, props.selectArray, props.for)
        }
      >
        <option value="null">{props.for}</option>
        {categoryOptions}
      </select>
    </div>
  );
};

export default CategoryDropdown;
