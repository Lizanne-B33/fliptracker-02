// src/components/insights/ProductCard.jsx
// this is the single card that shows the product image and an edit button
// that opens the edit form for the object.
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getProductImageURL } from '../../utils/imageHelpers';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/products/edit/${product.id}`);
  };

  return (
    <Card>
      <Card.Img variant="top" src={getProductImageURL(product.prod_image)} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          Category: {product.category_name || 'N/A'} <br />
          Status: {product.status || 'N/A'}
        </Card.Text>
        <Button variant="primary" onClick={handleEdit}>
          Edit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
