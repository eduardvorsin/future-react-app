import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import BookDescription from './BookDescription';
import ReduxWrapper from '../../../tests/helpers/ReduxWrapper';
import i18n from '../../../localization/i18next';

const bookDataMock = {
  authors: [
    'Henchett Eric',
    'Listuon Benjamin',
  ],
  categories: ['Computers / Languages / JavaScript'],
  description: 'Vue.js - this is a popular library for creating user interfaces.',
  language: 'en',
  maturityRating: 'NOT_MATURE',
  pageCount: 304,
  publishedDate: '2019-02-25',
  publisher: '"Издательский дом ""Питер"""',
  title: 'Vue.js в действии',
  industryIdentifiers: [
    {
      type: 'ISBN_10',
      identifier: '5446110986',
    },
    {
      type: 'ISBN_13',
      identifier: '9785446110988',
    },
  ],
  imageLinks: {
    smallThumbnail: 'http://books.google.com/books/publisher/content?id=ZGGLDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE71e3hoeDHHQQLo88dJ5CA-_YYDITEiOpKKp6ar4opPxAckmKLwAl6TQxsjPQH-F9zVgoStRHL1S8NpPD1N7yGe5BFdMQSzrgNTVmJYnNdfrSr9yGW2agtlbQ5NHgYMxj--9qJe7&source=gbs_api',
    thumbnail: 'http://books.google.com/books/publisher/content?id=ZGGLDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71Dt516axDZ-SnR2stjeuBpPtptWBbMDg16UMmAqiSPOphOTWqQIfDdRxUYQKymbU8wPk4XJMgFZTfZgmqhxM073I6IIkYDr-Ewk46ITSYfPGCxSsEW9Tz_fupqZHEvs5bgH2NN&source=gbs_api',
    small: 'http://books.google.com/books/publisher/content?id=ZGGLDwAAQBAJ&printsec=frontcover&img=1&zoom=2&edge=curl&imgtk=AFLRE704N6ZtYHbUfTMclBu28YCI60N-jQpNpzAy4ORmlidrrfKJqKAZF6fHZwdUzLfesFycT64GvFUgTrIQkM8JgXG60UBcy0oGIUlvBHib-wggpfIOOQEsHrzUw19ZipV8EVRTJEsh&source=gbs_api',
    medium: 'http://books.google.com/books/publisher/content?id=ZGGLDwAAQBAJ&printsec=frontcover&img=1&zoom=3&edge=curl&imgtk=AFLRE73kEchC1gD2nAmiV_Gnyc8Fxl5nuJayRpTus8CUWPeH5E-YU9NEZmUciVSF8VpxZvuRlcRwcBkenVrC1O77GBB9QaGCM_3AB3pDNwjRDzJMVm-R77-XcoHeVQ557ksVjkWfatkA&source=gbs_api',
    large: 'http://books.google.com/books/publisher/content?id=ZGGLDwAAQBAJ&printsec=frontcover&img=1&zoom=4&edge=curl&imgtk=AFLRE70NnA4BuexkY5ND8jA54P_siFmRilL6IlKsLP-vduWOLxB8vrp3d2wSDBr170TSZFLdb_uQOUv19ngcSGeiqwqdstTAT6HknjLk-X77CA-JXIm1SgJtB_VwKz3KMR878VPeYMpJ&source=gbs_api',
    extraLarge: 'http://books.google.com/books/publisher/content?id=ZGGLDwAAQBAJ&printsec=frontcover&img=1&zoom=6&edge=curl&imgtk=AFLRE70JbpYFxiRvR1scLtR4JvU3L6_xM1SWLBgL0HyGqYQX0ZADI9WIO8XEliJysMjF4WpbxaTN358BPAQQJzWhcXKpNWLuLKBIsra9hPA7Ii9VaLX1rrvGvCGDqPHMmvDvmCa5i1yr&source=gbs_api',
  },
  webReaderLink: 'http://play.google.com/books/reader?id=ZGGLDwAAQBAJ&hl=&source=gbs_api',
  buyLink: 'https://play.google.com/store/books/details?id=ZGGLDwAAQBAJ&rdid=book-ZGGLDwAAQBAJ&rdot=1&source=gbs_api',
  isEbook: true,
  retailPrice: {
    amount: 6593.15,
    currencyCode: 'KZT',
  },
};

const routes = [{
  path: '/books/:id',
  loader: async () => bookDataMock,
  element: (
    <BookDescription
      testId='test-book-description'
    />
  ),
}];
const router = createMemoryRouter(routes, { initialEntries: ['/books/ZGGLDwAAQBAJ'] });

describe('BookDescription test', () => {
  it('should render correctly', async () => {
    render(<RouterProvider router={router} />, { wrapper: ReduxWrapper });

    await waitFor(() => {
      expect(screen.getByTestId<HTMLDivElement>('test-book-description')).toBeInTheDocument();
    });
  });

  it('if an incorrect id is specified in the url, the component will render placeholders for book data', async () => {
    const routerWithEmptyData = createMemoryRouter([{
      path: '/books/:id',
      loader: async () => null,
      element: (
        <BookDescription
          testId='test-book-description'
        />
      ),
    }], { initialEntries: ['/books/ZGGLDwAAQBAJ'] });
    render(<RouterProvider router={routerWithEmptyData} />, { wrapper: ReduxWrapper });

    await waitFor(() => {
      expect(screen.getAllByText<HTMLParagraphElement>(/unknown/i)).toHaveLength(2);
    });

    expect(screen.getAllByText<HTMLParagraphElement>(/not available/i)).toHaveLength(2);
  });

  it('is a basic snapshot', async () => {
    render(<RouterProvider router={router} />, { wrapper: ReduxWrapper });

    await waitFor(() => {
      expect(screen.getByTestId<HTMLDivElement>('test-book-description')).toBeInTheDocument();
    });

    expect(screen.getByTestId<HTMLDivElement>('test-book-description')).toMatchSnapshot();
  });

  it('is a snapshot with placeholders for missing data', async () => {
    const routerWithEmptyData = createMemoryRouter([{
      path: '/books/:id',
      loader: async () => null,
      element: (
        <BookDescription
          testId='test-book-description'
        />
      ),
    }], { initialEntries: ['/books/ZGGLDwAAQBAJ'] });
    render(<RouterProvider router={routerWithEmptyData} />, { wrapper: ReduxWrapper });

    await waitFor(() => {
      expect(screen.getAllByText<HTMLParagraphElement>(/unknown/i)).toHaveLength(2);
    });

    expect(screen.getByTestId<HTMLDivElement>('test-book-description')).toMatchSnapshot();
  });
});

describe('BookDescription integration tests', () => {
  it('the component with the text in English is displayed correctly', () => {
    const bookFragmentLink = new RegExp(i18n.t('readBookFragment', { ns: 'bookDescription' }));
    const categories = new RegExp(i18n.t('categories', { ns: 'bookDescription' }));
    const characteristicsTitle = new RegExp(i18n.t('characteristicsTitle', { ns: 'bookDescription' }));
    const buyLink = new RegExp(i18n.t('buy'));

    render(<RouterProvider router={router} />, { wrapper: ReduxWrapper });

    expect(screen.getByText<HTMLAnchorElement>(bookFragmentLink)).toBeInTheDocument();
    expect(screen.getByText<HTMLParagraphElement>(categories)).toBeInTheDocument();
    expect(screen.getByText<HTMLHeadingElement>(characteristicsTitle)).toBeInTheDocument();
    expect(screen.getByText<HTMLAnchorElement>(buyLink)).toBeInTheDocument();
  });

  it('the component with the text in Russian is displayed correctly', () => {
    i18n.changeLanguage('ru');
    const bookFragmentLink = new RegExp(i18n.t('readBookFragment', { ns: 'bookDescription' }));
    const categories = new RegExp(i18n.t('categories', { ns: 'bookDescription' }));
    const characteristicsTitle = new RegExp(i18n.t('characteristicsTitle', { ns: 'bookDescription' }));
    const buyLink = new RegExp(i18n.t('buy'));

    render(<RouterProvider router={router} />, { wrapper: ReduxWrapper });

    expect(screen.getByText<HTMLAnchorElement>(bookFragmentLink)).toBeInTheDocument();
    expect(screen.getByText<HTMLParagraphElement>(categories)).toBeInTheDocument();
    expect(screen.getByText<HTMLHeadingElement>(characteristicsTitle)).toBeInTheDocument();
    expect(screen.getByText<HTMLAnchorElement>(buyLink)).toBeInTheDocument();
  });
});
