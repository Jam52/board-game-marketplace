import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../testUtils/testUtil';
import MainGameFilter from '../MainGameFilter';

jest.mock('../../../services/boardgameApi.js');

const setup = () => {
  const wrapper = shallow(<MainGameFilter />);
  return wrapper;
};

describe('MainGameFilter', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();
  });

  test('fetches category data and displays options in dropdown', (done) => {
    setImmediate(() => {
      wrapper.update();
      expect(findByTestAttr(wrapper, 'category-option')).toHaveLength(5);
      done();
    }, 1);
  });

  test('renders category dropdown', () => {
    expect(findByTestAttr(wrapper, 'category-dropdown')).toHaveLength(1);
  });
});
