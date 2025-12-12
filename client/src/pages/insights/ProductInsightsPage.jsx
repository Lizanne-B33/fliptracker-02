// In process - not implemented in MVP.

import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ProductCards from '../../components/insights/ProductCards';
import ProductTable from '../../components/inventory/ProductTable';
import { usePaginatedFetch } from '../../hooks/usePaginatedFetch';
import { refreshWithFlip } from '../../utils/refreshWithFlip';

const InsightsPage = () => {
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
        <Container className="text-center py-5">
          <h1 className="ft-bigtext mb-5">Product Management</h1>
          <hr />
          <Row className="welcome-hero justify-content-center">
            <Col>
              {/* Product Table */}
              <ProductTable items={products} onSelect={setSelectedProduct} />
            </Col>

            {/* Pagination buttons */}
            <div className="pagination-buttons mt-3 d-flex align-items-center justify-content-center">
              <Button
                variant="secondary"
                className="me-2"
                disabled={!prevPageUrl}
                onClick={() => fetchPage(prevPageUrl)}
              >
                Previous
              </Button>

              <span className="mx-2">
                Page {currentPage} of {totalPages}
              </span>

              <Button
                variant="secondary"
                disabled={!nextPageUrl}
                onClick={() => fetchPage(nextPageUrl)}
              >
                Next
              </Button>
            </div>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default InsightsPage;
