export const searchQueryFromSelectedLabels = (selectedLabels) => {
  const categoryQuery = selectedLabels
    .filter((label) => label.type === 'category')
    .map((label) => label.id);
  const mechanicQuery = selectedLabels
    .filter((label) => label.type === 'mechanic')
    .map((label) => label.id);
  const query = `/search/?categories=${categoryQuery}&mechanics=${mechanicQuery}`;
  return query;
};
