import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from './Error';
import SunIcon from '../../../assets/images/icons/sun.svg';

describe('Error tests', () => {
  it('is rendered correctly', () => {
    render(
      <Error
        testId='test-error'
        message='test error message'
      />,
    );

    expect(screen.getByTestId<HTMLDivElement>(/test-error/i)).toBeInTheDocument();
    expect(screen.getByText<HTMLHeadingElement>(/test error message/i)).toBeInTheDocument();
  });

  it('if the isCentered prop is passed, the error--center class is added', () => {
    render(
      <Error
        isCentered
        testId='test-error'
        message='test error message'
      />,
    );

    expect(screen.getByTestId<HTMLDivElement>(/test-error/i)).toHaveClass('error--center');
  });

  it('if the icon prop is passed, then the icon is rendered', () => {
    render(
      <Error
        testId='test-error'
        message='test error message'
        icon={<SunIcon title='test-error-icon' />}
      />,
    );

    expect(screen.getByTitle<HTMLElement>(/test-error-icon/i)).toBeInTheDocument();
  });

  it('is a basic snapshot', () => {
    render(
      <Error
        testId='test-error'
        message='test error message'
      />,
    );

    expect(screen.getByTestId<HTMLDivElement>(/test-error/i)).toMatchSnapshot();
  });

  it('is a snapshot with an icon', () => {
    render(
      <Error
        testId='test-error'
        message='test error message'
        icon={<SunIcon title='test-error-icon' />}
      />,
    );

    expect(screen.getByTestId<HTMLDivElement>(/test-error/i)).toMatchSnapshot();
  });
});
