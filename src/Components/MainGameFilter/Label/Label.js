import React from 'react';
import classes from './Label.module.scss';

const Label = (props) => {
  return (
    <div data-testid="label" className={classes.label}>
      <p
        data-testid="label-cancel"
        onClick={props.remove}
        className={classes.label_cancel}
      >
        X
      </p>
      <p className={classes.label_name}>{props.labelObj.name}</p>
    </div>
  );
};

export default Label;
