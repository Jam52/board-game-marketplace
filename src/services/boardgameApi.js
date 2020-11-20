import axios from '../axios';

export const fetchDropdownOptions = async (term) => {
  const categories = await axios.get(`categories`);
  const mechanics = await axios.get(`mechanics`);
  const data = {
    categories: await categories.data.categories,
    mechanics: await mechanics.data.mechanics,
  };
  return data;
};

export const fetchGameData = async (searchQuery) => {
  const data = await axios.get(searchQuery);
  return data;
};
