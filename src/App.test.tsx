import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import App from './App';
import ReduxWrapper from './tests/helpers/ReduxWrapper';
import i18n from './localization/i18next';
import dummyBooks from './tests/dummyBooks';
import { setupServerWithErrors } from './tests/server';
import { routes } from './router/AppRouter/AppRouter';

const router = createMemoryRouter(routes, { initialEntries: ['/'] });

describe('App tests', () => {
  afterEach(async () => {
    await waitFor(() => {
      i18n.changeLanguage('en');
    });
  });

  it('is rendered correctly', () => {
    render(<App />, { wrapper: ReduxWrapper });

    expect(screen.getByLabelText<HTMLLabelElement>(/language selection/i)).toBeInTheDocument();
    expect(screen.getByText<HTMLLegendElement>(/theme switcher/i)).toBeInTheDocument();
    expect(screen.getByRole<HTMLHeadingElement>('heading')).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLLabelElement>(/categories/i)).toBeInTheDocument();
  });

  it('if you select another option in the language selector, the active language should change', async () => {
    const user = userEvent.setup();
    render(<App />, { wrapper: ReduxWrapper });

    await waitFor(async () => {
      await user.selectOptions(screen.getAllByRole<HTMLSelectElement>('combobox')[0], 'ru');
    });

    expect(screen.getByLabelText<HTMLLabelElement>(/выбор языка/i)).toBeInTheDocument();
    expect(screen.getByText<HTMLLegendElement>(/переключатель/i)).toBeInTheDocument();
    expect(screen.getByText<HTMLHeadingElement>(/поиск книг/i)).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLLabelElement>(/категории/i)).toBeInTheDocument();
  });

  it('when switching the dark theme, the date attribute should be added to the html element', async () => {
    const user = userEvent.setup();
    render(<App />, { wrapper: ReduxWrapper });

    await waitFor(async () => {
      await user.click(screen.getAllByRole<HTMLInputElement>('switch')[1]);
    });

    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('when you enter a book into the search and click on the search button, the list of books should load', async () => {
    const user = userEvent.setup();
    render(<App />, { wrapper: ReduxWrapper });

    await waitFor(async () => {
      await user.type(screen.getByRole<HTMLInputElement>('textbox'), 'js');
    });
    await waitFor(async () => {
      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /find/i }));
    });

    expect(screen.getByTitle<HTMLDivElement>('loading spinner')).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.queryByTitle<HTMLDivElement>('loading spinner'));

    const bookItemTitle = new RegExp(dummyBooks.items[0].volumeInfo.title);
    const bookItemAuthors = new RegExp(dummyBooks.items[0].volumeInfo.authors[0]);
    const bookItemPrice = 'KZT 2,434';

    expect(screen.getByText<HTMLSpanElement>(bookItemPrice)).toBeInTheDocument();
    expect(screen.getByText<HTMLParagraphElement>(bookItemAuthors)).toBeInTheDocument();
    expect(screen.getByText<HTMLAnchorElement>(bookItemTitle)).toBeInTheDocument();
  });

  it('when you click on the learn more button, the url should change and render the page of a specific book', async () => {
    const user = userEvent.setup();
    const booksCount = i18n.t('booksCount', {
      count: 2,
      currentBooksCount: 2,
      ns: 'homePage',
    });

    render(<App />, { wrapper: ReduxWrapper });

    await waitFor(async () => {
      await user.type(screen.getByRole<HTMLInputElement>('textbox'), 'js');
    });
    await waitFor(async () => {
      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /find/i }));
    });
    await waitFor(async () => {
      await user.click(screen.getAllByRole<HTMLAnchorElement>('link', { name: /learn more/i })[0]);
    });

    await waitFor(async () => {
      expect(screen.queryByText<HTMLParagraphElement>(booksCount)).not.toBeInTheDocument();
    });

    expect(screen.getByText<HTMLSpanElement>(/Page count/i)).toBeInTheDocument();
    expect(screen.getByText<HTMLSpanElement>(/Book Type/i)).toBeInTheDocument();
    expect(screen.getByText<HTMLSpanElement>(/Published date/i)).toBeInTheDocument();
  });

  it('if there was some error with loading books, it should show it', async () => {
    setupServerWithErrors();
    const user = userEvent.setup();

    render(<App />, { wrapper: ReduxWrapper });

    await waitFor(async () => {
      await user.type(screen.getByRole<HTMLInputElement>('textbox'), 'js');
    });
    await waitFor(async () => {
      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /find/i }));
    });

    await waitForElementToBeRemoved(screen.queryByTitle<HTMLDivElement>('loading spinner'));

    expect(screen.queryByRole<HTMLAnchorElement>('link', { name: /learn more/i })).not.toBeInTheDocument();
    expect(screen.getByText<HTMLHeadingElement>(/failed to load/i)).toBeInTheDocument();
  });

  it('should render not found page if there is no corresponding route for the specified url', async () => {
    render(
      (
        <RouterProvider router={router} />
      ), { wrapper: ReduxWrapper },
    );

    await waitFor(() => {
      router.navigate('/about');
    });

    expect(screen.queryByLabelText<HTMLLabelElement>(/language selection/i)).not.toBeInTheDocument();
    expect(screen.queryByText<HTMLLegendElement>(/theme switcher/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText<HTMLLabelElement>(/categories/i)).not.toBeInTheDocument();

    expect(screen.getByText<HTMLHeadingElement>(/page not found/i)).toBeInTheDocument();
    expect(screen.getByText<HTMLAnchorElement>(/back to main page/i)).toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    render(<App />, { wrapper: ReduxWrapper });

    expect(document.body).toMatchSnapshot();
  });

  it('is a snapshot with a list of books', async () => {
    const user = userEvent.setup();
    render(<App />, { wrapper: ReduxWrapper });

    await waitFor(async () => {
      await user.type(screen.getByRole<HTMLInputElement>('textbox'), 'js');
    });
    await waitFor(async () => {
      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /find/i }));
    });

    expect(screen.getByTitle<HTMLDivElement>('loading spinner')).toBeInTheDocument();

    await waitForElementToBeRemoved(screen.queryByTitle<HTMLDivElement>('loading spinner'));

    expect(document.body).toMatchSnapshot();
  });

  it('is a snapshot with a fetch error message', async () => {
    setupServerWithErrors();
    const user = userEvent.setup();

    render(<App />, { wrapper: ReduxWrapper });

    await waitFor(async () => {
      await user.type(screen.getByRole<HTMLInputElement>('textbox'), 'js');
    });
    await waitFor(async () => {
      await user.click(screen.getByRole<HTMLButtonElement>('button', { name: /find/i }));
    });

    await waitForElementToBeRemoved(screen.queryByTitle<HTMLDivElement>('loading spinner'));

    expect(document.body).toMatchSnapshot();
  });
});
