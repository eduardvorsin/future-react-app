import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AppRouter from './router/AppRouter/AppRouter';
import { ThemeContext, defaultTheme } from './contexts/ThemeContext';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(defaultTheme);
  const toggleTheme = useCallback(() => {
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
      <div className='app'>
        <AppRouter />
      </div>

    </ThemeContext.Provider>
  );
}
