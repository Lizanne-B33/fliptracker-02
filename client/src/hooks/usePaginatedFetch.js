// src/hooks/usePaginatedFetch.js
import { useState, useEffect, useCallback } from 'react';
import { fetchList } from '../utils/fetchList';

export const usePaginatedFetch = (baseUrl, pageSize = 10) => {
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
        console.log('Fetching:', url || baseUrl, 'Got', res.results?.length, 'items');

        setItems(Array.isArray(res?.results) ? res.results : []);
        setNextPageUrl(res?.next || null);
        setPrevPageUrl(res?.previous || null);
        setCurrentPageUrl(url || baseUrl);

        const urlObj = new URL(url || baseUrl, window.location.origin);
        const pageParam = urlObj.searchParams.get('page') || '1';
        setCurrentPage(parseInt(pageParam, 10));

        if (res?.count) {
          setTotalPages(Math.ceil(res.count / pageSize));
        } else {
          setTotalPages(1);
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
    [baseUrl, pageSize]
  );

  // Initial load: run only once
  useEffect(() => {
    fetchPage(baseUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);   // <-- empty array ensures it runs only once

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
