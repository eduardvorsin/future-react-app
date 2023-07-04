export type BookCategories = 'all' | 'art' | 'biography' | 'computers' | 'history' | 'medical' | 'poetry';
export type BookSortOrder = 'relevance' | 'newest';

export type SearchOptions = {
  page: number,
  bookName: string,
  sortOrder: BookSortOrder,
  category: BookCategories,
}
