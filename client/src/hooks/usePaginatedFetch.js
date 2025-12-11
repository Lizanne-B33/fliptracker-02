// source/ https://pythonguides.com/react-pagination-component-example/
// https://www.geeksforgeeks.org/reactjs/how-to-implement-pagination-in-react-using-hooks/
// help wiring it up from copilot.
/// src/hooks/usePaginatedFetch.js
// src/hooks/usePaginatedFetch.js
// src/hooks/usePaginatedFetch.js
import { useState, useEffect, useCallback } from 'react';
import { fetchList } from '../utils/fetchList';

export const usePaginatedFetch = (baseUrl, pageSize = 10) => {
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Wrap fetchPage in useCallback so it is stable and can be safely used in useEffect
  const fetchPage = useCallback(
    async (page = 1) => {
      try {
        const res = await fetchList(`${baseUrl}?page=${page}`);
        const nextItems = Array.isArray(res?.results) ? res.results : [];
        setItems(nextItems);

        if (typeof res?.count === 'number') {
          setPageCount(Math.ceil(res.count / pageSize));
        }
        setCurrentPage(page);
      } catch (err) {
        console.error('Pagination fetch error:', err);
        setItems([]);
        setPageCount(0);
      }
    },
    [baseUrl, pageSize] // dependencies
  );

  // Fetch first page whenever baseUrl changes
  useEffect(() => {
    setCurrentPage(1);
    fetchPage(1);
  }, [baseUrl, fetchPage]); // include fetchPage to satisfy ESLint

  return { items, pageCount, fetchPage, currentPage };
};
