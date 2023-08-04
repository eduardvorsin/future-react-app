import i18n from '../../localization/i18next';
import { setupServerWithErrors } from '../../tests/server';
import bookDescriptionLoader from './bookDescriptionLoader';
import dummyDefiniteBook from '../../tests/dummyDefiniteBook';

describe('bookDescriptionLoader tests', () => {
  it('should return null if params.id missing', async () => {
    const params = {};
    // @ts-expect-error - checking when the id property is missing
    const result = await bookDescriptionLoader({ params });

    expect(result).toBeNull();
  });

  it('should throw an error if the request for data failed', async () => {
    setupServerWithErrors();
    const localizedError = i18n.t('fetchDefiniteBookError');
    const params = { id: '123456789010' };
    const request = new Request('/');

    await expect(bookDescriptionLoader({ params, request })).rejects.toThrow(localizedError);
  });

  it('should return an iBook type object if the request was successful', async () => {
    const params = { id: 'ZGGLDwAAQBAJ' };
    const request = new Request('/');

    const result = await bookDescriptionLoader({ params, request });

    expect(result?.imageLinks).toEqual(dummyDefiniteBook.volumeInfo.imageLinks);
    expect(result?.isEbook).toEqual(dummyDefiniteBook.saleInfo.isEbook);
    expect(result?.language).toEqual(dummyDefiniteBook.volumeInfo.language);
  });
});
