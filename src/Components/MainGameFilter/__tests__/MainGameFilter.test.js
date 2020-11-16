import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../testUtils/testUtil';
import MainGameFilter from '../MainGameFilter';
import { fakeCategoryData } from '../../../services/__mocks__/boardGameApi';

jest.mock('../../../services/boardgameApi.js');

const setup = (props) => {
  const wrapper = shallow(<MainGameFilter {...props} />);
  return wrapper;
};

describe('MainGameFilter', () => {
  let wrapper;

  describe('state has no data', () => {
    beforeEach(() => {
      wrapper = setup();
    });
    test('renders w/ error', () => {
      expect(
        findByTestAttr(wrapper, 'component-main-game-filter'),
      ).toHaveLength(1);
    });

    test('renders category dropdown', () => {
      expect(findByTestAttr(wrapper, 'category-dropdown')).toHaveLength(1);
    });

    test('fetched category data and updates category state on mount', () => {
      expect(wrapper.state().categories.length).toBe(5);
    });
  });

  describe('has category state data', () => {
    beforeEach(() => {
      wrapper = setup();
    });
    test('category drop down contains all options', () => {
      expect(findByTestAttr(wrapper, 'category-option')).toHaveLength(5);
    });
  });
});
