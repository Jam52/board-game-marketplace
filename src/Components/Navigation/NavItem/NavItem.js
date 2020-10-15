import React from 'react';
import { Link } from 'react-router-dom';
import classes from './NavItem.module.scss';

const NavItem = (props) => {
  return (
    <Link to={`/${props.to}`} onClick={props.click} className={classes.Link}>
      {props.categoryName}
    </Link>
  );
};

export default NavItem;
