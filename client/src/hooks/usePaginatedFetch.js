// source/ https://pythonguides.com/react-pagination-component-example/
// https://www.geeksforgeeks.org/reactjs/how-to-implement-pagination-in-react-using-hooks/
// help wiring it up from copilot.
/// src/hooks/usePaginatedFetch.js
// src/hooks/usePaginatedFetch.js
// src/hooks/usePaginatedFetch.js
import { useState, useEffect, useCallback } from 'react';
import { fetchList } from '../utils/fetchList';

export const usePaginatedFetch = (baseUrl) => {
  const [items, setItems] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [currentPageUrl, setCurrentPageUrl] = useState(baseUrl);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPage = useCallback(
    async (url) => {
      try {
        const res = await fetchList(url || baseUrl);

        setItems(Array.isArray(res?.results) ? res.results : []);
        setNextPageUrl(res?.next || null);
        setPrevPageUrl(res?.previous || null);
        setCurrentPageUrl(url || baseUrl);

        // compute current page based on URL query param
        const urlObj = new URL(url || baseUrl, window.location.origin);
        const pageParam = urlObj.searchParams.get('page') || '1';
        setCurrentPage(parseInt(pageParam, 10));

        // compute total pages
        const pageSize = res?.results?.length || 1;
        if (res?.count) {
          setTotalPages(Math.ceil(res.count / pageSize));
        }
      } catch (err) {
        console.error('Pagination fetch error:', err);
        setItems([]);
        setNextPageUrl(null);
        setPrevPageUrl(null);
        setCurrentPage(1);
        setTotalPages(1);
      }
    },
    [baseUrl]
  );

  useEffect(() => {
    fetchPage(baseUrl);
  }, [baseUrl, fetchPage]);

  return {
    items,
    nextPageUrl,
    prevPageUrl,
    currentPageUrl,
    currentPage,
    totalPages,
    fetchPage,
  };
};
