// src/utils/refreshWithFlip.js
/**
 * Simplified refresh: just fetches the current page.
 * Always passes numeric page numbers to avoid string/object bugs.
 *
 * @param {function} fetchPage - Function from hook to fetch a specific page (expects a number)
 * @param {number} currentPage - Current active page
 */
export const refreshWithFlip = async (fetchPage, currentPage) => {
  const safePage =
    Number.isInteger(currentPage) && currentPage > 0 ? currentPage : 1;

  // Refetch only current page
  await fetchPage(safePage);
};
