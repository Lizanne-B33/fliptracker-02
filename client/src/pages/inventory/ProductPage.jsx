// src/pages/inventory/ProductPage.jsx
// This page combines the list of active products (products that are NOT removed. )
// The list allows them to edit a record, or remove it.
// This app is not designed for deletion.  Removal could be used if the
// user decided to keep the product and this would be good information.
// products that are entered in error can be re-used for a new product.
// Therefore no need for a delete.

import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import ProductTable from '../../components/inventory/ProductTable';
import ProductForm from '../../components/inventory/ProductForm';
import FilterBar from '../../components/inventory/FilterBar';
import { fetchWithFilters } from '../../utils/fetchWithFilters';
import { axiosInstance } from '../../api/apiConfig';

const PAGE_SIZE = 10;

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showRemoved, setShowRemoved] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [sortField, setSortField] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [filters, setFilters] = useState({});

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  // ---------------------------------------------------------
  // Centralized fetch
  // ---------------------------------------------------------
  const fetchPage = useCallback(
    async (page = 1, override = {}) => {
      try {
        const isRemoved = override.isRemoved ?? showRemoved;

        const search = override.search ?? filters.search ?? undefined;

        // Ordering
        const field = override.orderingField ?? sortField ?? undefined;

        const asc = override.orderingAsc ?? sortAsc ?? true;

        const ordering = field ? (asc ? field : `-${field}`) : undefined;

        // Status logic
        let status;
        if (override.status !== undefined) {
          status = override.status;
        } else if (isRemoved) {
          status = 'removed';
        } else if (filters.status) {
          status = filters.status;
        }

        const data = await fetchWithFilters({
          endpoint: '/api/inventory/product/',
          page,
          page_size: PAGE_SIZE,
          search,
          ordering,
          extraParams: { status },
        });

        setProducts(data.results || []);
        setTotalCount(data.count || 0);
        setCurrentPage(page);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    },
    [showRemoved, sortField, sortAsc, filters]
  );

  // ---------------------------------------------------------
  // Sort toggle
  // ---------------------------------------------------------
  const handleSort = (field) => {
    let asc = true;
    if (sortField === field) {
      asc = !sortAsc;
    }
    setSortField(field);
    setSortAsc(asc);
    fetchPage(1, { orderingField: field, orderingAsc: asc });
  };

  // ---------------------------------------------------------
  // Remove / Restore
  // ---------------------------------------------------------
  const handleRemove = async (id) => {
    try {
      await axiosInstance.patch(`/api/inventory/product/${id}/`, {
        status: 'removed',
      });

      const newPage =
        products.length === 1 && currentPage > 1
          ? currentPage - 1
          : currentPage;
      fetchPage(newPage);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestore = async (id) => {
    try {
      await axiosInstance.patch(`/api/inventory/product/${id}/`, {
        status: 'acquired',
      });
      fetchPage(currentPage);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaved = async () => {
    setSelectedProduct(null);
    setShowRemoved(false);
    fetchPage(1);
  };

  // ---------------------------------------------------------
  // Initial load
  // ---------------------------------------------------------
  useEffect(() => {
    fetchPage(1);
  }, [showRemoved]);

  // ---------------------------------------------------------
  // Render
  // ---------------------------------------------------------
  return (
    <Row className="welcome-hero justify-content-center">
      <Col>
        {selectedProduct ? (
          <ProductForm
            product={selectedProduct}
            endpoint="/api/inventory/product/"
            onSaved={handleSaved}
            onCancel={() => setSelectedProduct(null)}
          />
        ) : (
          <>
            <FilterBar
              onApply={(newFilters) => {
                setFilters(newFilters);

                fetchPage(1, {
                  search: newFilters.search,
                  status: newFilters.status,
                  orderingField: newFilters.ordering
                    ? newFilters.ordering.replace('-', '')
                    : undefined,
                  orderingAsc: newFilters.ordering
                    ? !newFilters.ordering.startsWith('-')
                    : undefined,
                });
              }}
            />

            <ProductTable
              items={products}
              onSelect={setSelectedProduct}
              showRemoved={showRemoved}
              onRemove={handleRemove}
              onRestore={handleRestore}
              onSort={handleSort}
              sortField={sortField}
              sortAsc={sortAsc}
            />

            {/* Pagination */}
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
                    onClick={() => fetchPage(1)}
                  >
                    First
                  </Button>

                  <Button
                    variant="outline-primary"
                    disabled={currentPage === 1}
                    style={{
                      backgroundColor: 'var(--bg-main-1)',
                      borderColor: 'var(--border-light)',
                      color: 'var(--text-primary)',
                    }}
                    onClick={() => fetchPage(currentPage - 1)}
                  >
                    Prev
                  </Button>

                  <Button
                    variant="outline-primary"
                    disabled={currentPage >= totalPages}
                    style={{
                      backgroundColor: 'var(--bg-main-1)',
                      borderColor: 'var(--border-light)',
                      color: 'var(--text-primary)',
                    }}
                    onClick={() => fetchPage(currentPage + 1)}
                  >
                    Next
                  </Button>
                </ButtonGroup>

                <div
                  style={{ marginLeft: 12, color: 'var(--text-secondary-2)' }}
                >
                  Page {currentPage} / {totalPages} ({totalCount} items)
                </div>
              </Col>

              <Col className="d-flex justify-content-end">
                <Button
                  variant={showRemoved ? 'primary' : 'secondary'}
                  style={{
                    backgroundColor: showRemoved
                      ? 'var(--accent-cta)'
                      : 'var(--card-base-2)',
                    borderColor: showRemoved
                      ? 'var(--accent-cta)'
                      : 'var(--border-mid)',
                    color: showRemoved
                      ? 'var(--text-primary)'
                      : 'var(--text-secondary-1)',
                  }}
                  onClick={() => {
                    const newShowRemoved = !showRemoved;
                    setShowRemoved(newShowRemoved);
                    fetchPage(1, { isRemoved: newShowRemoved });
                  }}
                >
                  {showRemoved ? 'Show Active' : 'Show Removed'}
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
};

export default ProductPage;
