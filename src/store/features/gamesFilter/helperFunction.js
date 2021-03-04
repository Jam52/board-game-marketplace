export const searchQueryFromSelectedLabels = (
  selectedLabels,
  isAsc,
  skipValue,
  orderBy,
) => {
  const categoryQuery = returnIdFromLabel(selectedLabels, 'category');
  const mechanicQuery = returnIdFromLabel(selectedLabels, 'mechanic');
  const yearQuery = returnIdFromLabel(selectedLabels, 'year-published');
  const playTimeQuery = returnIdFromLabel(selectedLabels, 'play time');
  const playerCountQuery = returnIdFromLabel(selectedLabels, 'player count');
  let skip = 0;
  if (skipValue) {
    skip = skipValue;
  }

  const query = `/search/?categories=${categoryQuery}&mechanics=${mechanicQuery}&year_published=${yearQuery}&play_time=${playTimeQuery}&order_by=${orderBy}&asc=${isAsc}&player_count=${playerCountQuery}&skip=${
    skip * 30
  }`;
  console.log(query);
  return query;
};

const returnIdFromLabel = (labels, category) => {
  return labels
    .filter((label) => label.type === category)
    .map((label) => label.id);
};
