import React from 'react';
import { render, screen } from '@testing-library/react';
import Title from './Title';

describe('Title tests', () => {
  it('is rendered correctly', () => {
    render(<Title level={4}>test title</Title>);

    expect(screen.getByRole<HTMLHeadingElement>('heading', { name: /test title/i })).toBeInTheDocument();
  });
  it('if the variant prop is equal to light, then the title--light class is added', () => {
    render(
      <Title
        variant='light'
        level={4}
      >
        test title
      </Title>,
    );

    expect(screen.getByRole<HTMLHeadingElement>('heading', { name: /test title/i })).toHaveClass('title--light');
  });
  it('if the level prop is set with the value 3, the title--level-3 class will be added', () => {
    render(
      <Title
        level={3}
      >
        test title
      </Title>,
    );

    expect(screen.getByRole<HTMLHeadingElement>('heading', { name: /test title/i })).toHaveClass('title--level-3');
  });
  it('is a basic snapshot', () => {
    render(
      <Title
        level={6}
        className='test-title'
      >
        test title
      </Title>,
    );

    expect(screen.getByRole<HTMLHeadingElement>('heading', { name: /test title/i })).toMatchSnapshot();
  });
});
