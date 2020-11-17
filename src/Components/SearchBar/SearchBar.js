import React, { useState } from 'react';
import classes from './SearchBar.module.scss';

const SearchBar = (props) => {
  const validEntries = props.valid.map((item) => item.name.toLowerCase());

  let [isValid, setValid] = useState(true);

  const submitHandler = (event) => {
    setValid(true);
    event.target.placeholder = props.placeholder;
    if (event.key === 'Enter') {
      const submitValue = event.target.value.toLowerCase();
      if (validEntries.includes(submitValue)) {
        props.submit(submitValue);
      } else {
        setValid(false);
        event.target.placeholder = 'Not Found';
      }
      event.target.value = '';
    }
  };

  const isValidClasses = isValid
    ? classes.searchBar
    : [classes.searchBar, classes.inputerror].join(' ');

  return (
    <input
      data-testid={props.testid}
      type="text"
      htmlFor={props.for}
      placeholder={props.placeholder}
      onKeyDown={(event) => submitHandler(event)}
      tabIndex="0"
      className={isValidClasses}
    ></input>
  );
};

export default SearchBar;
