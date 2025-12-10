// Refactored out from form,
// Uses state management so it needs to go in the hook.

import { useState } from 'react';

export const useFormState = (initialFormData) => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Allow reset with optional new data
  const resetForm = (newData = initialFormData) => setFormData(newData);

  return {
    formData,
    setFormData,
    loading,
    setLoading,
    error,
    setError,
    success,
    setSuccess,
    resetForm,
  };
};
