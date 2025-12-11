// utils/refreshWithFlip.js
export const refreshWithFlip = async (fetchPage, currentPage, pageCount) => {
  const safePage =
    Number.isInteger(currentPage) && currentPage > 0 ? currentPage : 1;
  const neighbor =
    safePage < pageCount ? safePage + 1 : Math.max(safePage - 1, 1);

  await fetchPage(`/api/inventory/product/?page=${neighbor}`);
  await fetchPage(`/api/inventory/product/?page=${safePage}`);
};
