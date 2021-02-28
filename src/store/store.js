import { configureStore } from '@reduxjs/toolkit';
import gamesFilterReducer from './features/gamesFilter/gamesFilterSlice';

export default configureStore({
  reducer: {
    gamesFilter: gamesFilterReducer,
  },
});
