/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookInfo } from '../../bookSlice/bookSlice';
import BooksAPI, { getBooksOptions } from '../../../API/BooksAPI';

type BooksData = {
  totalItems: number,
  items: BookInfo[],
  page: number,
}

const fetchBooks = createAsyncThunk<BooksData, getBooksOptions, { rejectValue: string }>(
  'books/fetchBooks',
  async (options: getBooksOptions, { rejectWithValue }) => {
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
