import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import fetchBooks from '../../../store/thunks/fetchBooks/fetchBooks';
import useAppDispatch from '../../../hooks/useAppDispatch/useAppDispatch';
import { setSearchBookName, setSearchCategory, setSearchSortOrder, setSearchBy } from '../../../store/bookSlice/bookSlice';
import SearchBar from '../../UI/SearchBar/SearchBar';
import classes from './BooksSearch.module.css';
import useAppSelector from '../../../hooks/useAppSelector/useAppSelector';
import { createOptionsFromValues, resetVerticalScrollPosition } from '../../../helpers/helpers';
import { BookCategories, BookSearchBy, BookSortOrder, CategoryOption, SearchByOption, SorterOrderOption } from '../../../API/bookTypes';
import { LanguageContext } from '../../../contexts/LanguageContext';
import { MemoSelect } from '../../UI/Select/Select';

const categories: BookCategories[] = ['all', 'art', 'biography', 'computers', 'history', 'medical', 'poetry'];
const sortingOrder: BookSortOrder[] = ['relevance', 'newest'];
const searchBy: BookSearchBy[] = ['intitle', 'inauthor', 'inpublisher', 'isbn'];

type BooksSearchProps = {
  className?: string,
}

const BooksSearch: FC<BooksSearchProps> = ({
  className,
}) => {
  const { value: language } = useContext(LanguageContext);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { searchOptions } = useAppSelector((state) => state.books);

  const categoriesOptions = useMemo(() => createOptionsFromValues(categories, 'bookSearch.categories') as CategoryOption[], [language]);
  const sortOrderOptions = useMemo(() => createOptionsFromValues(sortingOrder, 'bookSearch.sortOrder') as SorterOrderOption[], [language]);
  const searchByOptions = useMemo(() => createOptionsFromValues(searchBy, 'bookSearch.searchBy') as SearchByOption[], [language]);

  const [searchValue, setSearchValue] = useState<string>('');
  const [category, setCategory] = useState<BookCategories>('all');
  const [sortOrder, setSortOrder] = useState<BookSortOrder>('relevance');
  const [findBy, setFindBy] = useState<BookSearchBy>('intitle');

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
        labelText={t('bookSearch.categoriesLabel', { ns: 'homePage' })}
        id='categories'
        onChange={categoryChangeHandler}
        options={categoriesOptions}
      />

      <MemoSelect
        className={`${classes['books-search__sort-select']} ${classes['books-search__select']}`}
        value={sortOrder}
        labelText={t('bookSearch.sortOrderLabel', { ns: 'homePage' })}
        id='sortingBy'
        onChange={sortOrderChangeHandler}
        options={sortOrderOptions}
      />

      <MemoSelect
        className={`${classes['books-search__find-by-select']} ${classes['books-search__select']}`}
        value={findBy}
        labelText={t('bookSearch.searchByLabel', { ns: 'homePage' })}
        id='findBy'
        onChange={searchByChangeHandler}
        options={searchByOptions}
      />
    </div>
  );
};

export default BooksSearch;
