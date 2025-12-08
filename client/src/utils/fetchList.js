// Refactored the useEffect out of the pages
// takes a endpoint and state setter and updates the list.

// fetchList.js
import { axiosInstance } from '../api/apiConfig';

export const fetchList = async (endpoint, setState) => {
  try {
    const res = await axiosInstance.get(endpoint);
    console.log('fetchList response for', endpoint, res.data);

    const items = Array.isArray(res.data) ? res.data : res.data.results;
    setState(items);

    return res.data; // return full response so hook can use count, next, previous
  } catch (err) {
    console.error(`Fetch error for ${endpoint}:`, err);
    return null;
  }
};
