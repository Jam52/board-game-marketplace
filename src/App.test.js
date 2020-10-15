import React from 'react';
import { render } from '@testing-library/react';
import { shallow } from 'enzyme';
import { findByTestAttr } from './test/testUtil';
import App from './App';

const wrapper = shallow(<App />);

test('Renders without error', () => {
  expect(wrapper.find('.App').length).toBe(1);
});
