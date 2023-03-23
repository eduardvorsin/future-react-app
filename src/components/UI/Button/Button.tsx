import React from 'react';
import classes from './Button.module.css';

type BaseButtonProps = Partial<React.ButtonHTMLAttributes<HTMLButtonElement>>;
interface ButtonProps extends BaseButtonProps {
  children: React.ReactNode,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  const buttonClasses = [
    'button',
    classes.button,
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
