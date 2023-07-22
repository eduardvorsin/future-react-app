import { configureStore } from '@reduxjs/toolkit';
import { BooksAPI } from '../API/BooksAPI';

const setupStore = () => configureStore({
  reducer: {
    [BooksAPI.reducerPath]: BooksAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(BooksAPI.middleware),
});

const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
