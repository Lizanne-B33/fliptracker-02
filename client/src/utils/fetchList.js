// Refactored the useEffect out of the pages
// takes a endpoint and state setter and updates the list.

import { axiosInstance } from '../api/apiConfig';

export const fetchList = async (endpoint, setState) => {
  try {
    const res = await axiosInstance.get(endpoint);
    console.log('fetchList response for', endpoint, res.data);
    setState(Array.isArray(res.data) ? res.data : res.data.results);
  } catch (err) {
    console.error(`Fetch error for ${endpoint}:`, err);
  }
};
