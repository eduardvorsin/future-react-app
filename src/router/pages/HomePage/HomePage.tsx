import React, { useEffect } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAppDispatch from '../../../hooks/useAppDispatch/useAppDispatch';
import fetchBooks from '../../../store/thunks/fetchBooks/fetchBooks';
import Title from '../../../components/UI/Title/Title';
import classes from './HomePage.module.css';
import useAppSelector from '../../../hooks/useAppSelector/useAppSelector';
import BooksCount from '../../../components/BL/BooksCount/BooksCount';
import BooksList from '../../../components/BL/BooksList/BooksList';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Error from '../../../components/UI/Error/Error';
import Button from '../../../components/UI/Button/Button';
import BooksSearch from '../../../components/BL/BooksSearch/BooksSearch';
import { setSearchPage } from '../../../store/bookSlice/bookSlice';
import { getVerticalScrollPosition, saveVerticalScrollPosition } from '../../../helpers/helpers';

const HomePage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const outlet = useOutlet();
  const navigate = useNavigate();

  const {
    data,
    totalItems,
    status,
    error,
    searchOptions,
  } = useAppSelector((state) => state.books);

  const loadMoreBooks = () => {
    const {
      page,
      bookName,
      sortOrder,
      category,
    } = searchOptions;

    dispatch(fetchBooks({
      page: page + 1,
      bookName,
      sortOrder,
      category,
    }));

    setSearchPage(page + 1);
    saveVerticalScrollPosition();
    navigate('/books');
  };

  useEffect(() => {
    window.scrollTo(0, Number(getVerticalScrollPosition()));
  }, [data]);

  const currentError = error ?? t('fetchBooksError', { ns: 'common' });

  return (
    <div
      className={`${classes['home-page']}`}
    >
      <section
        className={`${classes['home-page__hero']} ${classes['hero-section']}`}
      >
        <div
          className={`${classes['hero-section__container']} container`}

        >
          <Title
            className={classes['hero-section__title']}
            component='h2'
            level={2}
          >
            Поиск книг
          </Title>

          <BooksSearch
            className={classes['hero-section__content']}
          />
        </div>
      </section>

      <section
        className={classes['books-section']}
      >
        <div
          className={`${classes['books-section__container']} container`}
        >
          {status === 'loading' && (
            <Spinner
              size={200}
            />
          )}

          {status === 'rejected' && (
            <Error
              className={classes['books-section__error']}
              message={currentError}
            />
          )}

          {status === 'resolved' && outlet === null && (
            <>
              <BooksCount>
                Представлено {data.length} (из {totalItems}) книг
              </BooksCount>
              <BooksList
                data={data}
              />
              {totalItems - data.length > 0 && (
                <Button
                  className={classes['books-section__button']}
                  onClick={loadMoreBooks}
                >
                  Смотреть еще
                </Button>
              )}
            </>
          )}

          {status === 'resolved' && outlet && (
            <>
              {outlet}
            </>
          )}

        </div>
      </section>
    </div>
  );
};

export default HomePage;
