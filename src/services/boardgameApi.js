import axios from '../axios';

export const categoryOptions = async () => {
  const response = await axios.get(`categories`);
  return await response.data.categories;
};
