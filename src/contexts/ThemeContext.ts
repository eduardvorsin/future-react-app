import { createContext } from 'react';
import { getColorTheme } from '../helpers/helpers';

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
