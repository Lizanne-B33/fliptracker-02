// src/pages/products/ProductAddPage.jsx
// The user can use this page (intended for desktop loading)
// to create a product from scratch.

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
