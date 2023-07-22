import getLanguageName from '../localization/formatting/languageNames';
import { IBook } from '../model/IBook';
import i18n from '../localization/i18next';

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

type Characteristic = {
  name: string,
  value: string | number,
}

export const isValidHeadingLevel = (value: number): boolean => value >= 1 && value <= 7;

export const getPageIndex = (page: number) => {
  const booksPerPage = 40;
  return page * booksPerPage;
};

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

export const createCharacteristicsData = (bookData: IBook): Characteristic[] => {
  const characteristics = [] as Characteristic[];
  const fields = Object.keys(bookData) as (keyof IBook)[];

  fields.forEach((key) => {
    if (!isCharacteristicField(key)) return;

    const data: {
      name: keyof Characterstics,
      value: string | number,
    } = {
      name: i18n.t(`characteristics.${key}` as const, { ns: 'bookDescription' }),
      value: '',
    };

    switch (key) {
      case 'authors': {
        data.value = bookData[key]?.join(', ') ?? '';
        break;
      }
      case 'industryIdentifiers': {
        const identificators = bookData[key];
        if (identificators) {
          data.value = identificators[identificators.length - 1].identifier.toString();
        }
        break;
      }
      case 'isEbook': {
        data.name = i18n.t(`characteristics.${key}.name`, { ns: 'bookDescription' });
        const currentValue = bookData[key] ? 'trueValue' : 'falseValue';
        data.value = i18n.t(`characteristics.${key}.${currentValue}` as const, { ns: 'bookDescription' });
        break;
      }
      case 'maturityRating': {
        data.name = i18n.t(`characteristics.${key}.name`, { ns: 'bookDescription' });
        const currentValue = bookData[key] ? 'trueValue' : 'falseValue';
        data.value = i18n.t(`characteristics.${key}.${currentValue}` as const, { ns: 'bookDescription' });
        break;
      }
      case 'language': {
        data.value = getLanguageName(bookData[key]);
        break;
      }
      case 'pageCount':
      case 'publishedDate':
      case 'publisher': {
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

export const setColorTheme = (theme: 'dark' | 'light'): void => {
  localStorage.setItem('colorTheme', theme);
};

export const getSystemColorTheme = (): 'dark' | 'light' => {
  const isDarkTheme = matchMedia('(prefers-color-scheme:dark)').matches;
  return isDarkTheme ? 'dark' : 'light';
};

export const getColorTheme = (): 'dark' | 'light' => {
  const currentTheme = localStorage.getItem('colorTheme');

  if (!currentTheme) {
    return getSystemColorTheme();
  }

  return currentTheme as 'dark' | 'light';
};

export const createOptionsFromValues = (values: string[], localizationPath: string): Option[] => {
  const labels: string[] = values.map((value) => i18n.t(`${localizationPath}.${value}`, { ns: 'homePage' }));

  const options = values.map((value, index) => {
    const option = {
      value,
      label: labels[index],
    };

    return option;
  });

  return options;
};
