import React, { useEffect } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { axiosInstance } from '../../api/apiConfig';
import { submitFormData } from '../../utils/formSubmit.js';
import { useFormState } from '../../hooks/useFormState';
import TextField from '../formFields/TextField';
import { getFieldError } from '../../utils/errorHelpers';

const ProductTypeForm = ({ productType, onSaved }) => {
  const {
    formData,
    setFormData,
    loading,
    error,
    success,
    resetForm,
    setLoading,
    setError,
    setSuccess,
  } = useFormState({ name: '' });

  // Prefill when editing
  useEffect(() => {
    if (productType) {
      setFormData(productType);
    } else {
      resetForm();
    }
  }, [productType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const normalizedName =
      formData.name.trim().charAt(0).toUpperCase() +
      formData.name.trim().slice(1).toLowerCase();
    const payload = { ...formData, name: normalizedName };

    try {
      if (productType) {
        // Edit mode
        await axiosInstance.put(
          `/api/inventory/product_type/${productType.id}/`,
          payload
        );
      } else {
        // Create mode
        await submitFormData(
          '/api/inventory/product_type/',
          payload,
          resetForm,
          setLoading,
          setError,
          setSuccess
        );
      }
      if (onSaved) onSaved(); // ✅ refresh parent list
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Form className="container mt-3 mb-3" onSubmit={handleSubmit}>
      <Row className="mb-3">
        <TextField
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Type"
          required
          maxLength={100}
          error={getFieldError(error, 'name')}
        />
      </Row>
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : productType ? 'Update' : 'Create'}
      </Button>
      {success && (
        <p style={{ color: 'green' }}>Product type saved successfully!</p>
      )}
    </Form>
  );
};

export default ProductTypeForm;
