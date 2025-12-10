// source/ https://pythonguides.com/react-pagination-component-example/
// https://www.geeksforgeeks.org/reactjs/how-to-implement-pagination-in-react-using-hooks/
// help wiring it up from copilot.
/// src/hooks/usePaginatedFetch.js
// src/hooks/usePaginatedFetch.js
import { useState, useEffect } from 'react';
import { fetchList } from '../utils/fetchList';

export const usePaginatedFetch = (baseUrl, pageSize = 10) => {
  const [items, setItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPage = async (page = 1) => {
    try {
      const res = await fetchList(`${baseUrl}?page=${page}`);
      console.log('Fetched categories:', res.results); // Debugging
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
  };

  useEffect(() => {
    console.log('ProductList mounted, items:', items);
    setCurrentPage(1);
    fetchPage(1);
  }, [baseUrl]);

  return { items, pageCount, fetchPage, currentPage };
};
