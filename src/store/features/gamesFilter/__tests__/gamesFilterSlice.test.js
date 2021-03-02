import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
import {
  setCategoryMechanicOptions,
  setGamesData,
  setSelectedLabels,
  loading,
  setIsAsc,
  resetGameData,
} from '../gamesFilterSlice.js';
import reducer from '../gamesFilterSlice';

const initialState = {
  categoryOptions: [],
  mechanicOptions: [],
  selectedLabels: [],
  selectedSubLabels: [],
  isAsc: false,
  gamesData: [],
  playtime: { min: 0, max: 1000 },
  loading: false,
  playerCount: { min: 1, max: 1000 },
  filteredCategories: [],
  filteredMechanics: [],
};

describe('gameFilter reducer', () => {
  test('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
