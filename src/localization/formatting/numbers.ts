type currencyFormatOptions = {
  currency?: string,
  useGrouping?: boolean,
}

const currencyFormat = (currency: number | string, options: currencyFormatOptions): string => {
  const formatOptions = {
    useGrouping: options.useGrouping,
    currency: options.currency ?? 'USD',
    style: 'currency',
    maximumFractionDigits: 0,
  };
  const locale = navigator.language;
  const formatter = new Intl.NumberFormat(locale, formatOptions);

  return formatter.format(Number(currency));
};

export default currencyFormat;
