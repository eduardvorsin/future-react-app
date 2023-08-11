import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';
import i18n from '../../../localization/i18next';
import ReduxWrapper from '../../../tests/helpers/ReduxWrapper';

const router = createMemoryRouter([{
  path: '/',
  element: <HomePage testId='test-home-page' />,
}]);

describe('HomePage tests', () => {
  it('is rendered correctly', () => {
    render(<RouterProvider router={router} />, { wrapper: ReduxWrapper });

    expect(screen.getByTestId<HTMLDivElement>('test-home-page')).toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    render(<RouterProvider router={router} />, { wrapper: ReduxWrapper });

    expect(screen.getByTestId<HTMLDivElement>('test-home-page')).toMatchSnapshot();
  });
});

describe('HomePage integration tests', () => {
  it('the component with the text in English is displayed correctly', () => {
    const localizedTitle = i18n.t('mainTitle', { ns: 'homePage' });

    render(<RouterProvider router={router} />, { wrapper: ReduxWrapper });

    expect(screen.getByText<HTMLHeadingElement>(localizedTitle)).toBeInTheDocument();
  });

  it('the component with the text in Russian is displayed correctly', () => {
    i18n.changeLanguage('ru');
    const localizedTitle = i18n.t('mainTitle', { ns: 'homePage' });

    render(<RouterProvider router={router} />, { wrapper: ReduxWrapper });

    expect(screen.getByText<HTMLHeadingElement>(localizedTitle)).toBeInTheDocument();
  });
});
