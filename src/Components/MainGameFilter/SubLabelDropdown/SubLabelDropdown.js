import React from 'react';
import classes from '../MainGameFilter.module.scss';
import OrderToggle from '../OrderToggle/OrderToggle';

const SubLabelDropdown = (props) => {
  console.log('subLable', props.isAsc);
  let selectOptions = props.selectArr;

  if (props.selectBoundaries) {
    const boundries = props.selectBoundaries;
    selectOptions = props.selectArr.filter((option) => {
      if (option.value === 'null') {
        return true;
      }
      return option.value >= boundries.min && option.value <= boundries.max;
    });
  }

  return (
    <div className={classes.subSearch_section}>
      <label className={classes.subSearch_label} htmlFor={props.for}>
        {props.for}
      </label>
      <div>
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
        {props.toggleAsc ? (
          <OrderToggle click={props.toggleAsc} isAsc={props.isAsc} />
        ) : null}
      </div>
    </div>
  );
};

export default SubLabelDropdown;
