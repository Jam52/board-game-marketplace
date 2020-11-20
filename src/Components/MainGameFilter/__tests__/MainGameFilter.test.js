import React from 'react';
import {
  render,
  screen,
  wait,
  waitForElement,
  fireEvent,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import MainGameFilter from '../MainGameFilter';
import { fetchDropdownOptions } from '../../../services/boardgameApi';
import { StateMock } from '@react-mock/state';
import { fakeDropdownData } from '../../../services/__mocks__/boardgameApi';

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
    afterEach(cleanup);

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

  describe('selected labels in state', () => {
    const renderComponent = (props) =>
      render(
        <StateMock
          state={{
            categories: fakeDropdownData.categories,
            mechanics: fakeDropdownData.mechanics,
            status: false,
            selectedLabels: [
              {
                id: '2bdFPJUvFo',
                name: '18XX',
                url: 'https://www.boardgameatlas.com/category/2bdFPJUvFo/18xx',
                type: 'category',
              },
            ],
          }}
        >
          <MainGameFilter {...props} />
        </StateMock>,
      );

    afterEach(cleanup);

    test('selected labels in state are displayed as labels in the dom', async () => {
      const { getAllByTestId } = renderComponent();
      expect(getAllByTestId('label')).toHaveLength(1);
    });

    test('selecting X on label removes it from the dom', () => {
      const { getAllByTestId } = renderComponent();
      const labels = getAllByTestId('label');
      waitForElementToBeRemoved(() => labels);
      fireEvent.click(getAllByTestId('label-cancel')[0]);
    });

    test('selecting category dropdown adds label to the dom', async () => {
      const { getByTestId, getAllByTestId } = renderComponent();
      await wait(() => {
        fireEvent.change(getByTestId('categories-dropdown'), {
          target: { value: '4x' },
        });
        const labels = getAllByTestId('label');
        expect(labels).toHaveLength(2);
      });
    });

    test('selecting a mechnic dropdown add a label to the dom', async () => {
      const { getByTestId, getAllByTestId } = renderComponent();
      await wait(() => {
        fireEvent.change(getByTestId('mechanics-dropdown'), {
          target: { value: '4x' },
        });
        const labels = getAllByTestId('label');
        expect(labels).toHaveLength(2);
      });
    });

    test('selecting a player count from dropdown adds a label to the dom', () => {
      const { getByTestId, getAllByTestId } = renderComponent();
      fireEvent.change(getByTestId('player-count-dropdown'), {
        target: { value: 1 },
      });
      const labels = getAllByTestId('label');
      expect(labels).toHaveLength(2);
    });

    test('selecting a playtime from dropdown adds a label to the dom', () => {
      const { getByText, getByTestId, getAllByTestId } = renderComponent();
      fireEvent.change(getByTestId('play-time-dropdown'), {
        target: { value: 15 },
      });
      const labels = getAllByTestId('label');
      expect(labels).toHaveLength(2);
      expect(getByText('15 minutes')).toBeInTheDocument();
    });

    test('selecting an order-by from dropdown adds a label to the dom', () => {
      const { getByTestId, getAllByTestId } = renderComponent();
      fireEvent.change(getByTestId('order-by-dropdown'), {
        target: { value: 'popularity' },
      });
      expect(getAllByTestId('label')).toHaveLength(2);
    });

    test('entering a year published adds label to the DOM', () => {
      const { getByTestId, getAllByTestId } = renderComponent();
      const dateInput = getByTestId('year-published-input');
      fireEvent.change(dateInput, {
        target: { value: '2000' },
      });
      fireEvent.keyDown(dateInput, { key: 'Enter', code: 'Enter' });
      expect(getAllByTestId('label')).toHaveLength(2);
    });
  });
});
