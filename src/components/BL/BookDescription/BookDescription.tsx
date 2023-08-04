import React, { FC } from 'react';
import { useLoaderData } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Title from '../../UI/Title/Title';
import classes from './BookDescription.module.css';
import PlaceholderImageRu from '../../../assets/images/placeholder388x613-ru.jpeg';
import PlaceholderImageEn from '../../../assets/images/placeholder388x613-en.jpeg';
import Link from '../../UI/Link/Link';
import OpenBookIcon from '../../../assets/images/icons/open-book.svg';
import currencyFormat from '../../../localization/formatting/numbers';
import CharacteristicList from '../../UI/CharacteristicList/CharacteristicList';
import bookDescriptionLoader from '../../../router/loaders/bookDescriptionLoader';

type BookDescriptionProps = {
  testId?: string,
};

const BookDescription: FC<BookDescriptionProps> = ({
  testId,
}) => {
  const { t, i18n } = useTranslation();
  const localizedPlaceholder = i18n.language === 'ru' ? PlaceholderImageRu : PlaceholderImageEn;
  const currentBook = useLoaderData() as Awaited<ReturnType<typeof bookDescriptionLoader>>;

  const categories = currentBook?.categories?.[0] ?? t('unknown');
  const imageSrc = currentBook?.imageLinks?.medium ?? localizedPlaceholder;
  const description = currentBook?.description ?? t('notAvaliableDescription', { ns: 'bookDescription' });
  const title = currentBook?.title ?? t('unknown');
  const previewLink = currentBook?.webReaderLink ?? '';

  let price = currentBook?.retailPrice?.amount ?? t('notAvailable');

  if (typeof price === 'number') {
    price = currencyFormat(price, {
      currency: currentBook?.retailPrice?.currencyCode,
    });
  }
  return (
    <div
      className={classes['book-description']}
      data-testid={testId}
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
          alt={`${title} ${t('bookCover')}`}
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
          {t('readBookFragment', { ns: 'bookDescription' })}
        </Link>
        <p
          className={classes['book-description__category']}
        >
          {t('categories', { ns: 'bookDescription' })}:
          <span>{categories}</span>
        </p>
        {currentBook && (
          <>
            <Title
              className={classes['book-description__title']}
              component='h3'
              variant='dark'
              level={4}
            >
              {t('characteristicsTitle', { ns: 'bookDescription' })}
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
          {t('buy')}
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
          {t('descriptionTitle', { ns: 'bookDescription' })}
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
