const getLanguageName = (countryLocale: string): string => {
  const locale = navigator.language;
  const formatter = new Intl.DisplayNames(locale, { type: 'language' });

  const language = formatter.of(countryLocale) ?? 'неизвестно';
  return `${language[0].toUpperCase()}${language.slice(1)}`;
};

export default getLanguageName;
