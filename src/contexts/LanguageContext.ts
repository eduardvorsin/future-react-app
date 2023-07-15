import { createContext } from 'react';
import i18n from '../localization/i18next';

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
