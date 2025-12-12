// This is the page where the user can create the category
// which has to be assigned to a Product type. The category
// is locally available.

// Imports React state hook and components that are on the page.
import React, { useState, useEffect } from 'react';
import { usePaginatedFetch } from '../../hooks/usePaginatedFetch';
import CategoryForm from '../../components/inventory/CategoryForm';
import CategoryList from '../../components/inventory/CategoryList';
import { refreshWithFlip } from '../../utils/refreshWithFlip';

//==========================
// PAGE COMPONENT DEFINITION
//==========================
const CategoryPage = () => {
  // Track which category is selected for editing (null = create mode)
  const [selected, setSelected] = useState(null);
  const [listVersion, setListVersion] = useState(0);

  // Pagination hook for categories
  const {
    items: rawCategories,
    pageCount: categoryPageCount,
    fetchPage: fetchCategoryPage,
    currentPage: currentCategoryPage,
  } = usePaginatedFetch('/api/inventory/category/');

  // Pagination hook for product types (used as FK dropdown in form)
  const {
    items: productTypes,
    pageCount: productTypePageCount,
    fetchPage: fetchProductTypePage,
    currentPage: currentProductTypePage,
  } = usePaginatedFetch('/api/inventory/product_type/');

  // Normalize nested product_type objects so React sees new references
  const categories = Array.isArray(rawCategories)
    ? rawCategories.map((cat) => ({
        ...cat,
        product_type: cat.product_type ? { ...cat.product_type } : null,
      }))
    : [];

  // Debug: log categories after every refresh
  useEffect(() => {
    console.log('Categories after refresh:', categories);
  }, [categories]);

  // forcing React to notice changes in the dataset.
  const handleRefresh = async () => {
    await refreshWithFlip(
      fetchCategoryPage,
      currentCategoryPage,
      categoryPageCount
    );
    setSelected(null);
    setListVersion((v) => v + 1); // bump version after refresh
  };

  //==========================
  // RENDERS THE PAGE
  //==========================
  return (
    <div className="topParent">
      <section className="hero">
        <div className="container text-center py-5">
          <h1 className="ft-bigtext mb-5">Category Management</h1>
          <hr />
          <div className="row welcome-hero">
            <CategoryForm
              category={selected}
              productTypes={productTypes}
              onSaved={handleRefresh}
            />
          </div>
          <hr />
          <div className="row lists">
            <CategoryList
              key={`cat-list-${listVersion}`}
              items={categories}
              pageCount={categoryPageCount}
              fetchPage={fetchCategoryPage}
              onSelect={setSelected}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
