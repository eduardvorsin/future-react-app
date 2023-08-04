import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { BooksAPI, useGetBookByIdQuery, useGetBooksQuery } from './BooksAPI';
import store from '../../store/store';
import { BookCategories, BookSearchBy, BookSortOrder } from './bookTypes';
import dummyBooks from '../../tests/dummyBooks';
import { setupServerWithErrors } from '../../tests/server';
import dummyDefiniteBook from '../../tests/dummyDefiniteBook';
import ReduxWrapper from '../../tests/helpers/ReduxWrapper';

type MockQueryError = {
  status: string,
  data: {
    code: number,
    message: string,
    status: string,
  },
};

describe('useGetBooksQuery tests', () => {
  afterEach(async () => {
    await waitFor(() => {
      store.dispatch(BooksAPI.util.resetApiState());
    });
  });

  it('if the request for books was successful, it should return an array of these books', async () => {
    const searchOptions = {
      bookName: 'Vue js',
      sortOrder: 'relevance' as BookSortOrder,
      category: 'all' as BookCategories,
      page: 0,
      searchBy: 'intitle' as BookSearchBy,
    };

    const { result } = renderHook(() => useGetBooksQuery(searchOptions), { wrapper: ReduxWrapper });
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    const { data } = result.current;

    expect(data?.totalItems).toBe(2);
    expect(data?.items[0].maturityRating).toBe(dummyBooks.items[0].volumeInfo.maturityRating);
    expect(data?.items[1].title).toBe(dummyBooks.items[1].volumeInfo.title);
  });

  it('if the book request failed, it should return an error', async () => {
    setupServerWithErrors();
    const searchOptions = {
      bookName: 'Vue js',
      sortOrder: 'relevnce',
      category: 'all' as BookCategories,
      page: 0,
      searchBy: 'intitle' as BookSearchBy,
    };

    // @ts-expect-error - checking an incorrect query with a non-existent value for SortOrder
    const { result } = renderHook(() => useGetBooksQuery(searchOptions), { wrapper: ReduxWrapper });
    await waitFor(() => expect(result.current.isError).toBeTruthy());
    const error = result.current.error as MockQueryError;

    expect(result.current.data).toBeUndefined();
    expect(error.status).toBe(400);
    expect(error.data).not.toBeUndefined();
  });
});

describe('useGetBookByIdQuery tests', () => {
  afterEach(async () => {
    await waitFor(() => {
      store.dispatch(BooksAPI.util.resetApiState());
    });
  });

  it('if a request for a particular book was executed successfully, then it should return data about this book', async () => {
    const { result } = renderHook(() => useGetBookByIdQuery('ZGGLDwAAQBAJ'), { wrapper: ReduxWrapper });
    await waitFor(() => expect(result.current.isSuccess).toBeTruthy());

    const { data } = result.current;
    expect(data?.authors).toEqual(dummyDefiniteBook.volumeInfo.authors);
    expect(data?.description).toBe(dummyDefiniteBook.volumeInfo.description);
    expect(data?.retailPrice).toEqual(dummyDefiniteBook.saleInfo.retailPrice);
  });

  it('if a request for a particular book was failed, then it should return an error', async () => {
    setupServerWithErrors();

    const { result } = renderHook(() => useGetBookByIdQuery('123456789101'), { wrapper: ReduxWrapper });
    await waitFor(() => expect(result.current.isError).toBeTruthy());
    const error = result.current.error as MockQueryError;

    expect(result.current.data).toBeUndefined();
    expect(error.status).toBe(404);
    expect(error.data).not.toBeUndefined();
  });
});


