import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { BooksAPI } from '../API/BooksAPI/BooksAPI';

const setupStore = () => configureStore({
  reducer: {
    [BooksAPI.reducerPath]: BooksAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(BooksAPI.middleware),
});

const store = setupStore();

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
