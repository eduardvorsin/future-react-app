import { getPageIndex } from '../helpers/helpers';
import { SearchOptions } from './bookTypes';

export default class BooksAPI {
  private static url = 'https://www.googleapis.com/books/v1/volumes';

  static async getBooks(options: SearchOptions) {
    const {
      bookName,
      sortOrder = 'relevance',
      category = 'all',
      page,
      searchBy = 'intitle',
    } = options;

    const currentCategory = category === 'all' ? '' : `+subject:${category}`;
    const startIndex = getPageIndex(page);

    const searchParams = [
      `q=${searchBy}:${bookName}${currentCategory}`,
      `orderBy=${sortOrder}`,
      'fields=totalItems,items(id,volumeInfo/authors,volumeInfo/title,volumeInfo/imageLinks,volumeInfo/maturityRating,saleInfo/retailPrice)',
      'langRestrict=ru',
      'maxResults=40',
      `startIndex=${startIndex}`,
      `key=${process.env.API_KEY as string}`,
    ].join('&');

    const response = await fetch(`${BooksAPI.url}?${searchParams}`);

    return response;
  }

  static async getDefiniteBook(id: string) {
    const searchParams = [
      'fields=id,volumeInfo(authors,title,description,categories,imageLinks,language,maturityRating,pageCount,publishedDate,publisher,industryIdentifiers),accessInfo(webReaderLink),saleInfo(buyLink,isEbook,retailPrice)',
      `key=${process.env.API_KEY as string}`,
    ].join('&');

    const response = await fetch(`${BooksAPI.url}/${id}?${searchParams}`);

    return response;
  }
}
