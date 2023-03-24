import React from 'react';
import classes from './Button.module.css';

type BaseButtonProps = Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;
interface ButtonProps extends BaseButtonProps {
  children: React.ReactNode,
  className?: string,
  iconButton?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  children,
  iconButton,
  className,
  onClick,
}) => {
  const buttonClasses = [
    iconButton ? classes['button--icon-button'] : classes.button,
    className,
  ].join(' ');
  return (
    <button
      className={buttonClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
