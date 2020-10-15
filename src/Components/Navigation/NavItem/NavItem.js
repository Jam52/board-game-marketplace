import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = (props) => {
  return (
    <Link to={`/${props.to}`} onClick={props.click}>
      {props.categoryName}
    </Link>
  );
};

export default NavItem;
