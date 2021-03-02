import { createSlice } from '@reduxjs/toolkit';
import { fetchDropdownOptions } from '../../../services/boardgameApi';
import { searchQueryFromSelectedLabels } from './helperFunction';
import { fetchGameData } from '../../../services/boardgameApi';

export const gamesFilterSlice = createSlice({
  name: 'gamesFilter',
  initialState: {
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
  },
  reducers: {
    setSelectedLabels: (state, action) => {
      state.selectedLabels = action.payload;
    },
    setCategoryMechanicOptions: (state, action) => {
      if (state.categoryOptions.length === 0) {
        state.categoryOptions = action.payload.categories;
        state.mechanicOptions = action.payload.mechanics;
      }
    },
    setGamesData: (state, action) => {
      const {
        min_players,
        max_players,
        games,
        min_playtime,
        max_playtime,
        mechanics,
        categories,
      } = action.payload;

      state.filteredCategories = categories;
      state.filteredMechanics = mechanics;
      state.playerCount = { min: min_players, max: max_players };
      state.playtime = { min: min_playtime, max: max_playtime };
      state.gamesData = games;
    },
    setIsAsc: (state, action) => {
      state.isAsc = action.payload;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
    resetGameData: (state) => {
      state.filteredCategories = [];
      state.filteredMechanics = [];
      state.playerCount = { min: 1, max: 1000 };
      state.playtime = { min: 1, max: 10000 };
      state.gamesData = [];
      state.loading = false;
      state.isAsc = false;
    },
  },
});

export const {
  setCategoryMechanicOptions,
  setGamesData,
  setSelectedLabels,
  loading,
  setIsAsc,
  resetGameData,
} = gamesFilterSlice.actions;

export default gamesFilterSlice.reducer;

//fetch games and update state
const fetchGamesAndSetDataInState = (query) => {
  return async (dispatch) => {
    dispatch(loading(true));
    try {
      const gameData = await fetchGameData(query);
      dispatch(setGamesData(gameData.data));
      dispatch(loading(false));
    } catch (e) {
      dispatch(loading(false));
      console.log(e);
    }
  };
};

// add selected label to state and dispatch action to fetch games and add to state
export const addSelectedLabel = (newLabel) => {
  return async (dispatch, getState) => {
    const currentState = getState().gamesFilter;
    const updatedSelectedLabels = [...currentState.selectedLabels, newLabel];

    dispatch(setSelectedLabels(updatedSelectedLabels));

    const query = searchQueryFromSelectedLabels(
      updatedSelectedLabels,
      currentState.isAsc,
    );

    dispatch(fetchGamesAndSetDataInState(query));
  };
};

//remove label from state, if there are labels in state fetch and set data, else reset game data in state
export const removeSelectedLabel = (newLabel) => {
  return async (dispatch, getState) => {
    const currentState = getState().gamesFilter;

    const filteredLabels = currentState.selectedLabels.filter(
      (label) => label.id != newLabel.id,
    );

    dispatch(setSelectedLabels(filteredLabels));

    if (filteredLabels.length > 0) {
      const query = searchQueryFromSelectedLabels(
        filteredLabels,
        currentState.isAsc,
      );
      dispatch(fetchGamesAndSetDataInState(query));
    } else {
      dispatch(resetGameData());
    }
  };
};

//add sublabel to state, removing previouse label if of same type, reset all game data if no labels in state
export const addSubLabelToSelectedLabels = (newLabel) => {
  return async (dispatch, getState) => {
    const filteredLabels = getState().gamesFilter.selectedLabels.filter(
      (label) => label.type !== newLabel.type,
    );
    if (newLabel.id !== 'null') {
      filteredLabels.push(newLabel);
    }
    dispatch(setSelectedLabels(filteredLabels));

    if (filteredLabels.length > 0) {
      const query = searchQueryFromSelectedLabels(filteredLabels);
      dispatch(fetchGamesAndSetDataInState(query));
    } else {
      dispatch(resetGameData());
    }
  };
};

//update Asc in state, fetch and set new game data
export const setAsc = (asc) => {
  return async (dispatch, getState) => {
    const currentLabels = getState().gamesFilter.selectedLabels;

    if (currentLabels.length > 0) {
      const query = searchQueryFromSelectedLabels(currentLabels, asc);
      dispatch(setIsAsc(asc));
      dispatch(fetchGamesAndSetDataInState(query));
    }
  };
};

//fetch category and mechanic dropdown options from api and set in state
export const fetchCategoryMechanicOptions = () => {
  return async (dispatch) => {
    try {
      const res = await fetchDropdownOptions();
      dispatch(setCategoryMechanicOptions(res));
    } catch (error) {
      console.log(error);
    }
  };
};
