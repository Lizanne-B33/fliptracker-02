// src/pages/inventory/ProductTypePage.jsx
import { useState } from 'react';
import ProductTypeForm from '../../components/inventory/ProductTypeForm';
import ProductTypeList from '../../components/inventory/ProductTypeList';
import { usePaginatedFetch } from '../../hooks/usePaginatedFetch';
import { refreshWithFlip } from '../../utils/refreshWithFlip';

//==========================
// PAGE COMPONENT DEFINITION
//==========================
// selected: tracks which item is being edited.
// Null is create mode; object is edit mode
const ProductTypePage = () => {
  const [selected, setSelected] = useState(null);

  // Calls pagination hook with API endpoint
  const {
    items: productTypes,
    pageCount: productTypePageCount,
    fetchPage: fetchProductTypePage,
    currentPage: currentProductTypePage,
  } = usePaginatedFetch('/api/inventory/product_type/');

  //==========================
  // REFRESH LOGIC
  //==========================
  const handleRefresh = async () => {
    // Flip to neighbor page then back to force React update
    await refreshWithFlip(
      fetchProductTypePage,
      currentProductTypePage,
      productTypePageCount
    );
    setSelected(null);
  };

  //==========================
  // RENDER
  //==========================
  return (
    <div className="topParent">
      <section className="hero">
        <div className="container text-center py-5">
          <h1 className="ft-bigtext mb-5">Product Type Management</h1>
          <hr />

          {/* FORM */}
          <div className="row welcome-hero">
            <ProductTypeForm productType={selected} onSaved={handleRefresh} />
          </div>

          <hr />

          {/* LIST + PAGINATION */}
          <div className="row lists mt-5">
            <ProductTypeList
              items={productTypes}
              pageCount={productTypePageCount || 1} // ensure integer
              fetchPage={fetchProductTypePage}
              onSelect={setSelected}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductTypePage;
