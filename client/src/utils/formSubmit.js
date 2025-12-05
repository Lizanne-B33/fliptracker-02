import { axiosInstance } from '../api/apiConfig';

export const submitFormData = async (
  endpoint,
  formData,
  resetForm,
  setLoading,
  setError,
  setSuccess
) => {
  setLoading(true);
  setError(null);
  setSuccess(false);

  try {
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    const response = await axiosInstance.post(endpoint, payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    console.log('Saved:', response.data);
    setSuccess(true);
    resetForm();
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      // Store the actual error object from DRF
      setError(err.response.data);
    } else if (err instanceof Error) {
      console.error(err.message);
      setError({ non_field_errors: [err.message] });
    } else {
      setError({ non_field_errors: ['Failed to save product.'] });
    }
  } finally {
    setLoading(false);
  }
};
