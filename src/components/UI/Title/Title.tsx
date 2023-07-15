import React from 'react';
import { isValidHeadingLevel } from '../../../helpers/helpers';
import classes from './Title.module.css';
import { Theme } from '../../../contexts/ThemeContext';

type BaseTitleProps = Partial<React.HTMLAttributes<HTMLHeadingElement>>;
type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6;
type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TitleProps extends BaseTitleProps {
  children: React.ReactNode,
  level: HeadingLevels,
  component?: Headings,
  variant?: Theme,
  className?: string,
}

const Title: React.FC<TitleProps> = ({
  level,
  children,
  className,
  component = 'h6',
  variant = 'dark',
  ...props
}) => {
  const headingClasses = [
    classes.title,
    className,
    classes[`title--${variant}`],
    isValidHeadingLevel(level) ? classes[`title--level-${level}`] : classes['title--level-6'],
  ].join(' ');

  const Heading = component;

  return (
    <Heading
      className={headingClasses}
      {...props}
    >
      {children}
    </Heading>
  );
};

export default Title;
