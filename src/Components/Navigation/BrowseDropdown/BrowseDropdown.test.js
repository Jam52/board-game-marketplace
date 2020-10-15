import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../../../test/testUtil';
import { BrowserRouter } from 'react-router-dom';

import EnhancedBrowseDropdown, { BrowseDropdown } from './BrowseDropdown';
import NavItem from '../NavItem/NavItem';

const setup = () => {
  return mount(
    <BrowserRouter>
      <EnhancedBrowseDropdown />
    </BrowserRouter>,
  );
};

describe('BrowesDropdown', () => {
  const wrapper = setup();

  test('renders without error', () => {
    expect(findByTestAttr(wrapper, 'component-browse-dropdown').length).toBe(1);
  });

  describe('when dropdown is not open', () => {
    test('renders browes options on click of BrowesDropdown', () => {
      const wrapper = setup();
      const dropdown = findByTestAttr(wrapper, 'browse-dropdown');
      dropdown.simulate('click');
      expect(wrapper.find(NavItem).length).toBe(4);
    });
  });

  describe('when dropdown is already open', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = setup();
      wrapper.find(BrowseDropdown).setState({ dropDownIsVisible: true });
    });

    test('removes list when BrowesDropdown is clicked', () => {
      const dropdown = findByTestAttr(wrapper, 'browse-dropdown');
      dropdown.simulate('click');
      expect(wrapper.find(NavItem).length).toBe(0);
    });

    test('removes list when list item is clicked', () => {
      const listItem = wrapper.find(NavItem).at(0);
      listItem.simulate('click');
      expect(wrapper.find(NavItem).length).toBe(0);
    });
  });
});
