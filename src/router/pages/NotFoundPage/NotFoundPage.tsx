import React from 'react';
import { Link } from 'react-router-dom';
import Title from '../../../components/UI/Title/Title';
import classes from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <div
    className={classes['not-found']}
  >
    <div className={`${classes['not-found__container']} container`}>
      <Title
        className={classes['not-found__title']}
        level={1}
        component='h1'
      >
        <span>404</span>
        Страница не найдена
      </Title>
      <Link
        className={classes['not-found__link']}
        to='/books'
      >
        Вернуться на главную страницу
      </Link>
    </div>

  </div >
);

export default NotFoundPage;
