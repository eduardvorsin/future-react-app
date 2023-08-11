import React, { ChangeEvent } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switcher from './Switcher';

const mockInputLabels: [string, string] = ['on', 'off'];
const mockInputValues: [string, string] = ['on', 'off'];

describe('Switcher tests', () => {
  it('is rendered correctly', () => {
    const mockFn = jest.fn<void, [e: ChangeEvent]>();

    render(
      <Switcher
        checked
        name='test-switcher'
        labelText='test-switcher-label'
        inputLabels={mockInputLabels}
        value={mockInputValues}
        onChange={mockFn}
        testId='test-switcher'
      />,
    );

    expect(screen.getByTestId<HTMLFieldSetElement>('test-switcher')).toBeInTheDocument();
  });

  it('when the value changes, the mock function is triggered', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn<void, [e: ChangeEvent]>();

    render(
      <Switcher
        checked
        name='test-switcher'
        labelText='test-switcher-label'
        inputLabels={mockInputLabels}
        value={mockInputValues}
        onChange={mockFn}
        testId='test-switcher'
      />,
    );

    await user.click(screen.getAllByRole<HTMLInputElement>('switch')[1]);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('is a basic snapshot', () => {
    const mockFn = jest.fn<void, [e: ChangeEvent]>();

    render(
      <Switcher
        checked
        name='test-switcher'
        labelText='test-switcher-label'
        inputLabels={mockInputLabels}
        value={mockInputValues}
        onChange={mockFn}
        testId='test-switcher'
      />,
    );

    expect(screen.getByTestId<HTMLFieldSetElement>('test-switcher')).toMatchSnapshot();
  });
});
