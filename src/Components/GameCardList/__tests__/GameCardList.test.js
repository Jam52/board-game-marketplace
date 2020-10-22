import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../testUtils/testUtil';
import * as mockData from './mockData.json';
import GameCardList from '../GameCardList';
import GameCard from '../GameCard/GameCard';

const setup = (props) => {
  const wrapper = shallow(<GameCardList {...props} />);
  return wrapper;
};

describe('GameCardList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup({ games: mockData.games });
  });
  test('renders w/ error', () => {
    expect(findByTestAttr(wrapper, 'component-game-card-list').length).toBe(1);
  });
  test('contains games cards based on data', () => {
    expect(wrapper.find(GameCard).length).toBe(mockData.games.length);
  });
});
