// This is the reusable filter bar that is included on the table.

import React, { useState } from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap';

// State Variables.
const FilterBar = ({ onApply }) => {
  const [search, setSearch] = useState(''); // text user entered in search box
  const [status, setStatus] = useState(''); // product status for filtering.
  const [ordering, setOrdering] = useState(''); // contains the sorted option.

  // HANDLE SUBMIT - triggered by the apply button
  const handleSubmit = (e) => {
    e.preventDefault();
    onApply({
      search: search || undefined,
      status: status || undefined,
      ordering: ordering || undefined,
    });
  };

  // Clears any entries in the filter bar.
  const handleClear = () => {
    setSearch('');
    setStatus('');
    setOrdering('');
    onApply({ search: undefined, status: undefined, ordering: undefined });
  };

  // Rendering. Wraps in a BS CARD for styling.
  return (
    <Card
      className="mb-3 p-3 mx-auto"
      style={{
        maxWidth: '1100px',
        backgroundColor: 'var(--bg-alt)',
        border: `1px solid var(--border-light)`,
        borderRadius: '0.5rem',
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Row className="g-2 align-items-center">
          {/* Search */}
          <Col xs={12} md={4}>
            <Form.Control
              type="text"
              placeholder="Search title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                borderColor: 'var(--border-light)',
                borderRadius: '0.5rem',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-main-2)',
              }}
            />
          </Col>

          {/* Status Filter */}
          <Col xs={12} md={3}>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                borderColor: 'var(--border-light)',
                borderRadius: '0.5rem',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-main-2)',
              }}
            >
              <option value="">All Statuses</option>
              <option value="acquired">Acquired</option>
              <option value="ready_to_list">Ready to List</option>
              <option value="listed">Listed</option>
              <option value="sold">Sold</option>
              <option value="removed">Removed</option>
            </Form.Select>
          </Col>

          {/* Ordering */}
          <Col xs={12} md={3}>
            <Form.Select
              value={ordering}
              onChange={(e) => setOrdering(e.target.value)}
              style={{
                borderColor: 'var(--border-light)',
                borderRadius: '0.5rem',
                color: 'var(--text-primary)',
                backgroundColor: 'var(--bg-main-2)',
              }}
            >
              <option value="">Sort by...</option>
              <option value="created_at">Oldest → Newest</option>
              <option value="-created_at">Newest → Oldest</option>
              <option value="price">Price Low → High</option>
              <option value="-price">Price High → Low</option>
            </Form.Select>
          </Col>

          {/* Buttons */}
          <Col xs={12} md={2} className="d-flex gap-2">
            <Button
              type="submit"
              variant="warning"
              className="w-100"
              style={{
                backgroundColor: 'var(--accent-cta)',
                borderColor: 'var(--accent-cta)',
                color: '#fff',
              }}
            >
              Apply
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="w-100"
              onClick={handleClear}
              style={{
                backgroundColor: 'var(--card-base-2)',
                borderColor: 'var(--border-light)',
                color: 'var(--text-primary)',
              }}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default FilterBar;
