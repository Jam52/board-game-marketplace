import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../../../testUtils/testUtil';
import * as mockData from '../../__tests__/mockData.json';
import GameCard from '../GameCard';

const setup = (props) => {
  const wrapper = shallow(<GameCard {...props} />);
  return wrapper;
};

describe('GameCard', () => {
  let wrapper;
  const mockGame = mockData.games[3];
  beforeEach(() => {
    wrapper = setup({ game: mockGame });
  });
  test('renders w/ error', () => {
    expect(findByTestAttr(wrapper, 'component-game-card').length).toBe(1);
  });
  test('renders correct number of raiting stars based on average user rating', () => {
    //ave user rating of mockGame[3] is 4.6
    expect(findByTestAttr(wrapper, 'full-star').length).toBe(4);
    expect(findByTestAttr(wrapper, 'half-star').length).toBe(1);
  });
  test('shows correct number of players', () => {
    expect(findByTestAttr(wrapper, 'player-count').at(0).text()).toBe('1 - 4')
  })
  test('shows correct play time', () => {
    expect(findByTestAttr(wrapper, 'play-time').at(0).text()).toBe('30 - 120')
  })
});
