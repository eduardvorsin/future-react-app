import React from 'react';
import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';
import i18n from '../../../localization/i18next';

describe('Spinner tests', () => {
  it('is rendered correctly', () => {
    render(
      <Spinner
        size={100}
      />,
    );

    expect(screen.getByTitle<HTMLDivElement>('loading spinner')).toBeInTheDocument();
  });

  it('if the prop size is 120 then the width and height of the spinner is also 120', () => {
    render(
      <Spinner
        size={120}
      />,
    );

    expect(screen.getByTitle<HTMLDivElement>('loading spinner')).toHaveStyle({
      width: '120',
      height: '120',
    });
  });

  it('is a basic snapshot', () => {
    render(
      <Spinner
        size={120}
      />,
    );

    expect(screen.getByTitle<HTMLDivElement>('loading spinner')).toMatchSnapshot();
  });

  it('is a snapshot with a component size of 150px', () => {
    render(
      <Spinner
        size={150}
      />,
    );

    expect(screen.getByTitle<HTMLDivElement>('loading spinner')).toMatchSnapshot();
  });
});

describe('Spinner integration tests', () => {
  it('the component with the text in English is displayed correctly', () => {
    const localizedText = `${i18n.t('loading')}...`;

    render(
      <Spinner
        size={100}
      />,
    );

    expect(screen.getByLabelText<HTMLDivElement>(localizedText)).toBeInTheDocument();
  });

  it('the component with the text in Russian is displayed correctly', () => {
    i18n.changeLanguage('ru');
    const localizedText = `${i18n.t('loading')}...`;

    render(
      <Spinner
        size={100}
      />,
    );

    expect(screen.getByLabelText<HTMLDivElement>(localizedText)).toBeInTheDocument();
  });
});
