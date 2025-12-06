import React, { useEffect } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { axiosInstance } from '../../api/apiConfig';
import { submitFormData } from '../../utils/formSubmit.js';
import { useFormState } from '../../hooks/useFormState';
import TextField from '../../components/formFields/TextField';
import SelectField from '../../components/formFields/SelectField.jsx';
import { getFieldError } from '../../utils/errorHelpers';

const CategoryForm = ({ category, productTypes = [], onSaved }) => {
  // STATE MANAGEMENT
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
  } = useFormState({ name: '', product_type_id: '' });

  // Prefill when editing
  useEffect(() => {
    if (category) {
      setFormData({
        id: category.id,
        name: category.name,
        product_type_id: category.product_type.id, // ✅ nested serializer gives object
      });
    } else {
      resetForm();
    }
  }, [category]);

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
      if (category) {
        // Edit mode
        await axiosInstance.put(
          `/api/inventory/category/${category.id}/`,
          payload
        );
      } else {
        // Create mode
        await submitFormData(
          '/api/inventory/category/',
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
        <SelectField
          label="Product/Category"
          name="product_type_id"
          value={formData.product_type_id}
          onChange={handleChange}
          options={productTypes.map((pt) => ({
            value: pt.id,
            label: pt.name,
          }))}
          error={
            getFieldError(error, 'product_type_id') ||
            (error?.non_field_errors?.[0] ?? null)
          }
          placeholder="Select a Product Type"
          required
        />
        <TextField
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Category Name"
          required
          maxLength={100}
          error={getFieldError(error, 'name')}
        />
      </Row>
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : category ? 'Update' : 'Create'}
      </Button>
      {success && (
        <p style={{ color: 'green' }}>Category saved successfully!</p>
      )}
    </Form>
  );
};

export default CategoryForm;
