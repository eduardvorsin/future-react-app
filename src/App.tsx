import React from 'react';
import AppRouter from './router/AppRouter/AppRouter';
import ThemeProvider from './components/UI/ThemeProvider/ThemeProvider';
import LanguageProvider from './components/UI/LanguageProvider/LanguageProvider';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppRouter />
      </LanguageProvider>
    </ThemeProvider>
  );
}
