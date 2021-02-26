import React from 'react';
import classes from '../MainGameFilter.module.scss';

const SubLabelDropdown = (props) => {
  let selectOptions = props.selectArr;

  const boundries = props.selectBoundaries;
  console.log(boundries);
  selectOptions = props.selectArr.filter((option) => {
    if (option.value === 'null') {
      return true;
    }
    console.log(option.value < boundries.max);
    return option.value > boundries.min;
  });

  console.log(selectOptions);

  return (
    <div className={classes.subSearch_section}>
      <label className={classes.subSearch_label} htmlFor={props.for}>
        {props.for}
      </label>
      <select
        id={props.for}
        data-testid={`${props.for}-dropdown`}
        data-label={props.for}
        className={classes.subSearch_dropdown}
        onChange={(event) => props.selectHandler(event, props.for)}
      >
        {selectOptions.map((selectOption) => {
          return (
            <option value={selectOption.value}>{selectOption.label}</option>
          );
        })}
      </select>
    </div>
  );
};

export default SubLabelDropdown;
