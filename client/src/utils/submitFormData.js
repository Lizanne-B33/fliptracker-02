// src/utils/submitFormData.js
import { axiosInstance } from '../api/apiConfig';

/**
 * Submits form data to the backend.
 * Handles file uploads and optional HTTP method (POST, PUT, PATCH).
 *
 * @param {string} endpoint - API endpoint
 * @param {Object} formData - Plain object from form
 * @param {Function} resetForm - Function to reset the form
 * @param {Function} setLoading - Function to toggle loading spinner
 * @param {Function} setError - Function to set error state
 * @param {Function} setSuccess - Function to set success state
 * @param {Function} refreshList - Optional function to refresh parent list
 * @param {string} method - HTTP method: POST (default), PUT, PATCH
 */
export const submitFormData = async (
  endpoint,
  formData,
  resetForm,
  setLoading,
  setError,
  setSuccess,
  refreshList,
  method = 'POST'
) => {
  setLoading(true);
  setError(null);
  setSuccess(false);

  try {
    console.log('Submitting formData:', formData);

    // Build FormData payload
    const payload = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (key === 'prod_image') {
        if (value instanceof File) {
          payload.append(key, value, value.name); // only append if new file
        }
        // else skip sending prod_image (keep current)
      } else {
        payload.append(key, value);
      }
    }

    console.log('Payload entries:', [...payload.entries()]);

    // Send request
    const httpMethod = method.toUpperCase();
    let response;

    if (httpMethod === 'PATCH') {
      response = await axiosInstance.patch(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else if (httpMethod === 'PUT') {
      response = await axiosInstance.put(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      response = await axiosInstance.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    console.log('Saved response:', response.data);
    setSuccess(true);
    resetForm();

    if (typeof refreshList === 'function') {
      await refreshList();
    }

    return response.data;
  } catch (err) {
    console.error('Form submission error:', err);
    if (err.response?.data) {
      setError(err.response.data);
    } else {
      setError({ non_field_errors: ['Failed to save data.'] });
    }
  } finally {
    setLoading(false);
  }
};
