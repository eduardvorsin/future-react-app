import { IBook } from '../model/IBook';
import {
  createCharacteristicsData, createOptionsFromValues, getColorTheme,
  getPageIndex, getSystemColorTheme, isCharacteristicField, isValidHeadingLevel, setColorTheme,
} from './helpers';

describe('isValidHeadingLevel tests', () => {
  it('if not a number is passed, it should throw an error', () => {
    expect(() => {
      // @ts-expect-error - checking the case when value is not a number
      isValidHeadingLevel('a');
    }).toThrow('The value argument must be a number');
  });

  it('if the value is in the range from 1 to 6, it will return true', () => {
    expect(isValidHeadingLevel(1)).toBeTruthy();
    expect(isValidHeadingLevel(6)).toBeTruthy();
  });

  it('if a number is passed outside the range from 1 to 6 then return false', () => {
    expect(isValidHeadingLevel(50)).toBeFalsy();
  });
});

describe('getPageIndex tests', () => {
  it('If not a number is passed, it should throw an error', () => {
    expect(() => {
      // @ts-expect-error - checking the case when page is not a number
      getPageIndex('b');
    }).toThrow('The page argument must be a number');
  });

  it('if the page argument is 3 it should return 120', () => {
    expect(getPageIndex(3)).toBe(120);
  });

  it('If page is 0 it will return 0', () => {
    expect(getPageIndex(0)).toBe(0);
  });
});

describe('isCharacteristicField tests', () => {
  it('if the value is in the characteristicFields array it will return true', () => {
    expect(isCharacteristicField('authors')).toBeTruthy();
  });

  it('If the value is not in the characteristicFields array, it returns false', () => {
    expect(isCharacteristicField('abcd')).toBeFalsy();
  });

  it('If not a string is passed, it should return false', () => {
    // @ts-expect-error - checking the case when field is not a string
    expect(isCharacteristicField(1)).toBeFalsy();
  });
});

describe('createCharacteristicsData tests', () => {
  it('if the bookData parameter is not an object then it should throw an error', () => {
    expect(() => {
      // @ts-expect-error - checking the case when bookData is not an object
      createCharacteristicsData('');
    }).toThrow('the bookData parameter should only be an object');
  });

  it('if an empty object is passed to the bookData parameter, an empty array is returned', () => {
    // @ts-expect-error - checking the case when bookData is an empty object
    expect(createCharacteristicsData({})).toEqual([]);
  });

  it('if the bookData parameter is of the correct type it should return an array of characteristics', () => {
    const mockBookData: IBook = {
      authors: ['author1', 'author2'],
      categories: ['category1', 'category2'],
      description: 'description',
      language: 'en',
      maturityRating: 'NOT_MATURE',
      pageCount: 100,
      publishedDate: '04.03.21',
      publisher: 'publisher',
      title: 'title',
      isEbook: true,
      webReaderLink: '',
      buyLink: '',
      industryIdentifiers: [{
        type: 'ISBN',
        identifier: 111223334455566,
      }],
    };
    const result = createCharacteristicsData(mockBookData);

    expect(result).toHaveLength(8);
    expect(result[6].name).toBe('Book Type');
    expect(result[6].value).toBe('E-book');
  });
});

describe('setColorTheme tests', () => {
  it('if not a string is passed, the data about the color theme will not be saved in the local storage', () => {
    // @ts-expect-error - checking the case when theme is not a string
    setColorTheme(1);
    expect(localStorage.getItem('colorTheme')).toBeNull();
  });

  it('if the theme value is not equal to light or dark, an error will be displayed', () => {
    expect(() => {
      // @ts-expect-error - checking the case when the theme is not equal to light or dark
      setColorTheme('mixed');
    }).toThrow('The theme parameter should only be equal to light or dark');
  });

  it('If the correct value for the topic is passed, it will be saved in the local storage', () => {
    setColorTheme('dark');
    expect(localStorage.getItem('colorTheme')).toBe('dark');
  });
});

describe('getSystemColorTheme tests', () => {
  it('if there is a dark theme in the system, it will return dark', () => {
    expect(getSystemColorTheme()).toBe('dark');
  });

  it('if there is a light theme in the system, it will return light', () => {
    jest.spyOn(window, 'matchMedia').mockReturnValueOnce({
      media: '',
      matches: false,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    });

    expect(getSystemColorTheme()).toBe('light');
  });
});

describe('getColorTheme tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('if there is an entry in the local store about the current topic, this value will be returned', () => {
    localStorage.setItem('colorTheme', 'light');

    expect(getColorTheme()).toBe('light');
  });

  it('if there is no entry in the local store about the current topic, the value of the system theme will return', () => {
    expect(getColorTheme()).toBe('dark');
  });
});

describe('createOptionsFromValues tests', () => {
  it('if an array is not passed to values, then it should return an error', () => {
    expect(() => {
      // @ts-expect-error - checking the case when the values parameter is not equal to an array
      createOptionsFromValues('', '');
    }).toThrow('the values parameter must be an array');
  });

  it('if parameters are passed according to their types, it should return an array of options', () => {
    const values = ['a', 'b', 'c'];
    const result = createOptionsFromValues(values, 'chars');

    expect(result).toHaveLength(3);
    expect(result[0].label).toBe('chars.a');
    expect(result[0].value).toBe('a');
  });
});
