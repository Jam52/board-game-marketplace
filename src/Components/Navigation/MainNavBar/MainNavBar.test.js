import React from 'react';
import { mount } from 'enzyme';
import MavNavBar from './MainNavBar';
import { findByTestAttr } from '../../../test/testUtil';

const setup = () => {
  return mount(<MavNavBar />);
};

describe('MainNavBar', () => {
  const wrapper = setup();

  test('renders without error', () => {
    expect(findByTestAttr(wrapper, 'component-main-nav').length).toBe(1);
  });

  test('renderes image', () => {
    expect(findByTestAttr(wrapper, 'logo-main').length).toBe(1);
  });
});
