/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBook, IBookPartial } from '../../model/IBook';
import fetchBooks from '../thunks/fetchBooks/fetchBooks';
import fetchDefiniteBook from '../thunks/fetchDefiniteBook/fetchDefiniteBook';
import { SearchOptions } from '../../API/bookTypes';

type BooksState = {
  status: 'loading' | 'resolved' | 'rejected' | null,
  error: string | null,
  searchOptions: SearchOptions,
  totalItems: number,
  data: [] | IBookPartial[],
  currentBook: IBook | null,
}

const initialState: BooksState = {
  data: [],
  totalItems: 0,
  status: null,
  error: null,
  currentBook: null,
  searchOptions: {
    page: 0,
    bookName: '',
    sortOrder: 'relevance',
    category: 'all',
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
