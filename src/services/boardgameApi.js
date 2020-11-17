import axios from '../axios';

export default async (term) => {
  const response = await axios.get(`${term}`);
  return await response.data;
};
