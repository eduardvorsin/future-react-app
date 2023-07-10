import React, { ChangeEventHandler, FC, useContext, useState } from 'react';
import Switcher from '../Switcher/Switcher';
import classes from './ThemeSwitcher.module.css';
import { ThemeContext } from '../../../contexts/ThemeContext';

type ThemeSwitcherProps = {
  className?: string,
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
  className,
}) => {
  const theme = useContext(ThemeContext);
  const [checked, setChecked] = useState<boolean>(theme.value === 'light');

  const themeChangeHandler: ChangeEventHandler<HTMLInputElement> = () => {
    theme.toggleTheme();
    setChecked(!checked);
  };

  const themeValues = ['light', 'dark'];

  return (
    <Switcher
      labelText='color theme switcher'
      name='theme-switcher'
      onChange={themeChangeHandler}
      checked={checked}
      className={`${classes['theme-switcher']} ${className}`}
      value={themeValues}
    />
  );
};

export default ThemeSwitcher;
