import React, { ChangeEventHandler, FC, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from '../Select/Select';
import classes from './LanguageSelect.module.css';
import i18n from '../../../localization/i18next';
import { LanguageContext, Languages } from '../../../contexts/LanguageContext';

type LanguageOption = {
  value: Languages,
  label: string,
}

const languagesOptions: LanguageOption[] = [
  {
    value: 'en',
    label: 'ENG',
  },
  {
    value: 'ru',
    label: 'RUS',
  },
];

type LanguageSelect = {
  className?: string,
  onChange?: ChangeEventHandler<HTMLSelectElement>,
}

const LanguageSelect: FC<LanguageSelect> = ({
  className,
  onChange,
}) => {
  const { t } = useTranslation();
  const language = useContext(LanguageContext);
  const [selectValue, setSelectValue] = useState<string>(language.value);
  const languageChangeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const currentLanguage = e.target.value as Languages;
    setSelectValue(currentLanguage);
    i18n.changeLanguage(currentLanguage);
    language.selectLanguage(currentLanguage);

    if (onChange) onChange(e);
  };

  return (
    <Select
      id='language-select'
      className={`${classes.language__select} ${className}`}
      labelText={t('languageSelection')}
      options={languagesOptions}
      value={selectValue}
      onChange={languageChangeHandler}
    />
  );
};

export default LanguageSelect;
