export interface VolumeInfo {
  authors: string[],
  categories: string[],
  description: string,
  language: string,
  maturityRating: 'NOT_MATURE' | 'MATURE',
  pageCount: number,
  publishedDate: string,
  publisher: string,
  title: string,
  industryIdentifiers: {
    type: string,
    identifier: number,
  }[],
  imageLinks: {
    smallThumbnail: string,
    thumbnail: string,
    extraLarge?: string,
    large?: string,
    medium?: string,
    small?: string,
  },
}

export interface AccessInfo {
  webReaderLink: string,
}

export interface SaleInfo {
  buyLink: string,
  isEbook: boolean,
  retailPrice: {
    amount: number,
    currencyCode: string,
  },
}
export type BookCategories = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry';
export type BookSortOrder = 'relevance' | 'newest';

export type SearchOptions = {
  page: number,
  bookName: string,
  sortOrder: BookSortOrder,
  category: BookCategories,
}
