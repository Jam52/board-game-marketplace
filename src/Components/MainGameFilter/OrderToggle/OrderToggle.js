import React from 'react';
import classes from './OrderToggle.module.scss';

const OrderToggle = (props) => {
  return (
    <div className={classes.toggle} onClick={props.click} role="button">
      <img
        className={props.isAsc ? classes.asc : null}
        src={process.env.PUBLIC_URL + '/images/orderArrow.svg'}
        alt="order toggle"
      />
    </div>
  );
};

export default OrderToggle;
