import React from 'react';
import classes from './BooksCount.module.css';

type BooksCountProps = {
  className?: string,
  children: React.ReactNode,
}

export const BooksCount: React.FC<BooksCountProps> = ({
  className,
  children,
}) => {
  const booksCountClasses = [
    className,
    classes['books-count'],
  ].join(' ');

  return (
    <p
      className={booksCountClasses}
    >
      {children}
    </p>
  );
};
export default BooksCount;
