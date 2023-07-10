/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBook, IBookPartial } from '../../model/IBook';
import fetchBooks from '../thunks/fetchBooks/fetchBooks';
import fetchDefiniteBook from '../thunks/fetchDefiniteBook/fetchDefiniteBook';
import { BookCategories, BookSearchBy, BookSortOrder, SearchOptions } from '../../API/bookTypes';

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
    setSearchPage: (state: BooksState, action: PayloadAction<number>) => {
      state.searchOptions.page = action.payload;
    },
    setSearchSortOrder: (state: BooksState, action: PayloadAction<BookSortOrder>) => {
      state.searchOptions.sortOrder = action.payload;
    },
    setSearchBookName: (state: BooksState, action: PayloadAction<string>) => {
      state.searchOptions.bookName = action.payload;
    },
    setSearchCategory: (state: BooksState, action: PayloadAction<BookCategories>) => {
      state.searchOptions.category = action.payload;
    },
    setSearchBy: (state: BooksState, action: PayloadAction<BookSearchBy>) => {
      state.searchOptions.searchBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state: BooksState, action) => {
        state.error = null;
        state.status = 'loading';
        state.totalItems = 0;

        if (action.meta.arg.page === 0) {
          state.data = [];
        }
      })
      .addCase(fetchBooks.rejected, (state: BooksState, action) => {
        state.status = 'rejected';
        state.totalItems = 0;
        state.data = [];
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(fetchBooks.fulfilled, (state: BooksState, action) => {
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
      .addCase(fetchDefiniteBook.pending, (state: BooksState) => {
        state.error = null;
        state.status = 'loading';
        state.currentBook = null;
      })
      .addCase(fetchDefiniteBook.rejected, (state: BooksState, action) => {
        state.status = 'rejected';
        state.currentBook = null;

        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(fetchDefiniteBook.fulfilled, (state: BooksState, action) => {
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
