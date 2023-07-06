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
    searchBy: 'intitle',
  },
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSearchPage: (state, action) => {
      state.searchOptions.page = action.payload;
    },
    setSearchSortOrder: (state, action) => {
      state.searchOptions.sortOrder = action.payload;
    },
    setSearchBookName: (state, action) => {
      state.searchOptions.bookName = action.payload;
    },
    setSearchCategory: (state, action) => {
      state.searchOptions.category = action.payload;
    },
    setSearchBy: (state, action) => {
      state.searchOptions.searchBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state, action) => {
        state.error = null;
        state.status = 'loading';
        state.totalItems = 0;

        if (action.meta.arg.page === 0) {
          state.data = [];
        }
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'rejected';
        state.totalItems = 0;
        state.data = [];
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
          ...item.saleInfo,
          id: item.id,
        }));

        if (action.meta.arg.page === 0) {
          state.data = items;
        } else {
          state.data = [...state.data, ...items];
        }

        state.searchOptions.page = action.meta.arg.page;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchDefiniteBook.pending, (state) => {
        state.error = null;
        state.status = 'loading';
        state.currentBook = null;
      })
      .addCase(fetchDefiniteBook.rejected, (state, action) => {
        state.status = 'rejected';
        state.currentBook = null;

        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(fetchDefiniteBook.fulfilled, (state, action) => {
        state.status = 'resolved';

        if (!action.payload) {
          return;
        }

        state.currentBook = {
          ...action.payload.volumeInfo,
          ...action.payload.saleInfo,
          ...action.payload.accessInfo,
        };
      });
  },
});

export const {
  setSearchPage,
  setSearchBookName,
  setSearchCategory,
  setSearchSortOrder,
  setSearchBy,
} = booksSlice.actions;

export default booksSlice.reducer;
