import React, { FC, ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import i18n from '../../../localization/i18next';

export type Languages = 'en' | 'ru';

type LanguageContextValue = {
  value: 'en' | 'ru';
  selectLanguage: (language: Languages) => void;
}

export const LanguageContext = createContext<LanguageContextValue>({
  value: i18n.language as Languages,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  selectLanguage: () => { },
});

type LanguageProviderProps = {
  children: ReactNode,
}
const LanguageProvider: FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Languages>(i18n.language as Languages);

  const selectLanguage: (currentLanguage: Languages) => void = useCallback((currentLanguage) => {
    setLanguage(currentLanguage);
  }, [language]);

  const languageContextValue = useMemo(() => ({
    value: language,
    selectLanguage,
  }), [language, selectLanguage]);

  return (
    <LanguageContext.Provider value={languageContextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => useContext(LanguageContext);

export default LanguageProvider;
