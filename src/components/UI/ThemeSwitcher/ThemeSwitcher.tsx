import React, { ChangeEventHandler, FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Switcher from '../Switcher/Switcher';
import classes from './ThemeSwitcher.module.css';
import { ThemeContext } from '../../../contexts/ThemeContext';

type ThemeSwitcherProps = {
  className?: string,
}

const ThemeSwitcher: FC<ThemeSwitcherProps> = ({
  className,
}) => {
  const { t } = useTranslation();
  const theme = useContext(ThemeContext);
  const [checked, setChecked] = useState<boolean>(theme.value === 'light');

  const themeChangeHandler: ChangeEventHandler<HTMLInputElement> = () => {
    theme.toggleTheme();
    setChecked(!checked);
  };

  const themeValues: [string, string] = ['light', 'dark'];
  const labels: [string, string] = ['светлая тема', 'темная тема'];

  return (
    <Switcher
      labelText={t('themeSwitcherLabel')}
      name='theme-switcher'
      onChange={themeChangeHandler}
      checked={checked}
      className={`${classes['theme-switcher']} ${className}`}
      inputLabels={labels}
      value={themeValues}
    />
  );
};

export default ThemeSwitcher;
