/* eslint-disable consistent-return */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BookInfo } from '../../../API/bookTypes';
import BooksAPI from '../../../API/BooksAPI';
import i18n from '../../../localization/i18next';

const fetchDefiniteBookError = i18n.t('fetchDefiniteBookError');

const fetchDefiniteBook = createAsyncThunk<BookInfo, string, { rejectValue: string }>(
  'books/fetchDefiniteBook',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await BooksAPI.getDefiniteBook(id);

      if (!response.ok) {
        throw new Error(fetchDefiniteBookError);
      }

      const data = await response.json();

      return data;
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(fetchDefiniteBookError);
      }
    }
  },
);

export default fetchDefiniteBook;
