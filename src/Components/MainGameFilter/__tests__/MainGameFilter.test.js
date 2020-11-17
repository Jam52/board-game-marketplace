import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import MainGameFilter from '../MainGameFilter';
import { fetchDropdownOptions } from '../../../services/boardgameApi';

jest.mock('../../../services/boardgameApi.js');

describe('MainGameFilter', () => {
  test('renders container component', () => {
    render(<MainGameFilter />);
    expect(
      screen.getByTestId('component-main-game-filter'),
    ).toBeInTheDocument();
  });
  test('fetch data call is called on mount', async () => {
    render(<MainGameFilter />);
    expect(fetchDropdownOptions).toHaveBeenCalledWith();
  });
  test('renders category dropdown', () => {
    render(<MainGameFilter />);
    expect(screen.getByTestId('categories-dropdown')).toBeInTheDocument();
  });
  test('renders mechanics dropdown', () => {
    render(<MainGameFilter />);
    expect(screen.getByTestId('mechanics-dropdown')).toBeInTheDocument();
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
  test('renders category search component', () => {
    render(<MainGameFilter />);
    expect(screen.getByTestId('category-search')).toBeInTheDocument();
  });
  test('renders mechnic search component', () => {
    render(<MainGameFilter />);
    expect(screen.getByTestId('mechanic-search')).toBeInTheDocument();
  });
});
