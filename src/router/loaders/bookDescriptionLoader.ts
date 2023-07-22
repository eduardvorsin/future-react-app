import { LoaderFunctionArgs, ParamParseKey, Params } from 'react-router-dom';
import { bookDescriptionPathName } from '../AppRouter/AppRouter';
import store from '../../store/store';
import { BooksAPI } from '../../API/BooksAPI';
import i18n from '../../localization/i18next';
import { IBook } from '../../model/IBook';

interface bookDescriptionLoaderArgs extends LoaderFunctionArgs {
  params: Params<ParamParseKey<bookDescriptionPathName>>
}

// eslint-disable-next-line max-len
const bookDescriptionLoader = async ({ params }: bookDescriptionLoaderArgs): Promise<IBook | null> => {
  if (!params.id) return null;

  const promise = store.dispatch(BooksAPI.endpoints.getBookById.initiate(params.id));

  try {
    const response = await promise.unwrap();
    return response;
  } catch (e) {
    throw new Error(i18n.t('fetchDefiniteBookError'));
  } finally {
    promise.unsubscribe();
  }
};

export default bookDescriptionLoader;
