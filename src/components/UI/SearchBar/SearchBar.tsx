import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import SearchIcon from '../../../assets/images/icons/find.svg';
import ClearIcon from '../../../assets/images/icons/clear.svg';
import classes from './SearchBar.module.css';

type BaseSearchBarProps = Partial<React.InputHTMLAttributes<HTMLInputElement>>;

interface SearchBarProps extends BaseSearchBarProps {
  className?: string,
  value: string | number,
  onClear: React.MouseEventHandler<HTMLButtonElement>,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
  onSearch: () => void,
}

const SearchBar: React.FC<SearchBarProps> = ({
  className,
  value,
  onClear,
  onChange,
  onSearch,
  ...props
}) => {
  const { t } = useTranslation();
  const SearchFormClasses = [
    className,
    classes['search-form'],
    classes['search-form__search-bar'],
  ].join(' ');

  const SearchBarClasses = [
    classes['search-bar'],
  ].join(' ');

  const keydownHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const searchSubmitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (value.toString().length < 1) {
      return;
    }

    onSearch();
  };

  return (
    <form
      className={SearchFormClasses}
      onSubmit={searchSubmitHandler}
    >
      <div
        className={SearchBarClasses}
        role='search'
      >
        <label
          htmlFor='search-bar'
          className={`${classes['search-bar__label']} sr-only`}
        >
          {t('searchBar.label')}
        </label>
        <input
          id='search-bar'
          className={classes['search-bar__input']}
          onChange={onChange}
          onKeyDown={keydownHandler}
          value={value}
          placeholder={`${t('searchBar.placeholder')}...`}
          {...props}
        />
        <Button
          iconButton
          className={classes['search-bar__clear']}
          onClick={onClear}
        >
          <ClearIcon />
          {t('searchBar.clear')}
        </Button>
        <Button
          iconButton
          className={classes['search-bar__find']}
          type='submit'
        >
          <SearchIcon />
          {t('searchBar.find')}
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
