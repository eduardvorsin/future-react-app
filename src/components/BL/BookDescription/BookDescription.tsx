import React from 'react';
import useAppSelector from '../../../hooks/useAppSelector/useAppSelector';
import Title from '../../UI/Title/Title';
import classes from './BookDescription.module.css';
import PlaceholderImage from '../../../assets/images/placeholder388x613-ru.jpeg';
import Link from '../../UI/Link/Link';
import OpenBookIcon from '../../../assets/images/icons/open-book.svg';
import currencyFormat from '../../../localization/formatting/numbers';
import CharacteristicList from '../../UI/CharacteristicList/CharacteristicList';

const BookDescription = () => {
  const { currentBook } = useAppSelector((state) => state.books);
  const categories = currentBook?.categories?.join(', ') ?? 'Неизвестно';
  const imageSrc = currentBook?.imageLinks?.medium ?? PlaceholderImage;
  const description = currentBook?.description ?? 'Описание к данной книге отсутствует';
  const title = currentBook?.title ?? 'Неизвестно';
  const previewLink = currentBook?.webReaderLink ?? '';

  let price = currentBook?.retailPrice?.amount ?? 'Нет в наличии';

  if (typeof price === 'number') {
    price = currencyFormat(price, {
      currency: currentBook?.retailPrice?.currencyCode,
    });
  }
  return (
    <div
      className={classes['book-description']}
    >
      <Title
        className={classes['book-description__main-title']}
        component='h2'
        variant='dark'
        level={3}
      >
        {title}
      </Title>
      <div
        className={classes['book-description__img-box']}
      >
        <img
          src={imageSrc}
          className={classes['book-description__img']}
          alt={`${title} book cover`}
          width={435}
          height={632}
        />
      </div>
      <div
        className={classes['book-description__content']}
      >
        <Link
          className={classes['book-description__preview-link']}
          icon={OpenBookIcon}
          path={previewLink}
        >
          Читать фрагмент книги
        </Link>
        <p
          className={classes['book-description__category']}
        >
          Категории: <span>{categories}</span>
        </p>
        {currentBook && (
          <>
            <Title
              className={classes['book-description__title']}
              component='h3'
              variant='dark'
              level={4}
            >
              Характеристики
            </Title>

            <CharacteristicList
              bookData={currentBook}
            />
          </>
        )}
      </div>
      <div className={classes['book-description__buying']}>
        <p
          className={classes['book-description__price']}
        >
          {price}
        </p>
        <Link
          path={currentBook?.buyLink}
          variant='tertiary'
          className={classes['book-description__buying-btn']}
        >
          Купить
        </Link>
      </div>
      <div
        className={classes['book-description__describing']}
      >
        <Title
          className={classes['book-description__title']}
          component='h3'
          variant='dark'
          level={4}
        >
          Описание
        </Title>
        <p
          className={classes['book-description__text']}
        >
          {description}
        </p>
      </div>

    </div>
  );
};

export default BookDescription;
