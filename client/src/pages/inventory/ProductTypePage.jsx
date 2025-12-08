// Imports react state hook and components that are on the page.
import { useState } from 'react';
import ProductTypeForm from '../../components/inventory/ProductTypeForm';
import ProductTypeList from '../../components/inventory/ProductTypeList';
import { usePaginatedFetch } from '../../hooks/usePaginatedFetch';
import { refreshWithFlip } from '../../utils/refreshWithFlip';

//==========================
// PAGE COMPONENT DEFINITION
//==========================
// selected: tracks which item is being edited.
// Null is create mode, if there is an object it is in edit mode.
const ProductTypePage = () => {
  const [selected, setSelected] = useState(null);

  // Calls pagination hook with correct API endpoint
  // Page controls the refresh and passes data to list.
  const {
    items: productTypes, // current page of product types
    pageCount: productTypePageCount, // total number of pages
    fetchPage: fetchProductTypePage, // function to load a specific page
    currentPage: currentProductTypePage, // which page is currently active
  } = usePaginatedFetch('/api/inventory/product_type/');

  // Defines the refresh logic
  // calls utility to flip the page in order to seamlessly update the values in the list.
  const handleRefresh = async () => {
    await refreshWithFlip(
      fetchProductTypePage,
      currentProductTypePage,
      productTypePageCount
    );
    setSelected(null);
  };

  //==========================
  // RENDERS THE PAGE
  //==========================
  return (
    <div className="topParent">
      <section className="hero">
        <div className="container text-center py-5">
          <h1 className="ft-bigtext mb-5">Product Type Management</h1>
          <hr />
          <div className="row welcome-hero">
            <ProductTypeForm productType={selected} onSaved={handleRefresh} />
          </div>
          <hr />
          <div className="row lists mt-5">
            <ProductTypeList
              items={productTypes}
              pageCount={productTypePageCount}
              fetchPage={fetchProductTypePage}
              onSelect={setSelected}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// Exports page to be used in Router in backend.
export default ProductTypePage;
