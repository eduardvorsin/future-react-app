import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import BooksSearch from './BooksSearch';
import i18n from '../../../localization/i18next';

const mockFn = jest.fn();
const router = createMemoryRouter([{
  path: '/',
  element: (
    <BooksSearch
      testId='test-book-search'
      onSearch={mockFn}
    />
  ),
}]);

describe('BooksSearch tests', () => {
  afterEach(async () => {
    await waitFor(() => router.navigate('/'));
  });

  it('is rendered correctly', () => {
    render(
      <RouterProvider router={router} />,
    );

    expect(screen.getByTestId<HTMLDivElement>('test-book-search')).toBeInTheDocument();
  });

  it('when you enter a value in the search field and click on the find button, the mock function should be called', async () => {
    const user = userEvent.setup();
    render(
      <RouterProvider router={router} />,
    );

    await waitFor(() => {
      user.type(screen.getByRole<HTMLInputElement>('textbox'), '123');
    });

    await waitFor(() => {
      user.click(screen.getByRole<HTMLButtonElement>('button', { name: /find/i }));
    });

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });

  it('is a basic snapshot', () => {
    render(
      <RouterProvider router={router} />,
    );

    expect(screen.getByTestId<HTMLDivElement>('test-book-search')).toMatchSnapshot();
  });
});

describe('BooksSearch integration tests', () => {
  afterEach(async () => {
    await waitFor(() => router.navigate('/'));
  });

  it('the component with the text in English is displayed correctly', () => {
    const localizedCategoriesLabel = i18n.t('bookSearch.categoriesLabel', { ns: 'homePage' });
    const localizedSortOrderLabel = i18n.t('bookSearch.sortOrderLabel', { ns: 'homePage' });
    const localizedSearchByLabel = i18n.t('bookSearch.searchByLabel', { ns: 'homePage' });

    render(
      <RouterProvider router={router} />,
    );

    expect(screen.getByLabelText<HTMLLabelElement>(localizedCategoriesLabel)).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLLabelElement>(localizedSortOrderLabel)).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLLabelElement>(localizedSearchByLabel)).toBeInTheDocument();
  });

  it('the component with the text in Russian is displayed correctly', () => {
    i18n.changeLanguage('ru');
    const localizedCategoriesLabel = i18n.t('bookSearch.categoriesLabel', { ns: 'homePage' });
    const localizedSortOrderLabel = i18n.t('bookSearch.sortOrderLabel', { ns: 'homePage' });
    const localizedSearchByLabel = i18n.t('bookSearch.searchByLabel', { ns: 'homePage' });

    render(
      <RouterProvider router={router} />,
    );

    expect(screen.getByLabelText<HTMLLabelElement>(localizedCategoriesLabel)).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLLabelElement>(localizedSortOrderLabel)).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLLabelElement>(localizedSearchByLabel)).toBeInTheDocument();
  });
});
