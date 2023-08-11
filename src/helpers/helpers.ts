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
type Option = {
  label: string,
  value: string,
}

export const isValidHeadingLevel = (value: number): boolean => {
  if (Number.isNaN(+value)) {
    throw new Error('The value argument must be a number');
  }

  return value >= 1 && value <= 6;
};

export const getPageIndex = (page: number) => {
  if (Number.isNaN(+page)) {
    throw new Error('The page argument must be a number');
  }

  if (page < 0) return 0;

  const booksPerPage = 40;
  return page * booksPerPage;
};

export const isCharacteristicField = (field: string): field is keyof Characterstics => {
  if (typeof field !== 'string') {
    return false;
  }

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
  if (typeof bookData !== 'object') {
    throw new Error('the bookData parameter should only be an object');
  }

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
  if (typeof theme !== 'string') return;

  if (theme !== 'light' && theme !== 'dark') {
    throw new Error('The theme parameter should only be equal to light or dark');
  }

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

export const createOptionsFromValues = (values: string[], localizationPath = ''): Option[] => {
  if (!Array.isArray(values)) {
    throw new Error('the values parameter must be an array');
  }

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
