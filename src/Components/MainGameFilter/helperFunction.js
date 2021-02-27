export const searchQueryFromSelectedLabels = (
  selectedLabels,
  selectedSubLabels,
  asc,
) => {
  const categoryQuery = returnIdFromLabel(selectedLabels, 'category');
  const mechanicQuery = returnIdFromLabel(selectedLabels, 'mechanic');
  const yearQuery = returnIdFromLabel(selectedSubLabels, 'year-published');
  const playTimeQuery = returnIdFromLabel(selectedSubLabels, 'play time');
  const orberByQuery = returnIdFromLabel(selectedSubLabels, 'order by');
  const playerCountQuery = returnIdFromLabel(selectedSubLabels, 'player count');
  const query = `/search/?categories=${categoryQuery}&mechanics=${mechanicQuery}&year_published=${yearQuery}&play_time=${playTimeQuery}&order_by=${orberByQuery}&asc=${asc}&player_count=${playerCountQuery}`;
  console.log(query);
  return query;
};

const returnIdFromLabel = (labels, category) => {
  return labels
    .filter((label) => label.type === category)
    .map((label) => label.id);
};
