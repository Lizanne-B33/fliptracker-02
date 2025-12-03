// Sources
// https://paperform.co/tools/free-react-form-creator/
// converted to react-bootstrap -
// https://letsreact.org/create-form-ui-using-react-bootstrap
// https://react-bootstrap.github.io/docs/forms/input-group/
//

// Imports: useState manages state, axiosInstance is Axios Client (communicates with backend)
import React, { useState } from 'react';
import { axiosInstance } from '../../api/apiConfig';

const FastCreateForm = () => {
  // STATE MANAGEMENT
  const [formData, setFormData] = useState({}); // holds all field values
  const [loading, setLoading] = useState(false); // shows when a request is in progress
  const [error, setError] = useState(null); // Stores error messages
  const [success, setSuccess] = useState(false); // Tracks successful submission
  const [selectedOption, setSelectedOption] = useState('');
  const [committed, setCommitted] = useState('');

  // CHANGE HANDLER: Updates formData when a field changes.
  // Handles text, numbers, checkboxes, and file uploads.
  const handleChange = (e) => {
    let field_id = e.id;
    if (field_id === 'commit') {
      if (e.selectedOption === 'confirm') {
        setCommitted(true);
      }
      if (e.selectedOption === 'reset') {
        resetButton();
      }
      if (e.selectedOption === 'choose...') {
        setCommitted(false);
      }
    }

    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    }));
  };

  // FORM CLEARING
  // Clears the values of the form
  const resetForm = () => {
    setFormData({
      title: '',
      cost: '',
      quantity: '1',
      quantity_units: 'each',
      image: '',
      condition: '',
      ai_description: '',
      fast_notes: '',
      commit: 'choose...',
    });
  };
  // SUBMIT HANDLER
  // Prevents default form submission, builds the FormData for uploads,
  // posts to endpoint and handles success/error messages.
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

  // FORM JSX: Renders the fields, shows feedback messages
  // and disables submit button while loading
  // https://paperform.co/tools/free-react-form-creator/
  return (
    <form className="container mt-3 mb-3" onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group controlId="formFastAdd" className="col col-sm-6">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Product Title"
            required
            minLength={20}
            maxLength={200}
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group className=" col-md-3" controlId="cost">
          <Form.Label>Cost</Form.Label>
          <Form.Control
            type="number"
            id="cost"
            name="cost"
            value={form.cost}
            onChange={handleChange}
            placeholder="Purchase Price"
            required
            min={0}
          />
        </Form.Group>
        <Form.Group className=" col col-md-3" controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            id="quantity"
            name="quantity"
            onChange={handleChange}
            required
            min={1}
            defaultValue={1}
          />
        </Form.Group>
        <Form.Group className=" col col-md-3" controlId="quantity_units">
          <Form.Label>Units</Form.Label>
          <Form.Select
            id="quantity_units"
            defaultValue="each"
            className="form-control"
            name="quantity_units"
            value={form.quantity_units}
            onChange={handleChange}
            required
          >
            <option value="each">Each</option>
            <option value="pair">Pair</option>
            <option value="set">Set</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className=" col col-md-3" controlId="condition">
          <Form.Label>Units</Form.Label>
          <Form.Select
            id="condition"
            defaultValue="Undefined"
            className="form-control"
            name="condition"
            value={form.condition}
            onChange={handleChange}
            required
          >
            <option value="Undefined">Each</option>
            <option value="new">Pair</option>
            <option value="restored">Set</option>
            <option value="best">Set</option>
            <option value="better">Set</option>
            <option value="good">Set</option>
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group className=" col col-md-6" controlId="image">
          <Form.Label>Product Image</Form.Label>
          <Form.Control
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className=" col col-md-6" controlId="image">
          <Form.Label>AI Description (Optional)</Form.Label>
          <Form.Control
            type="textarea"
            id="ai_description"
            name="ai_description"
            onChange={handleChange}
            placeholder="AI Description"
          />
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group className=" col col-md-8" controlId="fast_notes">
          <Form.Label>Fast Notes (Optional)</Form.Label>
          <Form.Control
            type="textarea"
            id="fast_notes"
            name="fast_notes"
            onChange={handleChange}
            placeholder="Any additional information you want to remember?"
          />
        </Form.Group>
        <Form.Group className=" col col-md-8" controlId="commit">
          <Form.Label>Commit Item? </Form.Label>
          <Form.Select
            id="commit"
            name="commit"
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
      <button id="save_btn" type="submit" disabled={committed}>
        {loading ? 'Saving...' : 'Submit'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Product saved successfully!</p>}
    </form>
  );
};

export default FastCreateForm;
