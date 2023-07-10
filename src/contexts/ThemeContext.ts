import { createContext } from 'react';
import { getColorTheme } from '../helpers/helpers';

type ThemeContextValue = {
  value: 'light' | 'dark';
  toggleTheme: () => void;
}

export const defaultTheme = getColorTheme();
export const ThemeContext = createContext<ThemeContextValue>({
  value: defaultTheme,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => { },
});
