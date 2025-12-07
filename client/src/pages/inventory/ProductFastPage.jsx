import React, { useState, useEffect } from 'react';
import ProductFastForm from '../../components/inventory/ProductFastForm';
import { fetchList } from '../../utils/fetchList';

const ProductFastPage = () => {
  // SET STATES - Needed for dropdowns
  const [productTypes, setProductTypes] = useState([]); // FK for categories
  const [categories, setCategories] = useState([]); // FK Categories

  // initial Data Fetch - runs once when page opens (needed for dropdowns)
  useEffect(() => {
    fetchList('/api/inventory/category/', setCategories);
    fetchList('/api/inventory/product_type/', setProductTypes);
  }, []);

  // JSX Layout
  return (
    <div className="topParent">
      <section className="hero">
        <div className="container text-center py-5">
          <h1 className="ft-bigtext mb-5">Inventory Product FastAdd*</h1>
          <hr />
          <div className="row welcome-hero">
            <ProductFastForm // Form stuff
              categories={categories} // FK for drop down
              productTypes={productTypes} // FK for drop down
              endpoint="/api/inventory/product_fast/"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductFastPage;
