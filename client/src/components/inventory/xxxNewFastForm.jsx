// FastCreateForm.jsx
// https://paperform.co/tools/free-react-form-creator/
// Refactored to use React-Bootstrap consistently

import React, { useState } from 'react';
import { axiosInstance } from '../../api/apiConfig';
import { Row, Col, Form, Button } from 'react-bootstrap';

const NewFastForm = () => {
  // STATE MANAGEMENT
  const [formData, setFormData] = useState({
    title: '',
    cost: '',
    quantity: 1,
    quantity_units: 'each',
    image: '',
    condition: 'Undefined',
    ai_description: '',
    fast_notes: '',
    commit: 'choose...',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [committed, setCommitted] = useState(false);

  // CHANGE HANDLER
  const handleChange = (e) => {
    const { id, name, value, type, checked, files } = e.target;

    // Special commit logic
    if (id === 'commit') {
      if (value === 'confirm') setCommitted(true);
      if (value === 'reset') {
        resetForm();
        setCommitted(false);
      }
      if (value === 'choose...') setCommitted(false);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    }));
  };

  // FORM CLEARING
  const resetForm = () => {
    setFormData({
      title: '',
      cost: '',
      quantity: 1,
      quantity_units: 'each',
      image: '',
      condition: 'Undefined',
      ai_description: '',
      fast_notes: '',
      commit: 'choose...',
    });
  };

  // SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });

      const response = await axiosInstance.post('/products/fast/', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Saved:', response.data);
      setSuccess(true);
      resetForm();
    } catch (err) {
      console.error(err);
      setError('Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  // FORM JSX
  return (
    <Form className="container mt-3 mb-3" onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} sm={6} controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product Title"
            required
            minLength={5}
            maxLength={255}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md={3} controlId="cost">
          <Form.Label>Cost</Form.Label>
          <Form.Control
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            placeholder="Purchase Price"
            required
            min={0}
          />
        </Form.Group>

        <Form.Group as={Col} md={3} controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min={1}
          />
        </Form.Group>

        <Form.Group as={Col} md={3} controlId="quantity_units">
          <Form.Label>Units</Form.Label>
          <Form.Select
            name="quantity_units"
            value={formData.quantity_units}
            onChange={handleChange}
            required
          >
            <option value="each">Each</option>
            <option value="pair">Pair</option>
            <option value="set">Set</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} md={3} controlId="condition">
          <Form.Label>Condition</Form.Label>
          <Form.Select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="Undefined">Undefined</option>
            <option value="new">New</option>
            <option value="restored">Restored</option>
            <option value="best">Best</option>
            <option value="better">Better</option>
            <option value="good">Good</option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md={6} controlId="image">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} md={6} controlId="ai_description">
          <Form.Label>AI Description (Optional)</Form.Label>
          <Form.Control
            as="textarea"
            name="ai_description"
            value={formData.ai_description}
            onChange={handleChange}
            placeholder="AI Description"
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} md={8} controlId="fast_notes">
          <Form.Label>Fast Notes (Optional)</Form.Label>
          <Form.Control
            as="textarea"
            name="fast_notes"
            value={formData.fast_notes}
            onChange={handleChange}
            placeholder="Any additional information you want to remember?"
          />
        </Form.Group>

        <Form.Group as={Col} md={8} controlId="commit">
          <Form.Label>Commit Item?</Form.Label>
          <Form.Select
            name="commit"
            value={formData.commit}
            onChange={handleChange}
            required
          >
            <option value="choose...">Choose...</option>
            <option value="confirm">
              Yes, I want to save this item to inventory.
            </option>
            <option value="reset">
              No, I want to clear this form and start over.
            </option>
          </Form.Select>
        </Form.Group>
      </Row>

      <Button id="save_btn" type="submit" disabled={committed}>
        {loading ? 'Saving...' : 'Submit'}
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Product saved successfully!</p>}
    </Form>
  );
};

export default NewFastForm;
