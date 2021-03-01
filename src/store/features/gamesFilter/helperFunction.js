export const searchQueryFromSelectedLabels = (selectedLabels, asc) => {
  const categoryQuery = returnIdFromLabel(selectedLabels, 'category');
  const mechanicQuery = returnIdFromLabel(selectedLabels, 'mechanic');
  const yearQuery = returnIdFromLabel(selectedLabels, 'year-published');
  const playTimeQuery = returnIdFromLabel(selectedLabels, 'play time');
  const orderByQuery = returnIdFromLabel(selectedLabels, 'order by');
  const playerCountQuery = returnIdFromLabel(selectedLabels, 'player count');
  let ascQuery = '';

  if (orderByQuery.length !== 0) {
    ascQuery = asc;
  }
  const query = `/search/?categories=${categoryQuery}&mechanics=${mechanicQuery}&year_published=${yearQuery}&play_time=${playTimeQuery}&order_by=${orderByQuery}&asc=${ascQuery}&player_count=${playerCountQuery}`;
  console.log(query);
  return query;
};

const returnIdFromLabel = (labels, category) => {
  return labels
    .filter((label) => label.type === category)
    .map((label) => label.id);
};