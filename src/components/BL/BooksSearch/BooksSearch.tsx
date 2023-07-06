import React, { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchBooks from '../../../store/thunks/fetchBooks/fetchBooks';
import useAppDispatch from '../../../hooks/useAppDispatch/useAppDispatch';
import { setSearchBookName, setSearchCategory, setSearchSortOrder, setSearchBy } from '../../../store/bookSlice/bookSlice';
import SearchBar from '../../UI/SearchBar/SearchBar';
import classes from './BooksSearch.module.css';
import { MemoSelect } from '../../UI/Select/Select';
import useAppSelector from '../../../hooks/useAppSelector/useAppSelector';
import { resetVerticalScrollPosition } from '../../../helpers/helpers';
import { BookCategories, BookSearchBy, BookSortOrder } from '../../../API/bookTypes';

type CategoryOption = {
  value: BookCategories,
  label: string
}

type SorterOrderOption = {
  value: BookSortOrder,
  label: string
}

type SearchByOption = {
  value: BookSearchBy,
  label: string,
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

const searchByOptions: SearchByOption[] = [
  {
    value: 'intitle',
    label: 'По заголовку',
  },
  {
    value: 'inauthor',
    label: 'По автору',
  },
  {
    value: 'inpublisher',
    label: 'По издателю',
  },
  {
    value: 'isbn',
    label: 'По ISBN',
  },
];

type BooksSearchProps = {
  className?: string,
}

const BooksSearch: FC<BooksSearchProps> = ({
  className,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchOptions } = useAppSelector((state) => state.books);

  const [searchValue, setSearchValue] = useState<string>('');
  const [category, setCategory] = useState<BookCategories>(searchOptions.category);
  const [sortOrder, setSortOrder] = useState<BookSortOrder>(searchOptions.sortOrder);
  const [findBy, setFindBy] = useState<BookSearchBy>(searchOptions.searchBy);

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchValue(e.target.value);
  };

  const searchHandler: () => void = () => {
    dispatch(setSearchBookName(searchValue));
    dispatch(fetchBooks({
      page: 0,
      bookName: searchValue,
      sortOrder,
      category,
      searchBy: findBy,
    }));

    resetVerticalScrollPosition();
    navigate('/books');
  };

  const clearHandler: () => void = () => {
    setSearchValue('');
  };

  const sortOrderChangeHandler: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    const value = e.currentTarget.value as BookSortOrder;

    dispatch(setSearchSortOrder(value));
    setSortOrder(value);
  }, [sortOrder]);

  const categoryChangeHandler: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    const value = e.currentTarget.value as BookCategories;

    dispatch(setSearchCategory(value));
    setCategory(value);
  }, [category]);

  const searchByChangeHandler: React.ChangeEventHandler<HTMLSelectElement> = useCallback((e) => {
    const value = e.currentTarget.value as BookSearchBy;

    dispatch(setSearchBy(value));
    setFindBy(value);
  }, [setFindBy]);

  const booksSearchClasses = [
    classes['books-search'],
    className,
  ].join(' ');

  return (
    <div
      className={booksSearchClasses}
    >
      <SearchBar
        className={classes['books-search__search-bar']}
        value={searchValue}
        onClear={clearHandler}
        onSearch={searchHandler}
        onChange={changeHandler}
      />

      <MemoSelect
        className={`${classes['books-search__category-select']} ${classes['books-search__select']}`}
        value={category}
        labelText='Категории'
        id='categories'
        onChange={categoryChangeHandler}
        options={categoriesOptions}
      />

      <MemoSelect
        className={`${classes['books-search__sort-select']} ${classes['books-search__select']}`}
        value={sortOrder}
        labelText='Отсортировать по'
        id='sortingBy'
        onChange={sortOrderChangeHandler}
        options={sortOrderOptions}
      />

      <MemoSelect
        className={`${classes['books-search__find-by-select']} ${classes['books-search__select']}`}
        value={findBy}
        labelText='Искать по'
        id='findBy'
        onChange={searchByChangeHandler}
        options={searchByOptions}
      />
    </div>
  );
};

export default BooksSearch;
