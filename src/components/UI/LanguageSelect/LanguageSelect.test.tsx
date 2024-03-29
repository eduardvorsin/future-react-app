/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ChangeEvent } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageSelect from './LanguageSelect';
import i18n from '../../../localization/i18next';

describe('LanguageSelect tests', () => {
  it('is rendered correctly', () => {
    render(<LanguageSelect />);

    expect(screen.getByRole<HTMLSelectElement>('combobox')).toBeInTheDocument();
  });

  it('when you change the select option, the mock function should be started', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn<void, [e: ChangeEvent]>();
    render(
      <LanguageSelect
        onChange={mockFn}
      />,
    );

    user.selectOptions(screen.getByRole<HTMLSelectElement>('combobox'), 'ru');

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  it('is a basic snapshot', () => {
    render(<LanguageSelect />);

    expect(screen.getByRole<HTMLSelectElement>('combobox')).toMatchSnapshot();
  });
});

describe('LanguageSelect integration tests', () => {
  it('the component with the text in English is displayed correctly', () => {
    const localizedText = i18n.t('languageSelection');

    render(<LanguageSelect />);

    expect(screen.getByLabelText<HTMLDivElement>(localizedText)).toBeInTheDocument();
  });

  it('the component with the text in Russian is displayed correctly', () => {
    i18n.changeLanguage('ru');
    const localizedText = i18n.t('languageSelection');

    render(<LanguageSelect />);

    expect(screen.getByLabelText<HTMLDivElement>(localizedText)).toBeInTheDocument();
  });
});
