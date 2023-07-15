import { LoaderFunctionArgs, ParamParseKey, Params } from 'react-router-dom';
import fetchDefiniteBook from '../../store/thunks/fetchDefiniteBook/fetchDefiniteBook';
import { bookDescriptionPathName } from '../AppRouter/AppRouter';
import store from '../../store/store';

interface bookDescriptionLoaderArgs extends LoaderFunctionArgs {
  params: Params<ParamParseKey<bookDescriptionPathName>>
}

const bookDescriptionLoader = async ({ params }: bookDescriptionLoaderArgs): Promise<null> => {
  if (params.id) {
    store.dispatch(fetchDefiniteBook(params.id));
  }

  return null;
};

export default bookDescriptionLoader;
