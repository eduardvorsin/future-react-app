// eslint-disable-next-line import/no-unresolved
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import enTranslation from './translations/en/en.json';
import ruTranslation from './translations/ru/ru.json';

const resources = {
  en: enTranslation,
  ru: ruTranslation,
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: process.env.NODE_ENV === 'development',
    resources,
    supportedLngs: ['ru', 'en'],
    fallbackLng: 'ru',
    defaultNS: 'common',
    fallbackNS: 'common',
    returnObjects: true,
  });

export default i18n;
