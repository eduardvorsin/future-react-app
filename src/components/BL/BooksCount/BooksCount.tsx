import React from 'react';
import { useTranslation } from 'react-i18next';
import classes from './BooksCount.module.css';

type BooksCountProps = {
  itemsCount: number,
  totalItemsCount?: number,
  className?: string,
}
export const BooksCount: React.FC<BooksCountProps> = ({
  itemsCount,
  totalItemsCount = 0,
  className = 0,
}) => {
  const { t } = useTranslation();
  const booksCountClasses = [
    className,
    classes['books-count'],
  ].join(' ');

  return (
    <p
      className={booksCountClasses}
    >
      {t('booksCount', {
        count: totalItemsCount,
        currentBooksCount: itemsCount,
        ns: 'homePage',
      })}
    </p>
  );
};
export default BooksCount;
