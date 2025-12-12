// Report that displays all items that are ready to list.  It is
// useful to print out and take to an external POS system for
// loading.  It also has a bulk update that allows the user to
// change the status to Listed quickly.

import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Card, Table } from 'react-bootstrap';
import { fetchWithFilters } from '../../utils/fetchWithFilters';
import { axiosInstance } from '../../api/apiConfig';

// SETS COMPONENT STATE
const ReadyToListReportPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all ready_to_list products
  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await fetchWithFilters({
        endpoint: '/api/inventory/product/',
        page: 1,
        page_size: 500, // get everything
        extraParams: { status: 'ready_to_list' },
      });

      setItems(data.results || []);
    } catch (err) {
      console.error('Report fetch error:', err);
    }
    setLoading(false);
  };

  // BULK UPDATE!- Update all items to "listed"
  const markAllListed = async () => {
    try {
      for (const p of items) {
        await axiosInstance.patch(`/api/inventory/product/${p.id}/`, {
          status: 'listed',
        });
      }

      alert('All items updated to LISTED.');
      loadItems(); // refresh
    } catch (err) {
      console.error('Bulk update error:', err);
    }
  };

  // Initial Load - calls loadItems once when mounted.
  // Populates the items & quits the spinner.
  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="container mt-4 report-container">
      <Row className="mb-3">
        <Col>
          <h2>Ready to List — Product Report</h2>
          <p>
            Showing all products with status <strong>Ready to List</strong>.
          </p>
        </Col>

        <Col className="text-end d-flex gap-2 justify-content-end">
          <Button variant="secondary" onClick={() => window.print()}>
            Print
          </Button>

          <Button variant="success" onClick={markAllListed}>
            Mark All as Listed
          </Button>
        </Col>
      </Row>

      <Card className="p-3">
        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <Table className={'report-table'} bordered striped hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Description</th>
                <th>Brand</th>
                <th>Color</th>
                <th>Size</th>
              </tr>
            </thead>

            <tbody>
              {items.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.prod_image ? (
                      <img
                        src={p.prod_image}
                        alt={p.title}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>{p.title}</td>
                  <td>
                    {p.purch_qty} {p.qty_unit}
                  </td>
                  <td>${p.price}</td>
                  <td style={{ maxWidth: '200px' }}>{p.user_desc}</td>
                  <td>{p.brand || '—'}</td>
                  <td>{p.color || '—'}</td>
                  <td>{p.size || '—'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </div>
  );
};

export default ReadyToListReportPage;
