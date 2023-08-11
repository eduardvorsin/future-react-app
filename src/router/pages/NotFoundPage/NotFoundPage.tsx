import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Title from '../../../components/UI/Title/Title';
import classes from './NotFoundPage.module.css';

type NotFoundPageProps = {
  testId?: string,
};

const NotFoundPage: FC<NotFoundPageProps> = ({
  testId,
}) => {
  const { t } = useTranslation();
  return (
    <div
      className={classes['not-found']}
      data-testid={testId}
    >
      <div className={`${classes['not-found__container']} container`}>
        <Title
          className={classes['not-found__title']}
          level={1}
          component='h1'
        >
          <span>404</span>
          {t('mainTitle', { ns: 'notFoundPage' })}
        </Title>
        <Link
          className={classes['not-found__link']}
          to='/books'
        >
          {t('backToHomePage', { ns: 'notFoundPage' })}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
