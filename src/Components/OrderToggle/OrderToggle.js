import React from 'react';
import classes from './OrderToggle.module.scss';

const OrderToggle = (props) => {
  return (
    <button className={classes.toggle} onClick={props.click}>
      <img
        src={process.env.PUBLIC_URL + '/images/orderArrow.svg'}
        alt="order toggle"
      />
    </button>
  );
};

export default OrderToggle;
