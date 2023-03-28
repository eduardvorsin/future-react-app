import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAppDispatch from '../../../hooks/useAppDispatch/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector/useAppSelector';
import fetchDefiniteBook from '../../../store/thunks/fetchDefiniteBook/fetchDefiniteBook';
import Title from '../../UI/Title/Title';
import classes from './BookDescription.module.css';

const BookDescription = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.books);

  useEffect(() => {
    const fetchBookDescription = async () => {
      if (id) {
        dispatch(fetchDefiniteBook(id));
      }
    };

    fetchBookDescription();
  }, [id]);

  const categories = data.currentBook?.categories?.join(', ') || 'Неизвестно';
  const authors = data.currentBook?.authors?.join(', ') || 'Неизвестно';
  const imageSrc = data.currentBook?.imageLinks?.medium || 'https://via.placeholder.com/404x576?text=Not+found';

  return (
    <div
      className={classes['book-description']}
    >
      <div
        className={classes['book-description__img-box']}
      >
        <img
          src={imageSrc}
          className={classes['book-description__img']}
          alt={`${data.currentBook?.title} book cover`}
        />
      </div>
      <div
        className={classes['book-description__content']}
      >
        <p
          className={classes['book-description__category']}
        >
          Категории: {categories}
        </p>
        <Title
          className={classes['book-description__title']}
          component='h3'
          variant='dark'
          level={4}
        >
          {data.currentBook?.title}
        </Title>
        <p
          className={classes['book-description__authors']}
        >
          Авторы: {authors}
        </p>
        <p
          className={classes['book-description__text']}
        >
          {data.currentBook?.description}
        </p>
      </div>
    </div>
  );
};

export default BookDescription;
