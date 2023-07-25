import React from 'react';
import { render, screen } from '@testing-library/react';
import CharacteristicList from './CharacteristicList';
import { IBook } from '../../../model/IBook';

const mockData = {
  title: 'title1',
  authors: ['author1', 'author2'],
  language: 'en',
  maturityRating: 'NOT_MATURE',
  pageCount: 120,
  publishedDate: '10.12.2013',
  publisher: 'publisher',
  webReaderLink: '',
  buyLink: '',
  isEbook: true,
} as IBook;

describe('CharacteristicList tests', () => {
  it('is rendered correctly', () => {
    render(
      <CharacteristicList
        bookData={mockData}
      />,
    );

    expect(screen.getByRole<HTMLUListElement>('list')).toBeInTheDocument();
    expect(screen.getAllByRole<HTMLUListElement>('listitem')).toHaveLength(7);
    expect(screen.getByText<HTMLSpanElement>(/author1/i)).toBeInTheDocument();
  });

  it('if an empty array is passed to bookData, it should render ul without li', () => {
    render(
      <CharacteristicList
        // @ts-expect-error - checking if the array is empty
        bookData={[]}
      />,
    );

    expect(screen.getByRole<HTMLUListElement>('list')).toBeInTheDocument();
    expect(screen.queryByRole<HTMLLIElement>('listitem')).not.toBeInTheDocument();
    expect(screen.queryByText<HTMLSpanElement>('author1')).not.toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    render(
      <CharacteristicList
        bookData={mockData}
      />,
    );

    expect(screen.getByRole<HTMLUListElement>('list')).toMatchSnapshot();
  });

  it('is a snapshot with an empty list', () => {
    render(
      <CharacteristicList
        // @ts-expect-error - checking if the array is empty
        bookData={[]}
      />,
    );

    expect(screen.getByRole<HTMLUListElement>('list')).toMatchSnapshot();
  });
});
