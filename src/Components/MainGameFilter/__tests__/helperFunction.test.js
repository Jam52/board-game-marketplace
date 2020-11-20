import { searchQueryFromSelectedLabels } from '../helperFunction';

const selectedLabels = [
  {
    id: '2bdFPJUvFo',
    name: '18XX',
    url: 'https://www.boardgameatlas.com/category/2bdFPJUvFo/18xx',
    type: 'category',
  },
  {
    id: '85OKv8p5Ow',
    name: '4x',
    url: 'https://www.boardgameatlas.com/category/85OKv8p5Ow/4x',
    type: 'category',
  },
  {
    id: '2bdFPJUvFo',
    name: '18XX',
    url: 'https://www.boardgameatlas.com/category/2bdFPJUvFo/18xx',
    type: 'mechanic',
  },
  {
    id: '85OKv8p5Ow',
    name: '4x',
    url: 'https://www.boardgameatlas.com/category/85OKv8p5Ow/4x',
    type: 'mechanic',
  },
  {
    id: 15,
    name: '15 minues',
    type: 'play-time',
  },
  {
    id: 4,
    name: '4 players',
    type: 'player-count',
  },
  {
    id: 2000,
    name: '2000 - year published',
    type: 'year-published',
  },
  {
    id: 'popularity',
    name: 'popularity',
    type: 'order-by',
  },
];

test('returns a search param string', () => {
  expect(
    typeof searchQueryFromSelectedLabels(selectedLabels) === 'string',
  ).toBeTruthy();
});

test('return param string with all categories in one param', () => {
  const stringRegex = /categories=2bdFPJUvFo,85OKv8p5Ow/;
  expect(searchQueryFromSelectedLabels(selectedLabels)).toEqual(
    expect.stringMatching(stringRegex),
  );
});

test('return param string with all mechanics in one param', () => {
  const stringRegex = /mechanics=2bdFPJUvFo,85OKv8p5Ow/;
  expect(searchQueryFromSelectedLabels(selectedLabels)).toEqual(
    expect.stringMatching(stringRegex),
  );
});
