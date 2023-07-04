/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import BooksAPI from '../../../API/BooksAPI';
import { BookPartialInfo, SearchOptions } from '../../../API/bookTypes';

type BooksData = {
  totalItems: number,
  items: BookPartialInfo[],
  page: number,
}

const fetchBooks = createAsyncThunk<BooksData, SearchOptions, { rejectValue: string }>(
  'books/fetchBooks',
  async (options: SearchOptions, { rejectWithValue }) => {
    try {
      const response = await BooksAPI.getBooks(options);

      if (!response.ok) {
        throw new Error('Не удалось загрузить книи');
      }

      const data = await response.json();

      return {
        ...data,
        page: options.page,
      };
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  },
);

export default fetchBooks;
