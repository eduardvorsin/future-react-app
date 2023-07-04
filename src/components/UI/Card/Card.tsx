import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Title from '../Title/Title';
import classes from './Card.module.css';
import PlaceholderImage from '../../../assets/images/placeholder128x185-ru.jpeg';
import Link from '../Link/Link';

type CardProps = {
  id: string,
  className?: string,
  category?: string,
  title: string,
  maturityRating: 'NOT_MATURE' | 'MATURE',
  src?: string,
  alt: string,
  authors?: string[],
}

const Card: React.FC<CardProps> = ({
  id,
  className,
  category = 'Незвестно',
  title,
  maturityRating,
  src = PlaceholderImage,
  alt,
  authors,
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
          className={classes.card__category}
        >
          Категория: <span>{category}</span>
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
