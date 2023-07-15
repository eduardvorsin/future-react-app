import React from 'react';
import { useTranslation } from 'react-i18next';
import { IBookPartial } from '../../../model/IBook';
import Card from '../../UI/Card/Card';
import classes from './BooksList.module.css';

type BooksListProps = {
  className?: string,
  data: IBookPartial[],
}

const BooksList: React.FC<BooksListProps> = ({
  className,
  data,
}) => {
  const { t } = useTranslation();
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
          id={item.id}
          key={item.id}
          maturityRating={item.maturityRating}
          className={classes['books-list__item']}
          price={item?.retailPrice}
          title={item.title}
          authors={item?.authors}
          src={item?.imageLinks?.smallThumbnail}
          alt={`${item.title} ${t('bookCover')}`}
        />
      ))}
    </div>
  );
};

export default BooksList;
