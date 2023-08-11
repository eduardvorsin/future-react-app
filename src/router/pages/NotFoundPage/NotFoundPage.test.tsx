import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import i18n from '../../../localization/i18next';

const router = createMemoryRouter([{
  path: '/',
  element: (
    <NotFoundPage
      testId='test-not-found-page'
    />
  ),
}]);

describe('NotFoundPage tests', () => {
  it('is rendered correctly', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId<HTMLDivElement>('test-not-found-page')).toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId<HTMLDivElement>('test-not-found-page')).toMatchSnapshot();
  });
});

describe('BooksSearch integration tests', () => {
  it('the component with the text in English is displayed correctly', () => {
    const localizedTitle = i18n.t('mainTitle', { ns: 'notFoundPage' });

    render(<RouterProvider router={router} />);

    expect(screen.getByText<HTMLHeadingElement>(localizedTitle)).toBeInTheDocument();
  });

  it('the component with the text in Russian is displayed correctly', () => {
    i18n.changeLanguage('ru');
    const localizedTitle = i18n.t('mainTitle', { ns: 'notFoundPage' });

    render(<RouterProvider router={router} />);

    expect(screen.getByText<HTMLHeadingElement>(localizedTitle)).toBeInTheDocument();
  });
});
