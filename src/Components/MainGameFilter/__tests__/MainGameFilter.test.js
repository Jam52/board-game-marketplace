import React from 'react';
import { render, screen, wait, fireEvent } from '@testing-library/react';
import MainGameFilter from '../MainGameFilter';
import { fetchDropdownOptions } from '../../../services/boardgameApi';

jest.mock('../../../services/boardgameApi.js');

describe('MainGameFilter', () => {
  const renderedElements = [
    'component-main-game-filter',
    'categories-dropdown',
    'mechanics-dropdown',
    'category-search',
    'mechanic-search',
    'player-count-dropdown',
    'play-time-dropdown',
    'year-published-input',
    'order-by-dropdown',
  ];

  describe.each(renderedElements)('when mounted', (element) => {
    test(`${element} is in the DOM`, () => {
      render(<MainGameFilter />);
      expect(screen.getByTestId(element)).toBeInTheDocument();
    });
  });

  test('fetch data call is called on mount', async () => {
    render(<MainGameFilter />);
    expect(fetchDropdownOptions).toHaveBeenCalledWith();
  });

  test('dropdowns contain unknown before data is fetched', () => {
    render(<MainGameFilter />);
    expect(screen.getAllByText('Unknown')).toHaveLength(2);
  });
  test('fetched category data displayed in dropdown', async () => {
    render(<MainGameFilter />);
    await wait(() => {
      expect(screen.getAllByTestId('category-option')).toHaveLength(5);
    });
  });
  test('fetched mechanics data displayed in dropdown', async () => {
    render(<MainGameFilter />);
    await wait(() => {
      expect(screen.getAllByTestId('mechanic-option')).toHaveLength(5);
    });
  });
});
