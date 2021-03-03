export const searchQueryFromSelectedLabels = (selectedLabels, isAsc) => {
  const categoryQuery = returnIdFromLabel(selectedLabels, 'category');
  const mechanicQuery = returnIdFromLabel(selectedLabels, 'mechanic');
  const yearQuery = returnIdFromLabel(selectedLabels, 'year-published');
  const playTimeQuery = returnIdFromLabel(selectedLabels, 'play time');
  const orderByQuery = returnIdFromLabel(selectedLabels, 'order by');
  const playerCountQuery = returnIdFromLabel(selectedLabels, 'player count');

  const query = `/search/?categories=${categoryQuery}&mechanics=${mechanicQuery}&year_published=${yearQuery}&play_time=${playTimeQuery}&order_by=${
    orderByQuery || 'average_user_rating'
  }&asc=${isAsc}&player_count=${playerCountQuery}`;
  console.log(query);
  return query;
};

const returnIdFromLabel = (labels, category) => {
  return labels
    .filter((label) => label.type === category)
    .map((label) => label.id);
};
