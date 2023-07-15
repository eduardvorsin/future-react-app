export interface VolumeInfo {
  authors?: string[],
  categories?: string[],
  description?: string,
  language: string,
  maturityRating: 'NOT_MATURE' | 'MATURE',
  pageCount: number,
  publishedDate: string,
  publisher: string,
  title: string,
  industryIdentifiers?: {
    type: string,
    identifier: number,
  }[],
  imageLinks?: {
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
  retailPrice?: {
    amount: number,
    currencyCode: string,
  },
}

export interface BookInfo {
  id: string,
  volumeInfo: VolumeInfo,
  accessInfo: AccessInfo,
  saleInfo: SaleInfo,
}

export interface BookPartialInfo {
  id: string,
  saleInfo: Pick<SaleInfo, 'retailPrice'>,
  volumeInfo: Pick<VolumeInfo, 'title' | 'authors' | 'categories' | 'maturityRating' | 'imageLinks'>;
}

export type BookCategories = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry';
export type BookSortOrder = 'relevance' | 'newest';

export type BookSearchBy = 'intitle' | 'inauthor' | 'inpublisher' | 'isbn';

export type SearchOptions = {
  page: number,
  bookName: string,
  sortOrder: BookSortOrder,
  category: BookCategories,
  searchBy: BookSearchBy
}

export type CategoryOption = {
  value: BookCategories,
  label: string
}

export type SorterOrderOption = {
  value: BookSortOrder,
  label: string
}

export type SearchByOption = {
  value: BookSearchBy,
  label: string,
}
