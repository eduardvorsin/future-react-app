import { configureStore } from '@reduxjs/toolkit';
import bookSlice from './bookSlice/bookSlice';

const setupStore = () => configureStore({
  reducer: {
    books: bookSlice,
  },
});

const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
