import React from 'react';

const SearchBar = (props) => {
  const validEntries = props.valid.map((item) => item.name.toLowerCase());

  const submitHandler = (event) => {
    if (event.key === 'Enter') {
      const submitValue = event.target.value.toLowerCase();
      if (validEntries.includes(submitValue)) {
        props.submit(submitValue);
      }
    }
  };

  return (
    <input
      data-testid={props.testid}
      type="text"
      htmlFor={props.for}
      placeholder={props.placeholder}
      onKeyDown={(event) => submitHandler(event)}
      tabIndex="0"
    ></input>
  );
};

export default SearchBar;
