import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    asc: false,
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
      console.log(action.payload);
      const {
        min_players,
        max_players,
        games,
        min_playtime,
        max_playtime,
        mechanics,
        categories,
        asc,
      } = action.payload;

      state.asc = asc;
      state.filteredCategories = categories;
      state.filteredMechanics = mechanics;
      state.playerCount = { min: min_players, max: max_players };
      state.playtime = { min: min_playtime, max: max_playtime };
      state.gamesData = games;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
    setAsc: (state, action) => {
      state.asc = action.payload;
    },
  },
});

export const {
  setCategoryMechanicOptions,
  setGamesData,
  setSelectedLabels,
  loading,
  setAsc,
} = gamesFilterSlice.actions;

export default gamesFilterSlice.reducer;

export const addSelectedLabel = (newLabel) => {
  return async (dispatch, getState) => {
    //get current state
    const currentState = getState().gamesFilter;
    // add label to currentLabels
    const updatedSelectedLabels = [...currentState.selectedLabels, newLabel];
    //set selectedLabels to newLabels
    dispatch(setSelectedLabels(updatedSelectedLabels));

    //build search query, fetch data and setData in state
    try {
      dispatch(loading(true));
      const query = searchQueryFromSelectedLabels(
        updatedSelectedLabels,
        currentState.asc,
      );
      const gameData = await fetchGameData(query);
      dispatch(setGamesData(gameData.data));
      dispatch(loading(false));
    } catch (e) {
      dispatch(loading(false));
      console.log(e);
    }
  };
};

export const removeSelectedLabel = (newLabel) => {
  return async (dispatch, getState) => {
    //get current state
    const currentState = getState().gamesFilter;
    //filter labels to remove selected label
    const filteredLabels = currentState.selectedLabels.filter(
      (label) => label.id !== newLabel.id,
    );
    //set selectedLabels to filtredLabels
    dispatch(setSelectedLabels(filteredLabels));

    //build search query, fetch data and setData in state if there are any selected labels
    if (filteredLabels.length > 0) {
      const query = searchQueryFromSelectedLabels(
        filteredLabels,
        currentState.asc,
      );
      try {
        dispatch(loading(true));
        const gameData = await fetchGameData(query);
        dispatch(setGamesData(gameData.data));
        dispatch(loading(false));
      } catch (e) {
        dispatch(loading(false));
        console.log(e);
      }
    } else {
      dispatch(loading(false));
      dispatch(
        setGamesData({
          min_players: 1,
          max_players: 1000,
          games: [],
          min_playtime: 0,
          max_playtime: 10000,
          mechanics: [],
          categories: [],
          asc: false,
        }),
      );
    }
  };
};

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
