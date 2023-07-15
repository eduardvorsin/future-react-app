import i18n from '../i18next';

const getLanguageName = (countryLocale: string): string => {
  const locale = i18n.language;
  const formatter = new Intl.DisplayNames(locale, { type: 'language' });
  const language = formatter.of(countryLocale) ?? i18n.t('unknown');

  return `${language[0].toUpperCase()}${language.slice(1)}`;
};

export default getLanguageName;
