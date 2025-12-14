// src/pages/inventory/ProductTypePage.jsx

// This is the page where the user can create a product type.
// The Product type must be unique and is locally available.

// src/pages/inventory/ProductTypePage.jsx
import { useState } from 'react';
import ProductTypeForm from '../../components/inventory/ProductTypeForm';
import ProductTypeList from '../../components/inventory/ProductTypeList';
import { usePaginatedFetch } from '../../hooks/usePaginatedFetch';

//==========================
// PAGE COMPONENT
//==========================
const ProductTypePage = () => {
  const [selected, setSelected] = useState(null);

  const {
    items: productTypes,
    pageCount: productTypePageCount,
    fetchPage: fetchProductTypePage,
    currentPage: currentProductTypePage,
  } = usePaginatedFetch('/api/inventory/product_type/', 16); // match API page size

  //==========================
  // REFRESH AFTER SAVE
  //==========================
  const handleRefresh = async () => {
    await fetchProductTypePage(); // fetch current page
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

          {/* LIST */}
          <div className="row lists mt-5">
            <ProductTypeList
              items={productTypes}
              pageCount={productTypePageCount || 1}
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
