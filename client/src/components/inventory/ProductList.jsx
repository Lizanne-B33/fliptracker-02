// this was my original product list, that is not used in the
// MVP. I want to retain it for future development.

// ProductList.js
import { Container, Row, Col, Image } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';

function ProductList({ items, onSelect }) {
  return (
    <Container className="section ft-list">
      {items.map((prod) => (
        <Row key={prod.id} className="align-items-center mb-3">
          <Col xs={2}>
            <Image
              src={prod.prod_image}
              alt={prod.title}
              thumbnail
              className="thumbnail"
            />
          </Col>
          <Col xs={4} className="text-start">
            <h6 className="product-link" onClick={() => onSelect(prod)}>
              {prod.title}
            </h6>
          </Col>
          <Col xs={2}>
            <p>{formatCurrency(prod.price)}</p>
          </Col>
          <Col xs={2}>
            <p>{prod.status}</p>
          </Col>
        </Row>
      ))}
    </Container>
  );
}

export default ProductList;
