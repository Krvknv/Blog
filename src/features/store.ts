import { combineReducers, configureStore } from '@reduxjs/toolkit';
import articleSlice from './slices/article-slice';
import userSlice from './slices/user-slice';

const rootReducer = combineReducers({
  userSlice,
  articleSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
