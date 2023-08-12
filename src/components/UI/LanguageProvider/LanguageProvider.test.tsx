import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LanguageProvider, { useLanguageContext } from './LanguageProvider';

const ThemeConsumer = () => {
  const { value, selectLanguage } = useLanguageContext();

  const currentLanguage = value === 'en' ? 'english' : 'russian';

  const selectRuLanguage = () => selectLanguage('ru');
  const selectEnLanguage = () => selectLanguage('en');

  return (
    <div>
      <p>{currentLanguage}</p>
      <button onClick={selectRuLanguage}>ru</button>
      <button onClick={selectEnLanguage}>en</button>
    </div>
  );
};

describe('LanguageProvider tests', () => {
  it('should render the component with the default language value', () => {
    render(
      <LanguageProvider>
        <ThemeConsumer />
      </LanguageProvider>,
    );

    expect(screen.getByText<HTMLParagraphElement>(/english/i)).toBeInTheDocument();
  });

  it('when you click on the en button, the language value should change to English', async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <ThemeConsumer />
      </LanguageProvider>,
    );

    expect(screen.getByText<HTMLParagraphElement>(/english/i)).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /ru/i }));
    });

    expect(screen.getByText<HTMLParagraphElement>(/russian/i)).toBeInTheDocument();
  });
});
