import React from 'react';

const Label = (props) => {
  const testid = `${props.labelObj.type}-label`;
  return (
    <div data-testid={testid}>
      <p>X</p>
      <p>{props.labelObj.name}</p>
    </div>
  );
};

export default Label;
