// This page is primarily expected to be used on mobile
// It is intentionally limited in scope to only the
// required and helper fields of the product.  It is a simple
// form for clear ui/ux on mobile.

import React from 'react';
import ProductFastForm from '../../components/inventory/ProductFastForm';

const ProductFastPage = () => {
  return (
    <div className="topParent">
      <section className="hero">
        <div className="container text-center py-5">
          <h1 className="ft-bigtext mb-5">Inventory Product FastAdd*</h1>
          <hr />
          <div className="row welcome-hero">
            <ProductFastForm endpoint="/api/inventory/product_fast/" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductFastPage;
