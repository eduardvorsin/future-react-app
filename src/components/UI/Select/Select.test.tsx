import React, { ChangeEvent } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Select from './Select';

const mockData = [
  {
    value: 'test-value-1',
    label: 'test-label-1',
  },
  {
    value: 'test-value-2',
    label: 'test-label-2',
  },
  {
    value: 'test-value-3',
    label: 'test-label-3',
  },
  {
    value: 'test-value-4',
    label: 'test-label-4',
  },
  {
    value: 'test-value-5',
    label: 'test-label-5',
  },
];

describe('Select tests', () => {
  it('is rendered correctly', () => {
    const mockFn = jest.fn<void, [e: ChangeEvent]>();

    render(
      <Select
        id='test-select'
        labelText='test-select'
        options={mockData}
        onChange={mockFn}
        value={mockData[0].value}
        testId='test-select'
      />,
    );

    expect(screen.getByTestId<HTMLDivElement>('test-select')).toBeInTheDocument();
    expect(screen.getByRole<HTMLSelectElement>('combobox')).toBeInTheDocument();
    expect(screen.getAllByRole<HTMLOptionElement>('option')).toHaveLength(5);
  });
  it('the mock function should be triggered when the selection item is changed', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn<void, [e: ChangeEvent]>();

    render(
      <Select
        id='test-select'
        labelText='test-select'
        options={mockData}
        onChange={mockFn}
        value={mockData[0].value}
        testId='test-select'
      />,
    );

    await user.selectOptions(screen.getByRole<HTMLSelectElement>('combobox'), 'test-value-2');

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('if the options array is empty then the select is rendered without options', () => {
    const mockFn = jest.fn<void, [e: ChangeEvent]>();

    render(
      <Select
        id='test-select'
        labelText='test-select'
        options={[]}
        onChange={mockFn}
        value={mockData[0].value}
        testId='test-select'
      />,
    );

    expect(screen.queryByRole<HTMLOptionElement>('option')).not.toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    const mockFn = jest.fn<void, [e: ChangeEvent]>();

    render(
      <Select
        id='test-select'
        labelText='test-select'
        options={mockData}
        onChange={mockFn}
        value={mockData[0].value}
        testId='test-select'
      />,
    );

    expect(screen.getByTestId<HTMLDivElement>('test-select')).toMatchSnapshot();
  });

  it('is asnapshot with an empty array of options', () => {
    const mockFn = jest.fn<void, [e: ChangeEvent]>();

    render(
      <Select
        id='test-select'
        labelText='test-select'
        options={[]}
        onChange={mockFn}
        value={mockData[0].value}
        testId='test-select'
      />,
    );

    expect(screen.getByTestId<HTMLDivElement>('test-select')).toMatchSnapshot();
  });
});
