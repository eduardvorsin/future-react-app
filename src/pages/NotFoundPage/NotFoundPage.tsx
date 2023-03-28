import React from 'react';
import Title from '../../components/UI/Title/Title';
import classes from './NotFoundPage.module.css';

const NotFoundPage = () => (
  <div
    className={classes['not-found']}
  >
    <Title
      className={classes['nout-found__title']}
      variant='dark'
      level={4}
      component={'h1'}
    >
      404 Not Found
    </Title>
  </div>
);

export default NotFoundPage;
