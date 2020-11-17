import axios from '../axios';

export const fetchOptions = async (term) => {
  const response = await axios.get(`${term}`);
  return await response.data;
};
