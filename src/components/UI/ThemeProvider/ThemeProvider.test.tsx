import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider, { useThemeContext } from './ThemeProvider';

const ThemeConsumer = () => {
  const { value, toggleTheme } = useThemeContext();

  return (
    <div>
      <p>{value}</p>
      <button onClick={toggleTheme}>toggle theme</button>
    </div>
  );
};

describe('ThemeProvider tests', () => {
  it('should render the component with the default theme value', () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByText<HTMLParagraphElement>(/dark/i)).toBeInTheDocument();
  });

  it('The theme value should change to light when calling the toggleTheme function', async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>,
    );

    expect(screen.getByText<HTMLParagraphElement>(/dark/i)).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(screen.getByRole<HTMLButtonElement>('button'));
    });

    expect(screen.getByText<HTMLParagraphElement>(/light/i)).toBeInTheDocument();
  });
});
