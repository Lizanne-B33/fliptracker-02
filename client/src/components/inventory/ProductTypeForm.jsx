// Imports: useState manages state, axiosInstance is Axios Client (communicates with backend)
// Boilerplate for the submit helper.
import React from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { submitFormData } from '../../utils/formSubmit.js';
import { useFormState } from '../../hooks/useFormState';
import TextField from '../formFields/TextField';
import { getFieldError } from '../../utils/errorHelpers';

const ProductTypeForm = () => {
  // TESTING -- Remove after successful
  //return <h2>Form is rendering!</h2>;

  // STATE MANAGEMENT
  const {
    formData,
    setFormData,
    loading,
    error,
    success,
    committed,
    resetForm,
    setLoading,
    setError,
    setSuccess,
  } = useFormState({ name: '' });

  // CHANGE HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      '/api/inventory/product_type/', // endpoint
      payload, // your state object
      resetForm, // clears the form
      setLoading, // updates loading state
      setError, // updates error state
      setSuccess // updates success state
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
          placeholder="Product Type"
          required
          maxLength={100}
          error={error?.name?.[0]} //pass the field error
        />
      </Row>
      <Button id="save_btn" type="submit" disabled={committed}>
        {loading ? 'Saving...' : 'Submit'}
      </Button>

      {/* ✅ Success message */}
      {success && <p style={{ color: 'green' }}>Product saved successfully!</p>}
    </Form>
  );
};

export default ProductTypeForm;
