import React from 'react';
import Title from '../Title/Title';
import classes from './Error.module.css';

type ErrorProps = {
  className?: string,
  message: string,
  icon?: React.ReactNode,
  isCentered?: boolean,
};

const Error: React.FC<ErrorProps> = ({
  className,
  message,
  icon,
  isCentered,
}) => {
  const errorClasses = [
    className,
    classes.error,
    isCentered ? classes['error--center'] : '',
  ].join(' ');

  return (
    <div
      className={errorClasses}
      role="alert"
    >
      {icon && (
        <div
          className={classes['error__icon-wrapper']}
        >
          {icon}
        </div>
      )}
      <Title
        level={5}
        component='h4'
        variant='error'
        className={classes.error__title}
      >
        {message}
      </Title>
    </div>
  );
};

export default Error;
