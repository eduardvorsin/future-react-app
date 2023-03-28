import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../Title/Title';
import classes from './Card.module.css';

type CardProps = {
  id: string,
  className?: string,
  category: string,
  title: string,
  src: string,
  alt: string,
  authors: string[],
}

const Card: React.FC<CardProps> = ({
  id,
  className,
  category,
  title,
  src,
  alt,
  authors,
}) => {
  const cardClasses = [
    className,
    classes.card,
  ].join(' ');

  const currentAuthors = authors?.join(', ') || 'Неизвестно';
  const currentCategory = category || 'Незвестно';
  const currentImage = src || 'https://via.placeholder.com/128x180?text=Not+found';


  return (
    <article
      className={cardClasses}
    >
      <img
        className={classes.card__img}
        src={currentImage}
        alt={alt}
      >
      </img>
      <p
        className={classes.card__category}
      >
        Категория: {currentCategory}
      </p>
      <Title
        className={classes.card__title}
        level={6}
        component='h3'
      >
        {title}
      </Title>
      <p
        className={classes.card__authors}
      >
        Авторы: {currentAuthors}
      </p>
      <Link
        className={classes.card__link}
        to={`/${id}`}
      >
        Подробнее
      </Link>
    </article>
  );
};

export default Card;
