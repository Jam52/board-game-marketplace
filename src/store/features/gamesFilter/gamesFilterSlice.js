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
    loading: false,
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
      state.gamesData = action.payload.games;
    },
    loading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCategoryMechanicOptions,
  setGamesData,
  setSelectedLabels,
  loading,
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
      dispatch(setGamesData({ games: [] }));
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
