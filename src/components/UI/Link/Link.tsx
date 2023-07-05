import React, { FC, Fragment, FunctionComponent, MouseEventHandler, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import classes from './Link.module.css';
import { SVGAndHTMLProps } from '../../../types/shared';

type BaseLinkProps = Partial<React.AnchorHTMLAttributes<HTMLAnchorElement>>;

interface ButtonProps extends BaseLinkProps {
  children: ReactNode,
  path?: string,
  className?: string,
  onClick?: MouseEventHandler<HTMLAnchorElement>,
  icon?: FunctionComponent<SVGAndHTMLProps>,
  iconPosition?: 'left' | 'right',
  isRouterLink?: boolean,
  variant?: 'primary' | 'secondary' | 'tertiary',
}

const Link: FC<ButtonProps> = ({
  path,
  className,
  children,
  onClick,
  icon,
  isRouterLink = false,
  iconPosition = 'left',
  variant = 'primary',
  ...props
}) => {
  const linkClasses = [
    classes.link,
    className,
    !path ? classes['link--disabled'] : '',
    classes[`link--${variant}`],
  ].join(' ');

  const iconClasses = [
    classes['link__icon-wrapper'],
    iconPosition === 'left' ? classes['link__icon-wrapper--left'] : classes['link__icon-wrapper--right'],
  ].join(' ');

  const Icon = icon ?? Fragment;

  const IconWrapper: JSX.Element = (
    <span
      className={iconClasses}
      aria-hidden='true'
    >
      <Icon />
    </span>
  );

  const Children: JSX.Element = (
    <>
      {(icon && iconPosition === 'left') && IconWrapper}
      {children}
      {(icon && iconPosition === 'right') && IconWrapper}
    </>
  );

  if (isRouterLink) {
    return (
      <RouterLink
        className={linkClasses}
        to={path ?? ''}
        onClick={onClick}
        aria-disabled={!path}
        {...props}
      >
        {Children}
      </RouterLink>
    );
  }

  return (
    <a
      className={linkClasses}
      href={path}
      rel="noopener"
      onClick={onClick}
      aria-disabled={!path}
      role={!path ? 'link' : undefined}
      {...props}
    >
      {Children}
    </a>
  );
};

export default Link;
