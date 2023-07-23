import React, { MouseEvent } from 'react';
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button tests', () => {
  it('is rendered correctly', () => {
    render(<Button>test button</Button>);

    expect(screen.getByRole<HTMLButtonElement>('button', { name: /test button/i })).toBeInTheDocument();
  });

  it('when you click on the button, the mock function should be triggered', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn<void, [e: MouseEvent]>();
    render(
      <Button
        onClick={mockFn}
      >
        test button
      </Button>,
    );

    await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /test button/i }));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
  it('when the iconButton prop is true, the button--icon-button class is added', () => {
    render(
      <Button
        iconButton
      >
        test button
      </Button>,
    );

    expect(screen.getByRole<HTMLButtonElement>('button', { name: /test button/i })).toHaveClass('button--icon-button');
  });

  it('is a basic snapshot', () => {
    const mockFn = jest.fn<void, [e: MouseEvent]>();
    render(
      <Button
        className='test-btn'
        onClick={mockFn}
        iconButton
      >
        test button
      </Button>,
    );

    expect(screen.getByRole<HTMLButtonElement>('button', { name: /test button/i })).toMatchSnapshot();
  });
});
