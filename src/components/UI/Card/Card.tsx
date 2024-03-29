import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Title from '../Title/Title';
import classes from './Card.module.css';
import PlaceholderImageRu from '../../../assets/images/placeholder128x185-ru.jpeg';
import PlaceholderImageEn from '../../../assets/images/placeholder128x185-en.jpeg';
import Link from '../Link/Link';
import currencyFormat from '../../../localization/formatting/numbers';
import i18n from '../../../localization/i18next';

type CardProps = {
  id: string,
  className?: string,
  title: string,
  maturityRating: 'NOT_MATURE' | 'MATURE',
  src?: string,
  alt: string,
  authors?: string[],
  price?: {
    amount: number,
    currencyCode: string,
  }
}

const Card: React.FC<CardProps> = ({
  id,
  className,
  title,
  maturityRating,
  src = i18n.language === 'ru' ? PlaceholderImageRu : PlaceholderImageEn,
  alt,
  authors,
  price,
}) => {
  const { t } = useTranslation();

  const cardClasses = [
    className,
    classes.card,
  ].join(' ');

  const imgWrapperClasses = [
    classes['card__img-wrapper'],
    maturityRating === 'MATURE' ? classes['card__img-wrapper--mature'] : '',

  ].join(' ');

  const currentAuthors = authors?.join(', ') ?? t('unknown');
  let formattedPrice = price?.amount ?? t('notAvailable');

  if (typeof formattedPrice === 'number') {
    formattedPrice = currencyFormat(formattedPrice, {
      currency: price?.currencyCode,
    });
  }
  return (
    <article
      className={cardClasses}
    >
      <div
        className={imgWrapperClasses}
        data-testid='image-wrapper'
      >
        <img
          width={128}
          height={185}
          className={classes.card__img}
          src={src}
          alt={alt}
        />
        <RouterLink
          to={`/books/${id}`}
        >
          {t('learnMore')}
        </RouterLink>
      </div>
      <div
        className={classes.card__content}
      >
        <p
          className={classes.card__price}
        >
          <span className='sr-only'>
            {t('card.bookPrice', { ns: 'homePage' })}:
          </span>
          {formattedPrice}
        </p>
        <Title
          className={classes.card__title}
          level={6}
          component='h3'
        >
          <RouterLink
            to={`/books/${id}`}
          >
            {title}
          </RouterLink>
        </Title>
        <p
          className={classes.card__authors}
        >
          {t('authors')}: {currentAuthors}
        </p>
      </div>
      <Link
        className={classes['card__more-link']}
        variant='secondary'
        isRouterLink
        path={`/books/${id}`}
      >
        {t('learnMore')}
      </Link>
    </article>
  );
};

export default Card;
