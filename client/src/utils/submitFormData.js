// src/utils/submitFormData.js
import { axiosInstance } from '../api/apiConfig';

export const submitFormData = async (
  url,
  formData,
  onSuccess = () => {},
  setLoading = () => {},
  setError = () => {},
  setSuccess = () => {},
  onSaved = () => {},
  method = 'POST',
  isFormData = false
) => {
  setLoading(true);
  setError(null);
  setSuccess(false);

  try {
    const res = await axiosInstance({
      url,
      method,
      data: formData,
      headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : {},
    });

    const data = res.data;

    setSuccess(true);
    onSaved && onSaved(data);
    onSuccess && onSuccess(data);

    return data;
  } catch (err) {
    const errorData = err.response?.data || err.message;
    console.error('Form submission error:', errorData);
    setError(errorData);
  } finally {
    setLoading(false);
  }
};
