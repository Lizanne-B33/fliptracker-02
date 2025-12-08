// utils/refreshWithFlip.js
export const refreshWithFlip = async (fetchPage, currentPage, pageCount) => {
  if (pageCount > 1) {
    const neighbor =
      currentPage < pageCount ? currentPage + 1 : currentPage - 1;
    await fetchPage(neighbor);
    await fetchPage(currentPage);
  } else {
    await fetchPage(1);
    await fetchPage(currentPage);
  }
};
