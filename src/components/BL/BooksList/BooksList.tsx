import React from 'react';
import { IBook } from '../../../model/IBook';
import Card from '../../UI/Card/Card';
import classes from './BooksList.module.css';

type BooksListProps = {
  className?: string,
  data: IBook[],
}

const BooksList: React.FC<BooksListProps> = ({
  className,
  data,
}) => {
  const bookListClasses = [
    className,
    classes['books-list'],
  ].join(' ');

  return (
    <div
      className={bookListClasses}
    >
      {data.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          className={classes['books-list__item']}
          category={item.categories?.[0]}
          title={item.title}
          authors={item?.authors}
          src={item?.imageLinks?.smallThumbnail}
          alt={`${item.title} book cover`}
        />
      ))}
    </div>
  );
};

export default BooksList;
