// CategoryPage.jsx
// Shows a list of categories organized by Product type.
// Uses URL-based pagination from usePaginatedFetch (same as ProductPage).

import React, { useState, useEffect } from 'react';
import { usePaginatedFetch } from '../../hooks/usePaginatedFetch';
import CategoryForm from '../../components/inventory/CategoryForm';
import CategoryList from '../../components/inventory/CategoryList';
import { Button, ButtonGroup, Row, Col } from 'react-bootstrap';

const CategoryPage = () => {
  const [selected, setSelected] = useState(null);
  const [listVersion, setListVersion] = useState(0);

  // Categories pagination
  const {
    items: rawCategories,
    nextPageUrl,
    prevPageUrl,
    currentPage,
    totalPages,
    fetchPage,
  } = usePaginatedFetch('/api/inventory/category/');

  // Product types for dropdown
  const { items: productTypes } = usePaginatedFetch(
    '/api/inventory/product_type/'
  );

  // Normalize nested product_type objects
  const categories = Array.isArray(rawCategories)
    ? rawCategories.map((cat) => ({
        ...cat,
        product_type: cat.product_type ? { ...cat.product_type } : null,
      }))
    : [];

  // Debug log
  useEffect(() => {
    console.log('Categories after refresh:', categories);
  }, [categories]);

  // Force re-render when changing page
  const handlePageChange = async (url) => {
    if (!url) {
      console.log('No URL provided to handlePageChange');
      return;
    }
    console.log('Going to page via URL:', url); // <-- this should show
    await fetchPage(url);
    setSelected(null);
    setListVersion((v) => v + 1);
  };

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
              onSaved={() =>
                handlePageChange('/api/inventory/category/?page=1')
              }
            />
          </div>
          <hr />
          <div className="row lists">
            <CategoryList
              key={`cat-list-${listVersion}`}
              items={categories}
              onSelect={setSelected}
            />
          </div>

          {/* Pagination controls */}
          <Row className="mt-3 align-items-center">
            <Col className="d-flex justify-content-start align-items-center">
              <ButtonGroup>
                <Button
                  variant="outline-primary"
                  disabled={currentPage === 1}
                  style={{
                    backgroundColor: 'var(--bg-main-1)',
                    borderColor: 'var(--border-light)',
                    color: 'var(--text-primary)',
                  }}
                  onClick={() =>
                    handlePageChange('/api/inventory/category/?page=1')
                  }
                >
                  First
                </Button>

                <Button
                  variant="outline-primary"
                  disabled={!prevPageUrl}
                  style={{
                    backgroundColor: 'var(--bg-main-1)',
                    borderColor: 'var(--border-light)',
                    color: 'var(--text-primary)',
                  }}
                  onClick={() => handlePageChange(prevPageUrl)}
                >
                  Prev
                </Button>

                <Button
                  variant="outline-primary"
                  disabled={!nextPageUrl}
                  style={{
                    backgroundColor: 'var(--bg-main-1)',
                    borderColor: 'var(--border-light)',
                    color: 'var(--text-primary)',
                  }}
                  onClick={() => handlePageChange(nextPageUrl)}
                >
                  Next
                </Button>
              </ButtonGroup>

              <div style={{ marginLeft: 12, color: 'var(--text-secondary-2)' }}>
                Page {currentPage || 1} / {totalPages || 1}
              </div>
            </Col>
          </Row>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
