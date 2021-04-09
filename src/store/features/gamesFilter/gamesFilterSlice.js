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
    isAsc: false,
    gamesData: [],
    playtime: { min: 0, max: 1000 },
    loading: false,
    playerCount: { min: 0, max: 1000 },
    filteredCategories: [],
    filteredMechanics: [],
    gamesDataLength: 0,
    currentPage: 0,
    orderBy: 'average_user_rating',
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
        length,
      } = action.payload;

      state.filteredCategories = categories;
      state.filteredMechanics = mechanics;
      state.playerCount = { min: min_players, max: max_players };
      state.playtime = { min: min_playtime, max: max_playtime };
      state.gamesData = games;
      state.gamesDataLength = length;
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
      state.playerCount = { min: 0, max: 1000 };
      state.playtime = { min: 0, max: 1000 };
      state.gamesData = [];
      state.loading = false;
      state.isAsc = false;
      state.gamesDataLength = 0;
      state.currentPage = 0;
      state.orderBy = 'average_user_rating';
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    orderBy: (state, action) => {
      state.orderBy = action.payload;
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
  setPage,
  orderBy,
} = gamesFilterSlice.actions;

export default gamesFilterSlice.reducer;

//fetch games and update state
const fetchGamesAndSetDataInState = () => {
  return async (dispatch, getState) => {
    const {
      selectedLabels,
      isAsc,
      orderBy,
      currentPage,
    } = getState().gamesFilter;
    const query = searchQueryFromSelectedLabels(
      selectedLabels,
      isAsc,
      currentPage,
      orderBy,
    );
    dispatch(loading(true));
    try {
      const gameData = await fetchGameData(query);
      if (gameData.data.games.length > 0) {
        dispatch(setGamesData(gameData.data));
      }
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
    dispatch(setPage(0));
    dispatch(setSelectedLabels(updatedSelectedLabels));
    dispatch(fetchGamesAndSetDataInState());
  };
};

//remove label from state, if there are labels in state fetch and set data, else reset game data in state
export const removeSelectedLabel = (newLabel) => {
  return async (dispatch, getState) => {
    const currentState = getState().gamesFilter;

    const filteredLabels = currentState.selectedLabels.filter(
      (label) => label.id !== newLabel.id,
    );
    const selectedLabels = filteredLabels.filter(
      (label) => label.type === 'category' || label.type === 'mechanic',
    );
    dispatch(setSelectedLabels(filteredLabels));
    dispatch(setPage(0));
    if (filteredLabels.length > 0) {
      dispatch(fetchGamesAndSetDataInState());
    }
    if (selectedLabels.length === 0) {
      console.log('resetting');
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
    dispatch(setPage(0));
    if (filteredLabels.length > 0) {
      dispatch(fetchGamesAndSetDataInState());
    } else {
      dispatch(resetGameData());
    }
  };
};

//update Asc in state, fetch and set new game data
export const setAsc = (asc) => {
  return async (dispatch, getState) => {
    dispatch(setIsAsc(asc));
    const state = getState().gamesFilter;
    if (state.selectedLabels.length > 0) {
      dispatch(fetchGamesAndSetDataInState());
    }
  };
};

//update skip page value in state, fetch and set new game data
export const setPageSkipValue = (skipNumber) => {
  return async (dispatch, getState) => {
    const state = getState().gamesFilter;
    if (state.currentPage !== skipNumber) {
      dispatch(setPage(skipNumber));
      dispatch(fetchGamesAndSetDataInState());
    }
  };
};

//update order by value in state and fetch and set new game data
export const setOrderBy = (orderByValue) => {
  return async (dispatch, getState) => {
    dispatch(orderBy(orderByValue));
    const state = getState().gamesFilter;
    if (state.selectedLabels.length > 0) {
      dispatch(fetchGamesAndSetDataInState());
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
