// src/pages/insights/ProductInsightsPage.jsx
// Manages filters, search, ordering and also shows the cards.
import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import ProductCards from '../../components/insights/ProductCards';

const ProductInsightsPage = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [ordering, setOrdering] = useState('-created_at');

  return (
    <Container>
      <Row className="mb-3">
        <h1>Product Insights</h1>
      </Row>

      {/* Filters */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Form.Select>
        </Col>
        <Col md={4}>
          <Form.Select
            value={ordering}
            onChange={(e) => setOrdering(e.target.value)}
          >
            <option value="-created_at">Newest</option>
            <option value="created_at">Oldest</option>
            <option value="name">Name A-Z</option>
            <option value="-name">Name Z-A</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Render Product Grid */}
      <ProductCards search={search} status={status} ordering={ordering} />
    </Container>
  );
};

export default ProductInsightsPage;
