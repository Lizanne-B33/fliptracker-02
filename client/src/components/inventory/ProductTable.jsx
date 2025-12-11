import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';

const ProductTable = ({
  items = [],
  onSelect,
  showRemoved,
  onRemove,
  onRestore,
  onSort,
  sortField,
  sortAsc,
}) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th
            style={{
              cursor: 'pointer',
              color:
                sortField === 'title'
                  ? 'var(--accent-cta)'
                  : 'var(--text-primary)',
            }}
            onClick={() => onSort('title')}
          >
            Title {sortField === 'title' ? (sortAsc ? '▲' : '▼') : ''}
          </th>

          <th
            style={{
              cursor: 'pointer',
              color:
                sortField === 'created_at'
                  ? 'var(--accent-cta)'
                  : 'var(--text-primary)',
            }}
            onClick={() => onSort('created_at')}
          >
            Create Date{' '}
            {sortField === 'created_at' ? (sortAsc ? '▲' : '▼') : ''}
          </th>

          <th
            style={{
              cursor: 'pointer',
              color:
                sortField === 'price'
                  ? 'var(--accent-cta)'
                  : 'var(--text-primary)',
            }}
            onClick={() => onSort('price')}
          >
            Price {sortField === 'price' ? (sortAsc ? '▲' : '▼') : ''}
          </th>

          <th>Category</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {items.length === 0 ? (
          <tr>
            <td colSpan={6} className="text-center">
              No products found.
            </td>
          </tr>
        ) : (
          items.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>
                {product.created_at
                  ? new Date(product.created_at).toLocaleDateString('en-US')
                  : '-'}
              </td>
              <td>{formatCurrency(product.price)}</td>
              <td>{product.category?.name || '-'}</td>
              <td>{product.status}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  style={{
                    backgroundColor: 'var(--accent-cta)',
                    borderColor: 'var(--accent-cta)',
                    color: 'var(--text-primary)',
                  }}
                  onClick={() => onSelect(product)}
                >
                  Edit
                </Button>{' '}
                {showRemoved ? (
                  <Button
                    variant="secondary"
                    size="sm"
                    style={{
                      backgroundColor: 'var(--card-base-1)',
                      borderColor: 'var(--border-light)',
                      color: 'var(--text-secondary-1)',
                    }}
                    onClick={() => onRestore(product.id)}
                  >
                    Restore
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    size="sm"
                    style={{
                      backgroundColor: 'var(--accent-subtle)',
                      borderColor: 'var(--accent-subtle)',
                      color: 'var(--text-primary)',
                    }}
                    onClick={() => onRemove(product.id)}
                  >
                    Remove
                  </Button>
                )}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default ProductTable;
