import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { MouseEvent } from 'react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Link from './Link';
import SunIcon from '../../../assets/images/icons/sun.svg';

describe('Link tests', () => {
  it('is rendered correctly', () => {
    render(
      <Link
        path='/'
      >
        test link
      </Link>,
    );

    expect(screen.getByRole<HTMLAnchorElement>('link')).toBeInTheDocument();
    expect(screen.getByRole<HTMLAnchorElement>('link').rel).toBe('noopener');
  });
  it('If the path prop is empty or null/undefined, then the link-disabled class is added', () => {
    render(
      <Link
      >
        test link
      </Link>,
    );

    expect(screen.getByRole<HTMLAnchorElement>('link')).toHaveClass('link--disabled');
  });
  it('when you click on the link, the mock function is triggered', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn<void, [e: MouseEvent]>();

    render(
      <Link
        path='/'
        onClick={mockFn}
      >
        test link
      </Link>,
    );

    await user.click(screen.getByRole<HTMLAnchorElement>('link'));

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('if the icon prop is passed, the icon will be rendered inside the link', () => {
    render(
      <Link
        path='/'
        icon={<SunIcon data-testid='test-icon' />}
      >
        test link
      </Link>,
    );

    expect(screen.getByTestId<HTMLElement>('test-icon')).toBeInTheDocument();
  });

  it('if the icon prop is passed, then the icon is rendered and the wrapper has the link__icon-wrapper--left class', () => {
    render(
      <Link
        path='/'
        icon={<SunIcon />}
      >
        test link
      </Link>,
    );

    expect(screen.getByTestId<HTMLSpanElement>('icon-wrapper')).toHaveClass('link__icon-wrapper--left');
  });
  it('if the icon prop is passed and the icon Position prop is equal to right, then the wrapper has the link__icon-wrapper--right class', () => {
    render(
      <Link
        path='/'
        icon={<SunIcon />}
        iconPosition='right'
      >
        test link
      </Link>,
    );

    expect(screen.getByTestId<HTMLSpanElement>('icon-wrapper')).toHaveClass('link__icon-wrapper--right');
  });

  it('if the isRouterLink prop is passed, then the link for the router is rendered', () => {
    const router = createMemoryRouter([{
      path: '/',
      element: (
        <Link
          path='/'
          isRouterLink
        >
          test link
        </Link>
      ),
    }], {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole<HTMLAnchorElement>('link')).toBeInTheDocument();
    expect(screen.getByRole<HTMLAnchorElement>('link')).not.toHaveAttribute('rel');
  });

  it('is a basic snapshot', () => {
    render(
      <Link
        path='/'
      >
        test link
      </Link>,
    );

    expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
  });

  it('this is a snapshot with an icon on the left', () => {
    render(
      <Link
        path='/'
        icon={<SunIcon />}
      >
        test link
      </Link>,
    );

    expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
  });

  it('this is a snapshot with an icon on the right', () => {
    render(
      <Link
        path='/'
        icon={<SunIcon />}
      >
        test link
      </Link>,
    );

    expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
  });

  it('is a snapshot with a link from the router', () => {
    const router = createMemoryRouter([{
      path: '/',
      element: (
        <Link
          path='/'
          isRouterLink
        >
          test link
        </Link>
      ),
    }], {
      initialEntries: ['/'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByRole<HTMLAnchorElement>('link')).toMatchSnapshot();
  });
});
