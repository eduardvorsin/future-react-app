import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { BooksAPI } from '../API/BooksAPI/BooksAPI';

const rootReducer = combineReducers({
  [BooksAPI.reducerPath]: BooksAPI.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export const setupStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(BooksAPI.middleware),
});

const store = setupStore();
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export default store;
