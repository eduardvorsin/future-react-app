import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import BooksList from './BooksList';
import { IBookPartial } from '../../../model/IBook';

const mockData: IBookPartial[] = [{
  id: '123',
  clientId: '123',
  authors: ['authors'],
  maturityRating: 'NOT_MATURE',
  title: 'title',
  imageLinks: {
    smallThumbnail: '',
    thumbnail: '',
  },
  retailPrice: {
    amount: 12,
    currencyCode: 'USD',
  },
}];

const router = createMemoryRouter([{
  path: '/',
  element: (
    <BooksList
      data={mockData}
      testId='test-book-list'
    />
  ),
}], { initialEntries: ['/'] });

const routerWithEmptyData = createMemoryRouter([{
  path: '/',
  element: (
    <BooksList
      data={[]}
      testId='test-book-list'
    />
  ),
}], { initialEntries: ['/'] });

describe('BooksList tests', () => {
  it('is rendered correctly', () => {
    render(
      <RouterProvider router={router} />,
    );

    expect(screen.getByTestId<HTMLDivElement>('test-book-list')).toBeInTheDocument();
  });

  it('if an empty array is passed, then the cards should not be rendered', () => {
    render(
      <RouterProvider router={routerWithEmptyData} />,
    );

    expect(screen.queryByText<HTMLParagraphElement>(/authors/i)).not.toBeInTheDocument();
    expect(screen.queryByText<HTMLParagraphElement>(/learn more/i)).not.toBeInTheDocument();
    expect(screen.queryByText<HTMLSpanElement>(/price/i)).not.toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    render(
      <RouterProvider router={router} />,
    );

    expect(screen.getByTestId<HTMLDivElement>('test-book-list')).toMatchSnapshot();
  });

  it('is a snapshot with an empty data array', () => {
    render(
      <RouterProvider router={routerWithEmptyData} />,
    );

    expect(screen.getByTestId<HTMLDivElement>('test-book-list')).toMatchSnapshot();
  });
});
