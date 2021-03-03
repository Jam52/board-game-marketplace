import store from '../../../store';
import * as actions from '../gamesFilterSlice';
import mockGameData from './mockData.json';

const initialState = {
  categoryOptions: [],
  mechanicOptions: [],
  selectedLabels: [],
  selectedSubLabels: [],
  isAsc: false,
  gamesData: [],
  playtime: { min: 0, max: 1000 },
  loading: false,
  playerCount: { min: 0, max: 1000 },
  filteredCategories: [],
  filteredMechanics: [],
  gameDataLength: 0,
};

describe('filterSlice', () => {
  test('store is conneced and returns inital state', () => {
    let state = store.getState().gamesFilter;
    expect(state).toEqual(initialState);
  });

  test('setsSelectedLabels sets state correctly', () => {
    const payload = [
      { id: 'kjbas', name: 'game1' },
      { id: 'asdasd', name: 'game2' },
    ];
    store.dispatch(actions.setSelectedLabels(payload));
    let state = store.getState().gamesFilter;
    expect(state.selectedLabels).toEqual(payload);
  });
  test('setCategoryMechanicOptions sets state correctly', () => {
    const payload = {
      mechanics: ['kajbas', 'sksjas', 'akjdbksa'],
      categories: ['kajbas', 'sksjas', 'akjdbksa'],
    };
    store.dispatch(actions.setCategoryMechanicOptions(payload));
    let state = store.getState().gamesFilter;
    expect(state.categoryOptions).toEqual(payload.categories);
    expect(state.mechanicOptions).toEqual(payload.mechanics);
  });
  test('setGamesData sets state correctly', () => {
    const payload = mockGameData;
    store.dispatch(actions.setGamesData(payload));
    let state = store.getState().gamesFilter;
    expect(state.gamesData).toEqual(payload.games);
    expect(state.filteredCategories).toEqual(payload.categories);
    expect(state.filteredMechanics).toEqual(payload.mechanics);
    expect(state.playtime).toEqual({
      min: payload.min_playtime,
      max: payload.max_playtime,
    });
    expect(state.playerCount).toEqual({
      min: payload.min_players,
      max: payload.max_players,
    });
    expect(state.gameDataLength).toEqual(mockGameData.length);
  });
  test('setIsAsc sets ascending to payload', () => {
    store.dispatch(actions.setIsAsc(true));
    let state = store.getState().gamesFilter;
    expect(state.isAsc).toBe(true);
  });
  test('loading sets loading to payload', () => {
    store.dispatch(actions.loading(true));
    let state = store.getState().gamesFilter;
    expect(state.loading).toBe(true);
  });
  test('resetGame data rests data in state', () => {
    store.dispatch(actions.resetGameData());
    let state = store.getState().gamesFilter;
    const gameData = {
      ...initialState,
      selectedLabels: state.selectedLabels,
      mechanicOptions: state.mechanicOptions,
      categoryOptions: state.categoryOptions,
    };
    expect(state).toEqual(gameData);
  });
});
