import React from 'react';
import { render, screen } from '@testing-library/react';
import ThemeSwitcher from './ThemeSwitcher';
import i18n from '../../../localization/i18next';

describe('ThemeSwitcher tests', () => {
  it('is rendered correctly', () => {
    render(
      <ThemeSwitcher
        testId='test-theme-switcher'
      />,
    );

    expect(screen.getByTestId<HTMLFieldSetElement>('test-theme-switcher')).toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    render(
      <ThemeSwitcher
        testId='test-theme-switcher'
      />,
    );

    expect(screen.getByTestId<HTMLFieldSetElement>('test-theme-switcher')).toBeInTheDocument();
  });
});

describe('ThemeSwitcher integration tests', () => {
  it('the component with the text in English is displayed correctly', () => {
    const localizedText = i18n.t('themeSwitcherLabel');

    render(<ThemeSwitcher testId='test-theme-switcher' />);

    expect(screen.getByText<HTMLLegendElement>(localizedText)).toBeInTheDocument();
  });

  it('the component with the text in Russian is displayed correctly', () => {
    i18n.changeLanguage('ru');
    const localizedText = i18n.t('themeSwitcherLabel');

    render(<ThemeSwitcher testId='test-theme-switcher' />);

    expect(screen.getByText<HTMLLegendElement>(localizedText)).toBeInTheDocument();
  });
});
