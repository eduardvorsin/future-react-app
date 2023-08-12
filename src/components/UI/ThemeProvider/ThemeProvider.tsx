import React, { FC, ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { getColorTheme } from '../../../helpers/helpers';

export type Theme = 'light' | 'dark';
type ThemeContextValue = {
  value: Theme;
  toggleTheme: () => void;
}
export const defaultTheme = getColorTheme();
export const ThemeContext = createContext<ThemeContextValue>({
  value: defaultTheme,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => { },
});

type ThemeProviderProps = {
  children: ReactNode,
}
const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const toggleTheme: () => void = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, [theme]);

  const themeContextValue = useMemo(() => ({
    value: theme,
    toggleTheme,
  }), [theme, toggleTheme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    return () => {
      document.documentElement.removeAttribute('data-theme');
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);

export default ThemeProvider;
