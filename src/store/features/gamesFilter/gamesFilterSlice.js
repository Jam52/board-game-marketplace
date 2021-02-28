import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchDropdownOptions } from '../../../services/boardgameApi';

// export const fetchCategoryMechanicOptions = createAsyncThunk(
//   'gamesFilter/fetchDropdownOptions',
//   async () => {
//     const res = await fetchDropdownOptions();
//     return res;
//   },
// );

export const gamesFilterSlice = createSlice({
  name: 'gamesFilter',
  initialState: {
    categoryOptions: [],
    mechanicOptions: [],
    selectedLabels: [],
    selectedSubLabels: [],
    asc: false,
  },
  reducers: {
    addSelectedLabel: (state, action) => {
      console.log(action.payload);
      state.selectedLabels = [...state.selectedLabels, action.payload];
    },
    removeSelectedLabel: (state, action) => {
      const newState = state.selectedLabels.filter(
        (label) => label.id !== action.payload.id,
      );
      state.selectedLabels = newState;
    },
    setCategoryMechanicOptions: (state, action) => {
      if (state.categoryOptions.length === 0) {
        console.log(action.payload);
        state.categoryOptions = action.payload.categories;
        state.mechanicOptions = action.payload.mechanics;
      }
    },
  },
});

export const {
  addSelectedLabel,
  removeSelectedLabel,
  setCategoryMechanicOptions,
} = gamesFilterSlice.actions;

export function fetchCategoryMechanicOptions() {
  return async (dispatch) => {
    try {
      const res = await fetchDropdownOptions();

      dispatch(setCategoryMechanicOptions(res));
    } catch (error) {
      console.log(error);
    }
  };
}

export default gamesFilterSlice.reducer;
