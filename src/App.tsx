import React, { useCallback, useEffect, useMemo, useState } from 'react';
import AppRouter from './router/AppRouter/AppRouter';
import { Theme, ThemeContext, defaultTheme } from './contexts/ThemeContext';
import { LanguageContext, Languages } from './contexts/LanguageContext';
import i18n from './localization/i18next';

export default function App() {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [language, setLanguage] = useState<Languages>(i18n.language as Languages);

  const toggleTheme: () => void = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, [theme]);

  const selectLanguage: (currentLanguage: Languages) => void = useCallback((currentLanguage) => {
    setLanguage(currentLanguage);
  }, [language]);

  const themeContextValue = useMemo(() => ({
    value: theme,
    toggleTheme,
  }), [theme, toggleTheme]);

  const languageContextValue = useMemo(() => ({
    value: language,
    selectLanguage,
  }), [language, selectLanguage]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    return () => {
      document.documentElement.removeAttribute('data-theme');
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LanguageContext.Provider value={languageContextValue}>
        <div className='app'>
          <AppRouter />
        </div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
