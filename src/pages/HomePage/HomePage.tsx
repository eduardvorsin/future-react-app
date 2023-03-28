import React, { useState } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import useAppDispatch from '../../hooks/useAppDispatch/useAppDispatch';
import { BookCategories, BookSortOrder } from '../../store/bookSlice/bookSlice';
import fetchBooks from '../../store/thunks/fetchBooks/fetchBooks';
import SearchBar from '../../components/UI/SearchBar/SearchBar';
import Select from '../../components/UI/Select/Select';
import Title from '../../components/UI/Title/Title';
import classes from './HomePage.module.css';
import useAppSelector from '../../hooks/useAppSelector/useAppSelector';
import BooksCount from '../../components/BL/BooksCount/BooksCount';
import BooksList from '../../components/BL/BooksList/BooksList';
import Spinner from '../../components/UI/Spinner/Spinner';
import Error from '../../components/UI/Error/Error';
import Button from '../../components/UI/Button/Button';

type CategoryOption = {
  value: BookCategories,
  label: string
}

type SorterOrderOption = {
  value: BookSortOrder,
  label: string
}

const categoriesOptions: CategoryOption[] = [
  {
    value: 'all',
    label: 'Все',
  },
  {
    value: 'art',
    label: 'Исскуство',
  },
  {
    value: 'biography',
    label: 'Биография',
  },
  {
    value: 'computers',
    label: 'Компьютеры',
  },
  {
    value: 'history',
    label: 'История',
  },
  {
    value: 'medical',
    label: 'Медицина',
  },
  {
    value: 'poetry',
    label: 'Поэзия',
  },
];

const sortOrderOptions: SorterOrderOption[] = [
  {
    value: 'relevance',
    label: 'Релевантности',
  },
  {
    value: 'newest',
    label: 'Новейшим',
  },
];

const HomePage = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [category, setCategory] = useState<string>(categoriesOptions[0].value);
  const [sortOrder, setSortOrder] = useState<string>(sortOrderOptions[0].value);

  const dispatch = useAppDispatch();
  const outlet = useOutlet();
  const navigate = useNavigate();

  const { data, status, error } = useAppSelector((state) => state.books);

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  };

  const searchHandler: () => void = () => {
    dispatch(fetchBooks({
      page: 0,
      name: searchValue,
      sortOrder,
      category,
    }));
    navigate('/');
  };

  const clearHandler: () => void = () => {
    setSearchValue('');
  };

  const sortOrderChangeHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setSortOrder(e.currentTarget.value);
  };

  const categoryChangeHandler: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setCategory(e.currentTarget.value);
  };

  const loadMoreBooks = () => {
    dispatch(fetchBooks({
      page: data.page + 1,
      name: searchValue,
      sortOrder,
      category,
    }));
    navigate('/');
  };

  const currentError = error || 'Не удалось загрузить книги попробуйте еще раз';

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
            variant='light'
            level={2}
          >
            Поиск книг
          </Title>

          <div
            className={classes['hero-section__content']}
          >
            <SearchBar
              className={classes['hero-section__search']}
              value={searchValue}
              onClear={clearHandler}
              onSearch={searchHandler}
              onChange={changeHandler}
            />

            <Select
              className={classes['hero-section__category-select']}
              value={category}
              labelText='Категории'
              id='categories'
              onChange={categoryChangeHandler}
              options={categoriesOptions}
            />

            <Select
              className={classes['hero-section__sort-select']}
              value={sortOrder}
              labelText='Отсортировать по'
              id='sortingBy'
              onChange={sortOrderChangeHandler}
              options={sortOrderOptions}
            />
          </div>
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
              <BooksCount>Найдено {data.totalItems} книг</BooksCount>
              <BooksList
                data={data.items}
              />
              {data.totalItems - data.items.length > 0 && (
                <Button
                  className={classes['books-section__button']}
                  onClick={loadMoreBooks}
                >
                  Смотреть еще
                </Button>
              )}
            </>
          )}
          {outlet}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
