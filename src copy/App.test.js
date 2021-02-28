import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

const wrapper = shallow(<App />);

test('Renders without error', () => {
  expect(wrapper.find('.App').length).toBe(1);
});
