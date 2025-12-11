// src/pages/insights/ProductInsightsPage.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import ProductCards from '../../components/insights/ProductCards';
import ProductTable from '../../components/insights/ProductTable';

const InsightsPage = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination hook
  const {
    items: products,
    nextPageUrl,
    prevPageUrl,
    fetchPage,
    currentPage,
    totalPages,
  } = usePaginatedFetch('/api/inventory/product/');

  // Refresh logic after saving
  const handleRefresh = async () => {
    console.log('Refreshing current page...');
    await refreshWithFlip(fetchPage, null, null);
    setSelectedProduct(null);
  };