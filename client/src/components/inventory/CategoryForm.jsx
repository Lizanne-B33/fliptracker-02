// CategoryForm.jsx

import React from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { submitFormData } from '../../utils/formSubmit.js';
import { useFormState } from '../../hooks/useFormState';
import TextField from '../formFields/TextField';
import SelectField from '../formFields/SelectField.jsx';
import { getFieldError } from '../../utils/errorHelpers';

// const CategoryForm = () => {
//TESTING -- Remove after successful
//return <h2>Form is rendering!</h2>;

// constructing with an empty array of Product Types bc they don't
// yet exist and will crash the system.
const CategoryForm = ({ productTypes = [] }) => {
  //STATE MANAGEMENT
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
  } = useFormState({ name: '', product_type: '' });

  // CHANGE HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData); // Debug: confirm updates
  };

  // SUBMIT HANDLER
  const handleSubmit = (e) => {
    e.preventDefault();
    const normalizedName =
      formData.name.trim().charAt(0).toUpperCase() +
      formData.name.trim().slice(1).toLowerCase();
    const payload = { ...formData, name: normalizedName };
    submitFormData(
      '/api/inventory/category/',
      payload,
      resetForm,
      setLoading,
      setError,
      setSuccess
    );
  };

  // FORM JSX
  return (
    <Form className="container mt-3 mb-3" onSubmit={handleSubmit}>
      <Row className="mb-3">
        <TextField
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Category Name"
          required
          maxLength={100}
        />

        <SelectField
          label="Product Type"
          name="product_type"
          value={formData.product_type}
          onChange={handleChange}
          options={productTypes.map((pt) => ({
            value: pt.id,
            label: pt.name, // ✅ only value + label here
          }))}
          error={
            getFieldError(error, 'product_type') ||
            (error?.non_field_errors?.[0] ?? null)
          } //
          placeholder="Select a Product Type"
          required
        />
      </Row>
      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Submit'}
      </Button>

      {success && (
        <p style={{ color: 'green' }}>Category saved successfully!</p>
      )}
    </Form>
  );
};

export default CategoryForm;
