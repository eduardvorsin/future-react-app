/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import BooksAPI from '../../../API/BooksAPI';
import { BookPartialInfo, SearchOptions } from '../../../API/bookTypes';

type BooksData = {
  totalItems: number,
  items: BookPartialInfo[],
}

const fetchBooksError = 'Не удалось загрузить книги, попробуйте еще раз';

const fetchBooks = createAsyncThunk<BooksData, SearchOptions, { rejectValue: string }>(
  'books/fetchBooks',
  async (options: SearchOptions, { rejectWithValue }) => {
    try {
      const response = await BooksAPI.getBooks(options);

      if (!response.ok) {
        throw new Error(fetchBooksError);
      }

      const data = await response.json();

      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(fetchBooksError);
      }
    }
  },
);

export default fetchBooks;
