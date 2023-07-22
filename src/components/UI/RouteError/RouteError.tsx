import React from 'react';
import { useRouteError } from 'react-router-dom';
import Error from '../Error/Error';
import classes from './RouteError.module.css';

const RouteError = () => {
  const error = useRouteError() as Error;

  return (
    <Error
      className={classes['route-error']}
      message={error.message}
      isCentered
    />
  );
};

export default RouteError;
