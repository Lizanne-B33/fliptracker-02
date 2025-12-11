// src/pages/inventory/ProductPage.jsx
import React, { useState } from 'react';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { fetchWithFilters } from '../../utils/fetchWithFilters';
import ProductTable from '../../components/inventory/ProductTable';
import ProductForm from '../../components/inventory/ProductForm';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [showRemoved, setShowRemoved] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleRefresh = async () => {
    const data = await fetchWithFilters({
      endpoint: '/api/inventory/product/',
    });
    setProducts(data.results);
    setShowRemoved(false);
  };

  return (
    <Row className="welcome-hero justify-content-center">
      <Col>
        {selectedProduct ? (
          <ProductForm
            product={selectedProduct}
            endpoint="/api/inventory/product/"
            onSaved={handleRefresh}
            onCancel={() => setSelectedProduct(null)}
          />
        ) : (
          <>
            <ProductTable
              items={products}
              onSelect={setSelectedProduct}
              showRemoved={showRemoved}
            />

            {/* Controls row */}
            <Row className="mt-3">
              <Col className="d-flex justify-content-start">
                {/* Pagination buttons grouped */}
                <ButtonGroup>
                  <Button
                    variant="outline-primary"
                    onClick={() => fetchPage('/api/inventory/product/?page=1')}
                  >
                    First Page
                  </Button>
                  {/* Add Prev/Next here */}
                  <Button
                    variant="outline-primary"
                    onClick={() =>
                      fetchPage('/api/inventory/product/?page=prev')
                    }
                  >
                    Prev
                  </Button>
                  <Button
                    variant="outline-primary"
                    onClick={() =>
                      fetchPage('/api/inventory/product/?page=next')
                    }
                  >
                    Next
                  </Button>
                </ButtonGroup>
              </Col>
              <Col className="d-flex justify-content-end">
                {showRemoved ? (
                  <Button variant="primary" onClick={handleRefresh}>
                    Show Active
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={async () => {
                      const data = await fetchWithFilters({
                        endpoint: '/api/inventory/product/',
                        extraParams: { status: 'removed' },
                      });
                      setProducts(data.results);
                      setShowRemoved(true);
                    }}
                  >
                    Show Removed
                  </Button>
                )}
              </Col>
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
};

export default ProductPage;
