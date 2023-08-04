import React from 'react';
import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Card from './Card';
import Image from '../../../assets/images/placeholder128x185-en.jpeg';
import i18n from '../../../localization/i18next';

describe('Card tests', () => {
  it('is rendered correctly', () => {
    const router = createMemoryRouter(
      [{
        path: '/',
        element: (
          <Card
            src={Image}
            id='test-card'
            title='test-card-title'
            alt='test-card-alt-text'
            maturityRating='NOT_MATURE'
          />
        ),
      }],
      { initialEntries: ['/'] },
    );
    render(<RouterProvider router={router} />);

    expect(screen.getByRole<HTMLDivElement>('article')).toBeInTheDocument();
    expect(screen.getByText<HTMLParagraphElement>(/authors/i)).toBeInTheDocument();
    expect(screen.getByText<HTMLParagraphElement>(/price/i)).toBeInTheDocument();
    expect(screen.getAllByRole<HTMLAnchorElement>('link')).toHaveLength(3);
  });

  it('if the authors prop is missing, it will output unknown in the corresponding paragraph', () => {
    const router = createMemoryRouter(
      [{
        path: '/',
        element: (
          <Card
            src={Image}
            id='test-card'
            title='test-card-title'
            alt='test-card-alt-text'
            maturityRating='NOT_MATURE'
          />
        ),
      }],
      { initialEntries: ['/'] },
    );
    render(<RouterProvider router={router} />);

    expect(screen.getByText<HTMLParagraphElement>(/unknown/i)).toBeInTheDocument();
  });

  it('if there is no price prop, it will output unknown in the corresponding paragraph', () => {
    const router = createMemoryRouter(
      [{
        path: '/',
        element: (
          <Card
            src={Image}
            id='test-card'
            title='test-card-title'
            alt='test-card-alt-text'
            maturityRating='NOT_MATURE'
          />
        ),
      }],
      { initialEntries: ['/'] },
    );
    render(<RouterProvider router={router} />);

    expect(screen.getByText<HTMLParagraphElement>(/not available/i)).toBeInTheDocument();
  });

  it('if maturityRating is equal to Mature, the card__img-wrapper--mature class is added to imageWrapper', () => {
    const router = createMemoryRouter(
      [{
        path: '/',
        element: (
          <Card
            src={Image}
            id='test-card'
            title='test-card-title'
            alt='test-card-alt-text'
            maturityRating='MATURE'
          />
        ),
      }],
      { initialEntries: ['/'] },
    );
    render(<RouterProvider router={router} />);

    expect(screen.getByTestId<HTMLDivElement>(/image-wrapper/i)).toHaveClass('card__img-wrapper--mature');
  });

  it('is a basic snapshot', () => {
    const router = createMemoryRouter(
      [{
        path: '/',
        element: (
          <Card
            src={Image}
            id='test-card'
            title='test-card-title'
            alt='test-card-alt-text'
            maturityRating='NOT_MATURE'
          />
        ),
      }],
      { initialEntries: ['/'] },
    );
    render(<RouterProvider router={router} />);

    expect(screen.getByRole<HTMLDivElement>('article')).toMatchSnapshot();
  });

  describe('Card integration tests', () => {
    it('the component with the text in Russian is displayed correctly', () => {
      i18n.changeLanguage('ru');

      const router = createMemoryRouter(
        [{
          path: '/',
          element: (
            <Card
              src={Image}
              id='test-card'
              title='test-card-title'
              alt='test-card-alt-text'
              maturityRating='NOT_MATURE'
            />
          ),
        }],
        { initialEntries: ['/'] },
      );
      render(<RouterProvider router={router} />);

      expect(screen.getByRole<HTMLDivElement>('article')).toBeInTheDocument();
      expect(screen.getByText<HTMLParagraphElement>(/авторы/i)).toBeInTheDocument();
      expect(screen.getByText<HTMLParagraphElement>(/цена/i)).toBeInTheDocument();
      expect(screen.getAllByRole<HTMLAnchorElement>('link')).toHaveLength(3);
    });

    it('if the current language is Russian and there is no prop authors, then it should output "неизвестно" in the corresponding paragraph', () => {
      i18n.changeLanguage('ru');

      const router = createMemoryRouter(
        [{
          path: '/',
          element: (
            <Card
              src={Image}
              id='test-card'
              title='test-card-title'
              alt='test-card-alt-text'
              maturityRating='NOT_MATURE'
            />
          ),
        }],
        { initialEntries: ['/'] },
      );
      render(<RouterProvider router={router} />);

      expect(screen.getByText<HTMLParagraphElement>(/неизвестно/i)).toBeInTheDocument();
    });

    it('If the current language is Russian and there is no prop price, then it should output "Нет в наличии" in the corresponding paragraph', () => {
      i18n.changeLanguage('ru');

      const router = createMemoryRouter(
        [{
          path: '/',
          element: (
            <Card
              src={Image}
              id='test-card'
              title='test-card-title'
              alt='test-card-alt-text'
              maturityRating='NOT_MATURE'
            />
          ),
        }],
        { initialEntries: ['/'] },
      );
      render(<RouterProvider router={router} />);

      expect(screen.getByText<HTMLParagraphElement>(/нет в наличии/i)).toBeInTheDocument();
    });
  });
});
