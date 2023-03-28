/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBook } from '../../model/IBook';
import fetchBooks from '../thunks/fetchBooks/fetchBooks';
import fetchDefiniteBook from '../thunks/fetchDefiniteBook/fetchDefiniteBook';

export type BookCategories = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry';
export type BookSortOrder = 'relevance' | 'newest';

export type BookInfo = {
  id: string,
  volumeInfo: IBook,
}

type StateData = {
  page: number,
  totalItems: number,
  currentBook: IBook | null,
  items: [] | IBook[],
}

type BooksState = {
  status: 'loading' | 'resolved' | 'rejected' | null,
  error: string | null,
  data: StateData,
}

const initialState: BooksState = {
  status: null,
  error: null,
  data: {
    page: 0,
    totalItems: 0,
    currentBook: null,
    items: [],
  },
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state, action) => {
        state.error = null;
        state.status = 'loading';
        state.data.totalItems = 0;

        if (action.meta.arg.page === 0) {
          state.data.items = [];
        }
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'rejected';
        state.data.totalItems = 0;
        state.data.items = [];
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'resolved';

        if (!action.payload.items) {
          return;
        }

        const items = action.payload.items.map((item) => ({
          ...item.volumeInfo,
          id: item.id,
        }));

        if (action.payload.page === 0) {
          state.data.items = items;
        } else {
          state.data.items = [...state.data.items, ...items];
        }

        state.data.page = action.payload.page;
        state.data.totalItems = action.payload.totalItems;
      })
      .addCase(fetchDefiniteBook.pending, (state) => {
        state.error = null;
        state.status = 'loading';
        state.data.currentBook = null;
      })
      .addCase(fetchDefiniteBook.rejected, (state, action) => {
        state.status = 'rejected';
        state.data.currentBook = null;

        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(fetchDefiniteBook.fulfilled, (state, action) => {
        state.status = 'resolved';

        if (!action.payload) {
          return;
        }

        state.data.currentBook = {
          ...action.payload.volumeInfo,
          id: action.payload.id,
        };
      });
  },
});

export default booksSlice.reducer;
