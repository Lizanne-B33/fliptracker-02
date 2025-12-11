// src/pages/inventory/ProductPage.jsx
import { useState } from 'react';
import ProductList from '../../components/inventory/ProductList';
import { usePaginatedFetch } from '../../hooks/usePaginatedFetch';
import { refreshWithFlip } from '../../utils/refreshWithFlip';
import ProductForm from '../../components/inventory/ProductForm';

const ProductPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination hook
  const {
    items: products,
    nextPageUrl,
    prevPageUrl,
    fetchPage,
    currentPage,
    totalPages,
  } = usePaginatedFetch('/api/inventory/product/');

  // Refresh logic after saving
  const handleRefresh = async () => {
    console.log('Refreshing current page...');
    await refreshWithFlip(fetchPage, null, null);
    setSelectedProduct(null);
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
                product={selectedProduct}
                endpoint="/api/inventory/product/"
                onSaved={handleRefresh}
                onCancel={() => setSelectedProduct(null)}
              />
            ) : (
              <>
                {/* Product list */}
                <ProductList items={products} onSelect={setSelectedProduct} />

                {/* Pagination buttons */}
                <div className="pagination-buttons mt-3">
                  <button
                    className="btn btn-secondary me-2"
                    disabled={!prevPageUrl}
                    onClick={() => fetchPage(prevPageUrl)}
                  >
                    Previous
                  </button>

                  <span className="mx-2">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    className="btn btn-secondary"
                    disabled={!nextPageUrl}
                    onClick={() => fetchPage(nextPageUrl)}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductPage;
