import React, { ChangeEventHandler } from 'react';
import { useMatch, useOutlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Title from '../../../components/UI/Title/Title';
import classes from './HomePage.module.css';
import BooksCount from '../../../components/BL/BooksCount/BooksCount';
import BooksList from '../../../components/BL/BooksList/BooksList';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Error from '../../../components/UI/Error/Error';
import Button from '../../../components/UI/Button/Button';
import BooksSearch from '../../../components/BL/BooksSearch/BooksSearch';
import ThemeSwitcher from '../../../components/UI/ThemeSwitcher/ThemeSwitcher';
import LanguageSelect from '../../../components/UI/LanguageSelect/LanguageSelect';
import { BooksAPI } from '../../../API/BooksAPI/BooksAPI';
import { SearchOptions } from '../../../API/BooksAPI/bookTypes';

const HomePage = () => {
  const { t } = useTranslation();
  const outlet = useOutlet();
  const isBookCardsPage = useMatch('/books');

  const [trigger, {
    isSuccess,
    isLoading,
    isFetching,
    isError,
    error,
    currentData,
  }, lastPromiseInfo] = BooksAPI.useLazyGetBooksQuery();

  const loadMoreBooks = () => {
    const nextPage = lastPromiseInfo.lastArg.page + 1;

    trigger({
      ...lastPromiseInfo.lastArg,
      page: nextPage,
    });
  };

  const searchHandler = (options: SearchOptions): void => {
    trigger(options, true);
  };

  const refetchBooksData: ChangeEventHandler<HTMLSelectElement> = () => {
    if (!isSuccess || !isBookCardsPage) return;

    trigger({
      ...lastPromiseInfo.lastArg,
      page: 0,
    });
  };

  const currentError = error ? t('fetchBooksError') : '';
  const booksCount = currentData?.items.length ?? 0;
  const totalBooksCount = currentData?.totalItems ?? 0;
  const currentBooks = currentData?.items ?? [];

  const bookSectionContainerClasses = [
    classes['books-section__container'],
    'container',
    (!isLoading && isFetching) ? classes['books-section__container--fetching'] : '',
  ].join(' ');

  return (
    <div
      className={`${classes['home-page']}`}
    >
      <div
        className={classes['home-page__quick-menu']}
      >
        <div
          className={classes['home-page__quick-menu-item']}
        >
          <ThemeSwitcher />
        </div>
        <div
          className={classes['home-page__quick-menu-item']}
        >
          <LanguageSelect
            onChange={refetchBooksData}
          />
        </div>
      </div>

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
            {t('mainTitle', { ns: 'homePage' })}
          </Title>

          <BooksSearch
            onSearch={searchHandler}
            className={classes['hero-section__content']}
          />
        </div>
      </section>
      <section
        className={classes['books-section']}
      >
        <div
          className={bookSectionContainerClasses}
        >
          {isLoading && (
            <Spinner
              size={200}
            />
          )}

          {isError && (
            <Error
              className={classes['books-section__error']}
              message={currentError}
            />
          )}

          {isSuccess && outlet === null && (
            <>
              <BooksCount
                totalItemsCount={totalBooksCount}
                itemsCount={booksCount}
              />
              <BooksList
                data={currentBooks}
              />
              {totalBooksCount - booksCount > 0 && (
                <Button
                  className={classes['books-section__button']}
                  onClick={loadMoreBooks}
                >
                  {t('showMore')}
                </Button>
              )}
            </>
          )}

          {isSuccess && outlet && (
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
