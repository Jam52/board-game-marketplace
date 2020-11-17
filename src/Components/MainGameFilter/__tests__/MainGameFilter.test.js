import React from 'react';
import { render, screen, wait } from '@testing-library/react';
import { findByTestAttr } from '../../../testUtils/testUtil';
import MainGameFilter from '../MainGameFilter';
import { fetchDropdownOptions } from '../../../services/boardgameApi';

jest.mock('../../../services/boardgameApi.js');

describe('MainGameFilter', () => {
  test('fetch data call is called on mount', async () => {
    render(<MainGameFilter />);
    expect(fetchDropdownOptions).toHaveBeenCalledTimes(1);
  });
  test('fetched category data desplayed in dropdown', async () => {
    render(<MainGameFilter />);
    await wait(() => {
      expect(screen.getAllByTestId('category-option')).toHaveLength(5);
    });
  });
  test('fetched mechanics data desplayed in dropdown', async () => {
    render(<MainGameFilter />);
    await wait(() => {
      expect(screen.getAllByTestId('mechanic-option')).toHaveLength(5);
    });
  });
  test('renders container component', () => {
    render(<MainGameFilter />);
    expect(
      screen.getByTestId('component-main-game-filter'),
    ).toBeInTheDocument();
  });
  test('renders category dropdown', () => {
    render(<MainGameFilter />);
    expect(screen.getByTestId('categories-dropdown')).toBeInTheDocument();
  });
  test('renders mechanics dropdown', () => {
    render(<MainGameFilter />);
    expect(screen.getByTestId('mechanics-dropdown')).toBeInTheDocument();
  });

  test('dropdowns contain unknown before data is fetched', async () => {
    render(<MainGameFilter />);
    expect(screen.getAllByText('Unknown')).toHaveLength(2);
  });
});
