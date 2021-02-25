import React from 'react';
import classes from '../MainGameFilter.module.scss';

const CategoryDropdown = (props) => {
  console.log(props.status);
  let categoryOptions = <option>Unknown</option>;

  const filterSet = (option, filterSet) => {
    if (props.selectedLabels.length === 0) {
      return true;
    }
    if (!filterSet.length > 0) {
      return true;
    }
    if (filterSet.includes(option.id)) {
      return true;
    }
    return false;
  };

  if (props.status === 'done') {
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
            data-testid="category-option"
          >
            {category.name}
          </option>
        );
      });
  }

  return (
    <div className={classes.mainSearch_section}>
      <label className={classes.mainSearch_label} htmlFor={props.for}>
        Add a {props.for}
      </label>
      <select
        data-testid={`${props.for}-dropdown`}
        id={props.for}
        name={props.for}
        className={classes.mainSearch_dropdown}
        onChange={(event) => props.onChangeHandler(event, props.selectArray)}
      >
        <option value="null">{props.for}</option>
        {categoryOptions}
      </select>
    </div>
  );
};

export default CategoryDropdown;
