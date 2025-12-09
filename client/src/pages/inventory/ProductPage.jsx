// Imports react state hook and components that are on the page.
import { useState } from 'react';
import ProductList from '../../components/inventory/ProductList';
import { usePaginatedFetch } from '../../hooks/usePaginatedFetch';
import { refreshWithFlip } from '../../utils/refreshWithFlip';
import ProductForm from '../../components/inventory/ProductForm';

//==========================
// PAGE COMPONENT DEFINITION
//==========================
// selected: tracks which item is being edited.
// Null is create mode, if there is an object it is in edit mode.
const ProductPage = () => {
  const [selected, setSelected] = useState(null);

  // Calls pagination hook with correct API endpoint
  // Page controls the refresh and passes data to list.
  const {
    items: products, // current page of products
    pageCount: productsPageCount, // total number of pages
    fetchPage: fetchProductPage, // function to load a specific page
    currentPage: currentProductPage, // which page is currently active
  } = usePaginatedFetch('/api/inventory/product/');

  // Defines the refresh logic
  // calls utility to flip the page in order to seamlessly update the values in the list.
  const handleRefresh = async () => {
    await refreshWithFlip(
      fetchProductPage,
      currentProductPage,
      productsPageCount
    );
    setSelected(null);
  };
  //==========================
  // RENDERS THE PAGE WITH PAGINATION
  //==========================
  return (
    <div className="topParent">
      <section className="hero">
        <div className="container text-center py-5">
          <h1 className="ft-bigtext mb-5">Product Management</h1>
          <hr />
          <div className="row welcome-hero">
            {selected ? (
              <ProductForm
                product={selected} // edit mode if object, create mode if null
                onSaved={handleRefresh} // refresh list after save
                onCancel={() => setSelected(null)} // back to list view
              />
            ) : (
              <ProductList
                items={products}
                pageCount={productsPageCount}
                fetchPage={fetchProductPage}
                onSelect={setSelected} // selecting item switches to form
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
// Exports page to be used in Router in backend.
export default ProductPage;
