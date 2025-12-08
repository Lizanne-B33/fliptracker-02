// source/ https://pythonguides.com/react-pagination-component-example/
// https://www.geeksforgeeks.org/reactjs/how-to-implement-pagination-in-react-using-hooks/
// help wiring it up from copilot.

// usePaginatedFetch.js
import { useState, useEffect } from 'react';
import { fetchList } from '../utils/fetchList';

export const usePaginatedFetch = (baseUrl, pageSize = 10) => {
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const fetchPage = async (page = 1) => {
    try {
      const res = await fetchList(`${baseUrl}?page=${page}`, setItems);
      // fetchList already calls setItems, but we can also compute pageCount here
      if (res && res.count) {
        setPageCount(Math.ceil(res.count / pageSize));
      }
    } catch (err) {
      console.error('Pagination fetch error:', err);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [baseUrl]);

  return { items, pageCount, fetchPage };
};
