// This is a reusable table that is used for displaying products in the
// application. The data can be sorted by title, create date and price.
// Data is fetched with pagination, so this limits the sorting to only what is on the page.
// This table also allows the user easy access to edit the Products or to Remove them via
// action buttons.  Remove sets status to Remove and it is no longer pulled on reports.
// The app has a  button that will allow the user to see just removed items. and can restore
// them if an error had been made.

import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';

// Props received:
const ProductTable = ({
  items = [], // array of products that are displayed
  onSelect, // callback that is triggered by Edit button.
  showRemoved, // is a boolean state variable to chose which button to show (remove or restore)
  onRemove, // callback that changes status of a product to remove
  onRestore, // callback that changes the status of a product from remove.
  onSort, // callback to sort the data on a particular field.
  sortField, // What field is to be sorted.
  sortAsc, // boolean value that tells the program to sort asc (true) desc (false)
}) => {
  // Table header that allows items to be sorted. As data is paginated, only the items
  // in the page are sorted.  Sorting is allowed by title, create date or price. Sorting
  // can be asc or desc, and a indicator shows state.
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
