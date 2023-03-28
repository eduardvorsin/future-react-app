/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookInfo } from '../../bookSlice/bookSlice';
import BooksAPI from '../../../API/BooksAPI';

const fetchDefiniteBook = createAsyncThunk<BookInfo, string, { rejectValue: string }>(
  'books/fetchDefiniteBook',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await BooksAPI.getDefiniteBook(id);

      if (!response.ok) {
        throw new Error('can\'t fetch current book');
      }

      const data = await response.json();

      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  },
);

export default fetchDefiniteBook;
