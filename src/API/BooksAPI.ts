/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getPageIndex } from '../helpers/helpers';
import i18n from '../localization/i18next';
import { BookInfo, BookPartialInfo, SearchOptions } from './bookTypes';
import { IBook, IBookPartial } from '../model/IBook';

type BooksQueryData = {
  totalItems: number,
  items: IBookPartial[],
};

type GetBooksResponse = {
  totalItems: number,
  items: BookPartialInfo[],
};

const booksPerPageLimit = 40;

export const BooksAPI = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.googleapis.com/books/v1/' }),
  tagTypes: ['Books', 'Book'],
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getBooks: builder.query<BooksQueryData, SearchOptions>({
      query: (options) => {
        const {
          bookName,
          sortOrder = 'relevance',
          category = 'all',
          page,
          searchBy = 'intitle',
        } = options;

        const currentCategory = category === 'all' ? '' : `+subject:${category}`;
        const startIndex = getPageIndex(page);
        const fields = 'totalItems,items(id,volumeInfo/authors,volumeInfo/title,volumeInfo/imageLinks,volumeInfo/maturityRating,saleInfo/retailPrice)';

        return {
          url: 'volumes',
          params: {
            q: `${searchBy}:${bookName}${currentCategory}`,
            orderBy: `${sortOrder}`,
            fields: `${fields}`,
            langRestrict: `${i18n.language}`,
            maxResults: `${booksPerPageLimit}`,
            startIndex: `${startIndex}`,
            key: `${process.env.API_KEY as string}`,
          },
        };
      },
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCacheData, responseData, otherArgs) => {
        if (otherArgs.arg.page > 0) {
          currentCacheData.items.push(...responseData.items);
          currentCacheData.totalItems = responseData.totalItems;
        } else {
          currentCacheData.items = responseData.items;
          currentCacheData.totalItems = responseData.totalItems;
        }
      },
      forceRefetch({ currentArg, previousArg }) {
        if (!currentArg || !previousArg) return true;

        const keys = Object.keys(currentArg ?? {}) as Array<keyof typeof currentArg>;
        const shouldRefetch = keys.some((key) => currentArg?.[key] !== previousArg?.[key]);

        return shouldRefetch;
      },
      transformResponse: (response: GetBooksResponse) => {
        const transformedData = {
          totalItems: response.totalItems,
        } as BooksQueryData;

        if (!response.items || !response.items.length) {
          transformedData.items = [];
        } else {
          transformedData.items = response.items.map((item) => ({
            id: item.id,
            clientId: uuidv4(),
            ...item.saleInfo,
            ...item.volumeInfo,
          }));
        }

        return transformedData;
      },
      providesTags: ['Books'],
    }),
    getBookById: builder.query<IBook, string>({
      query: (id) => {
        const fields = 'id,volumeInfo(authors,title,description,categories,imageLinks,language,maturityRating,pageCount,publishedDate,publisher,industryIdentifiers),accessInfo(webReaderLink),saleInfo(buyLink,isEbook,retailPrice)';

        return {
          url: `volumes/ ${id}`,
          params: {
            fields: `${fields}`,
            langRestrict: `${i18n.language}`,
            key: `${process.env.API_KEY as string}`,
          },
        };
      },
      transformResponse: (response: BookInfo) => {
        const transformedData: IBook = {
          ...response.volumeInfo,
          ...response.saleInfo,
          ...response.accessInfo,
        };

        return transformedData;
      },
      providesTags: ['Book'],
    }),
  }),
});

export const { useGetBooksQuery, useGetBookByIdQuery } = BooksAPI;
