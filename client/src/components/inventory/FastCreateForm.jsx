// Sources
// https://paperform.co/tools/free-react-form-creator/

// Imports: useState manages state, axiosInstance is Axios Client (communicates with backend)
import React, { useState } from 'react';
import { axiosInstance } from '../../api/apiConfig';

const FastCreateForm = () => {
  // STATE MANAGEMENT
  const [formData, setFormData] = useState({}); // holds all field values
  const [loading, setLoading] = useState(false); // shows when a request is in progress
  const [error, setError] = useState(null); // Stores error messages
  const [success, setSuccess] = useState(false); // Tracks successful submission

  // CHANGE HANDLER: Updates formData when a field changes.
  // Handles text, numbers, checkboxes, and file uploads.
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : files ? files[0] : value,
    }));
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

      const response = await axiosInstance.post('/product_fast/', payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Saved:', response.data);
      setSuccess(true);
      setFormData({});
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title*</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleChange}
          placeholder="Product Title"
          required
          minLength={20}
          maxLength={200}
        />
      </div>

      <div>
        <label htmlFor="qty">Quantity*</label>
        <input
          type="number"
          id="qty"
          name="qty"
          onChange={handleChange}
          placeholder="Qty Purchased"
          required
          min={1}
        />
      </div>

      <div>
        <label htmlFor="qty_units">Quantity Units*</label>
        <select
          id="qty_units"
          name="qty_units"
          onChange={handleChange}
          required
        >
          <option value="each">Each</option>
          <option value="pair">Pair</option>
          <option value="set">Set</option>
        </select>
      </div>

      <div>
        <label htmlFor="cost">Cost*</label>
        <input
          type="number"
          id="cost"
          name="cost"
          onChange={handleChange}
          placeholder="Purchase Price"
          required
          min={0}
        />
      </div>

      <div>
        <label htmlFor="image">Product Image*</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="ai_description">AI Description (Optional)</label>
        <textarea
          id="ai_description"
          name="ai_description"
          onChange={handleChange}
          placeholder="AI Description"
        />
      </div>

      <div>
        <label htmlFor="fast_notes">Fast Notes (Optional)</label>
        <textarea
          id="fast_notes"
          name="fast_notes"
          onChange={handleChange}
          placeholder="Fast Notes"
        />
      </div>

      <div>
        <label htmlFor="save">Add item to inventory?</label>
        <select id="save" name="save" onChange={handleChange} required>
          <option value="save">Save</option>
          <option value="remove">Remove</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Submit'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Product saved successfully!</p>}
    </form>
  );
};

export default FastCreateForm;
