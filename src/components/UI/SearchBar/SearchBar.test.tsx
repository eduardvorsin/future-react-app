import React, { ChangeEvent, MouseEvent } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from './SearchBar';
import i18n from '../../../localization/i18next';

describe('SearchBar tests', () => {
  it('is rendered correctly', () => {
    const mockFindHandler = jest.fn<void, []>();
    const mockClearHandler = jest.fn<void, [e: MouseEvent]>();
    const mockChangeHandler = jest.fn<void, [e: ChangeEvent]>();

    render(
      <SearchBar
        onClear={mockClearHandler}
        onSearch={mockFindHandler}
        onChange={mockChangeHandler}
        value='mock value'
        testId='test-searchbar'
      />,
    );

    expect(screen.getByTestId<HTMLFormElement>('test-searchbar')).toBeInTheDocument();
  });

  it('when you click on the clear button, the mock function should work', async () => {
    const user = userEvent.setup();
    const mockFindHandler = jest.fn<void, []>();
    const mockClearHandler = jest.fn<void, [e: MouseEvent]>();
    const mockChangeHandler = jest.fn<void, [e: ChangeEvent]>();

    render(
      <SearchBar
        onClear={mockClearHandler}
        onSearch={mockFindHandler}
        onChange={mockChangeHandler}
        value='mock value'
      />,
    );

    await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /clear/i }));

    expect(mockClearHandler).toHaveBeenCalledTimes(1);
  });

  it('when you click on the find button, the mock function should work', async () => {
    const user = userEvent.setup();
    const mockFindHandler = jest.fn<void, []>();
    const mockClearHandler = jest.fn<void, [e: MouseEvent]>();
    const mockChangeHandler = jest.fn<void, [e: ChangeEvent]>();

    render(
      <SearchBar
        onClear={mockClearHandler}
        onSearch={mockFindHandler}
        onChange={mockChangeHandler}
        value='mock value'
      />,
    );

    await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /find/i }));

    expect(mockFindHandler).toHaveBeenCalledTimes(1);
  });

  it('when entering a value in the search field, the mock function should be called', async () => {
    const user = userEvent.setup();
    const mockFindHandler = jest.fn<void, []>();
    const mockClearHandler = jest.fn<void, [e: MouseEvent]>();
    const mockChangeHandler = jest.fn<void, [e: ChangeEvent]>();

    render(
      <SearchBar
        onClear={mockClearHandler}
        onSearch={mockFindHandler}
        onChange={mockChangeHandler}
        value='mock value'
      />,
    );

    await user.type(screen.getByRole<HTMLInputElement>('textbox'), 'a');

    expect(mockChangeHandler).toHaveBeenCalledTimes(1);
  });

  it('is a basic snapshot', () => {
    const mockFindHandler = jest.fn<void, []>();
    const mockClearHandler = jest.fn<void, [e: MouseEvent]>();
    const mockChangeHandler = jest.fn<void, [e: ChangeEvent]>();

    render(
      <SearchBar
        onClear={mockClearHandler}
        onSearch={mockFindHandler}
        onChange={mockChangeHandler}
        value='mock value'
        testId='test-searchbar'
      />,
    );

    expect(screen.getByTestId<HTMLFormElement>('test-searchbar')).toMatchSnapshot();
  });
});

describe('SearchBar integration tests', () => {
  it('the component with the text in English is displayed correctly', () => {
    const mockFindHandler = jest.fn<void, []>();
    const mockClearHandler = jest.fn<void, [e: MouseEvent]>();
    const mockChangeHandler = jest.fn<void, [e: ChangeEvent]>();
    const localizedLabelText = i18n.t('searchBar.label');
    const localizedClearButtonText = i18n.t('searchBar.clear');

    render(
      <SearchBar
        onClear={mockClearHandler}
        onSearch={mockFindHandler}
        onChange={mockChangeHandler}
        value='mock value'
        testId='test-searchbar'
      />,
    );

    expect(screen.getByLabelText<HTMLLabelElement>(localizedLabelText)).toBeInTheDocument();
    expect(screen.getByRole<HTMLButtonElement>('button', { name: localizedClearButtonText })).toBeInTheDocument();
  });

  it('the component with the text in Russian is displayed correctly', () => {
    i18n.changeLanguage('ru');
    const mockFindHandler = jest.fn<void, []>();
    const mockClearHandler = jest.fn<void, [e: MouseEvent]>();
    const mockChangeHandler = jest.fn<void, [e: ChangeEvent]>();
    const localizedLabelText = i18n.t('searchBar.label');
    const localizedClearButtonText = i18n.t('searchBar.clear');

    render(
      <SearchBar
        onClear={mockClearHandler}
        onSearch={mockFindHandler}
        onChange={mockChangeHandler}
        value='mock value'
        testId='test-searchbar'
      />,
    );

    expect(screen.getByLabelText<HTMLLabelElement>(localizedLabelText)).toBeInTheDocument();
    expect(screen.getByRole<HTMLButtonElement>('button', { name: localizedClearButtonText })).toBeInTheDocument();
  });
});
