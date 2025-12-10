const handleFormSubmit = async (e) => {
  e.preventDefault();

  // Make a fresh copy of formData to ensure we have the latest state
  const latestFormData = { ...formData };
  console.log('Submitting formData:', latestFormData);

  await submitFormData(
    url,
    latestFormData, // pass the fresh copy
    () =>
      setFormData({
        title: '',
        product_type_id: null,
        category_id: null,
        prod_image: null,
      }),
    setLoading,
    setError,
    setSuccess,
    onSaved,
    method
  );
};
