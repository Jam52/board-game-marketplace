import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SearchBar from '../SearchBar';

const validOptions = [
  {
    id: '2bdFPJUvFo',
    name: '18XX',
    url: 'https://www.boardgameatlas.com/category/2bdFPJUvFo/18xx',
  },
  {
    id: '85OKv8p5Ow',
    name: '4x',
    url: 'https://www.boardgameatlas.com/category/85OKv8p5Ow/4x',
  },
  {
    id: 'hBqZ3Ar4RJ',
    name: 'Abstract',
    url: 'https://www.boardgameatlas.com/category/hBqZ3Ar4RJ/abstract',
  },
];

const mockSubmitFunction = jest.fn();

const setup = () => {
  const wrapper = render(
    <SearchBar
      testid="mechanic-search"
      valid={validOptions}
      for="mechanics"
      placeholder="Category Search"
      submit={mockSubmitFunction}
    />,
  );
};

describe('SearchBar', () => {
  test('renders SearchBar', () => {
    setup();
    expect(screen.getByTestId('mechanic-search')).toBeInTheDocument();
  });

  test('input incorrect value does not call submit function', () => {
    setup();
    let searchBar = screen.getByTestId('mechanic-search');
    fireEvent.change(searchBar, {
      target: { value: 'kjbcjahdb' },
    });
    fireEvent.keyDown(searchBar, { key: 'Enter', code: 'Enter' });
    expect(mockSubmitFunction).not.toHaveBeenCalled();
  });

  test('input correct value calls submit function', () => {
    setup();
    let searchBar = screen.getByTestId('mechanic-search');
    fireEvent.change(searchBar, {
      target: { value: '18XX' },
    });
    fireEvent.keyDown(searchBar, { key: 'Enter', code: 'Enter' });
    expect(mockSubmitFunction).toHaveBeenCalled();
  });
});
