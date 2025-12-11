// src/components/insights/ProductCards.jsx
// Uses hook: usePaginatedFetch to get products and render them in the grid
import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { usePaginatedFetch } from '../../hooks/usePaginatedFetch';
import ProductCard from './ProductCard';

const ProductCards = ({ search, status, ordering }) => {
  const {
    items: products,
    pageCount,
    fetchPage,
    currentPage,
  } = usePaginatedFetch('/products/', 10, { search, status, ordering });

  // Refetch first page when filters change
  useEffect(() => {
    fetchPage(1, { search, status, ordering });
  }, [search, status, ordering]);

  return (
    <>
      <Row className="g-3">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {/* Pagination Controls */}
      <Row className="mt-3">
        <Col className="d-flex justify-content-center align-items-center">
          <Button
            disabled={currentPage === 1}
            onClick={() => fetchPage(currentPage - 1)}
            className="me-2"
          >
            Prev
          </Button>
          <span>
            Page {currentPage} of {pageCount || 1}
          </span>
          <Button
            disabled={currentPage === pageCount || pageCount === 0}
            onClick={() => fetchPage(currentPage + 1)}
            className="ms-2"
          >
            Next
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ProductCards;
