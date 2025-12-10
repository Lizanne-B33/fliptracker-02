// ProductPage.js
import { useState } from 'react';
import ProductList from '../../components/inventory/ProductList';
import { usePaginatedFetch } from '../../hooks/usePaginatedFetch';
import { refreshWithFlip } from '../../utils/refreshWithFlip';
import ProductForm from '../../components/inventory/ProductForm';

const ProductPage = () => {
  // Track the selected product object, not just its ID
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination hook
  const {
    items: products,
    pageCount: productsPageCount,
    fetchPage: fetchProductPage,
    currentPage: currentProductPage,
  } = usePaginatedFetch('/api/inventory/product/');

  // Refresh logic after saving
  const handleRefresh = async () => {
    await refreshWithFlip(
      fetchProductPage,
      currentProductPage,
      productsPageCount
    );
    setSelectedProduct(null); // clear form
  };

  return (
    <div className="topParent">
      <section className="hero">
        <div className="container text-center py-5">
          <h1 className="ft-bigtext mb-5">Product Management</h1>
          <hr />
          <div className="row welcome-hero">
            <p>
              DEBUG:{' '}
              {selectedProduct
                ? `Editing "${selectedProduct.title}"`
                : 'List mode'}
            </p>

            {selectedProduct ? (
              <ProductForm
                product={selectedProduct} // pass full product object
                endpoint="/api/inventory/product/"
                onSaved={handleRefresh}
                onCancel={() => setSelectedProduct(null)}
              />
            ) : (
              <ProductList
                items={products}
                pageCount={productsPageCount}
                fetchPage={fetchProductPage}
                onSelect={(item) => setSelectedProduct(item)} // store full product object
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
