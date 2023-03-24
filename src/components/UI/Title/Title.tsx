import React from 'react';
import isValidHeadingLevel from '../../../helpers/helpers';
import classes from './Title.module.css';

type BaseTitleProps = Partial<React.HTMLAttributes<HTMLHeadingElement>>;
type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6;

interface TitleProps extends BaseTitleProps {
  children: React.ReactNode,
  level: HeadingLevels,
  className?: string,
}

const Title: React.FC<TitleProps> = ({
  level,
  children,
  className,
}) => {
  const buttonClasses = [
    'title',
    classes.title,
    className,
  ].join(' ');

  const Heading = isValidHeadingLevel(level) ? `h${level}` : 'h6' as React.ElementType;

  return (
    <Heading
      className={buttonClasses}
    >
      {children}
    </Heading>
  );
};

export default Title;
