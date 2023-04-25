import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { filterReducer } from './filterSlice';
import { contactAPI } from './contacts/contactAPI';

const rootReducer = combineReducers({
  filter: filterReducer,
  [contactAPI.reducerPath]: contactAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactAPI.middleware),
});
