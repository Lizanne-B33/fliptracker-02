// src/pages/products/ProductAddPage.jsx
// ProductAddPage.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import ProductForm from '../../components/inventory/ProductForm';

const ProductAddPage = () => {
  return (
    <Container>
      <h1>Add New Product</h1>
      <ProductForm endpoint="/api/inventory/product/" />
    </Container>
  );
};

export default ProductAddPage;
