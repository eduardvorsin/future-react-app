import React from 'react';
import { render, screen } from '@testing-library/react';
import BooksCount from './BooksCount';
import i18n from '../../../localization/i18next';

describe('BooksCount tests', () => {
  it('is rendered correctly', () => {
    render(
      <BooksCount
        itemsCount={0}
        totalItemsCount={1}
      />,
    );

    expect(screen.getByText<HTMLParagraphElement>(/book/i)).toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    render(
      <BooksCount
        itemsCount={0}
        totalItemsCount={1}
      />,
    );

    expect(screen.getByText<HTMLParagraphElement>(/book/i)).toMatchSnapshot();
  });

  it('is a snapshot when 0 books', () => {
    render(
      <BooksCount
        itemsCount={0}
        totalItemsCount={0}
      />,
    );

    expect(screen.getByText<HTMLParagraphElement>(/book/i)).toMatchSnapshot();
  });
});

describe('BooksCount integration tests', () => {
  it('the component with the text in English is displayed correctly', () => {
    const localizedText = i18n.t('booksCount', {
      count: 22,
      currentBooksCount: 11,
      ns: 'homePage',
    });

    render(
      <BooksCount
        itemsCount={11}
        totalItemsCount={22}
      />,
    );

    expect(screen.getByText<HTMLParagraphElement>(localizedText)).toBeInTheDocument();
  });

  it('the component with the text in Russian is displayed correctly', () => {
    i18n.changeLanguage('ru');
    const localizedText = i18n.t('booksCount', {
      count: 22,
      currentBooksCount: 11,
      ns: 'homePage',
    });

    render(
      <BooksCount
        itemsCount={11}
        totalItemsCount={22}
      />,
    );

    expect(screen.getByText<HTMLParagraphElement>(localizedText)).toBeInTheDocument();
  });
});
