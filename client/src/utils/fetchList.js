// Refactored the useEffect out of the pages
// takes a endpoint and state setter and updates the list.

// fetchList.js
// src/utils/fetchList.js
import { axiosInstance } from '../api/apiConfig';

export async function fetchList(url) {
  try {
    const res = await axiosInstance.get(url);
    return res.data; // Expecting { count, results: [...] }
  } catch (err) {
    console.error(`Fetch error for ${url}:`, err);
    throw err;
  }
}
