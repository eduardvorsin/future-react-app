import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Title from '../Title/Title';
import classes from './Card.module.css';
import PlaceholderImage from '../../../assets/images/placeholder128x185-ru.jpeg';
import Link from '../Link/Link';
import currencyFormat from '../../../localization/formatting/numbers';

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
  src = PlaceholderImage,
  alt,
  authors,
  price,
}) => {
  const cardClasses = [
    className,
    classes.card,
  ].join(' ');

  const imgWrapperClasses = [
    classes['card__img-wrapper'],
    maturityRating === 'MATURE' ? classes['card__img-wrapper--mature'] : '',

  ].join(' ');

  const currentAuthors = authors?.join(', ') ?? 'Неизвестно';
  let formattedPrice = price?.amount ?? 'Нет в наличии';

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
          Подробнее
        </RouterLink>
      </div>
      <div
        className={classes.card__content}
      >
        <p
          className={classes.card__price}
        >
          <span className='sr-only'>Цена книги:</span>
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
          Авторы: {currentAuthors}
        </p>
      </div>
      <Link
        className={classes['card__more-link']}
        variant='secondary'
        isRouterLink
        path={`/books/${id}`}
      >
        Подробнее
      </Link>
    </article>
  );
};

export default Card;
