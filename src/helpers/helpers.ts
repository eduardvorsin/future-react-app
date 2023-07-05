import getLanguageName from '../localization/formatting/languageNames';
import { IBook } from '../model/IBook';

export const isValidHeadingLevel = (value: number): boolean => value >= 1 && value <= 7;

export const getPageIndex = (page: number) => {
  const booksPerPage = 40;
  return page * booksPerPage;
};

type Characterstics = {
  authors: string,
  language: string,
  maturityRating: 'NOT_MATURE' | 'MATURE',
  pageCount: number,
  publishedDate: string,
  publisher: string,
  isEbook: boolean,
  industryIdentifiers: string,
}

const isCharacteristicField = (field: string): field is keyof Characterstics => {
  const characteristicFields = new Set([
    'authors',
    'language',
    'maturityRating',
    'pageCount',
    'publishedDate',
    'publisher',
    'isEbook',
    'industryIdentifiers',
  ]);

  return characteristicFields.has(field);
};

type Characteristic = {
  name: string,
  value: string | number,
}

export const createCharacteristicsData = (bookData: IBook): Characteristic[] => {
  const characteristics = [] as Characteristic[];
  const fields = Object.keys(bookData) as (keyof IBook)[];

  fields.forEach((key) => {
    if (!isCharacteristicField(key)) return;

    const data: {
      name: string,
      value: string | number,
    } = {
      name: '',
      value: '',
    };

    switch (key) {
      case 'authors': {
        data.value = bookData[key]?.join(', ') ?? '';
        data.name = 'Авторы';
        break;
      }
      case 'industryIdentifiers': {
        data.name = 'ISBN';
        const identificators = bookData[key];
        if (identificators) {
          data.value = identificators[identificators.length - 1].identifier.toString();
        }
        break;
      }
      case 'isEbook': {
        data.name = 'Электронная книга';
        data.value = bookData[key] ? 'Да' : 'Нет';
        break;
      }
      case 'maturityRating': {
        data.name = '18+';
        data.value = bookData[key] ? 'Да' : 'Нет';
        break;
      }
      case 'language': {
        data.name = 'Язык';
        data.value = getLanguageName(bookData[key]);
        break;
      }
      case 'pageCount': {
        data.name = 'Количество страниц';
        data.value = bookData[key];
        break;
      }
      case 'publishedDate': {
        data.name = 'Дата публикации';
        data.value = bookData[key];
        break;
      }
      case 'publisher': {
        data.name = 'Издатель';
        data.value = bookData[key];
        break;
      }
      default: {
        break;
      }
    }

    characteristics.push(data);
  });

  return characteristics;
};

export const saveVerticalScrollPosition = (): void => {
  sessionStorage.setItem('scrollY', window.scrollY.toString());
};

export const getVerticalScrollPosition = (): string | null => sessionStorage.getItem('scrollY');

export const resetVerticalScrollPosition = (): void => {
  sessionStorage.setItem('scrollY', '0');
};
