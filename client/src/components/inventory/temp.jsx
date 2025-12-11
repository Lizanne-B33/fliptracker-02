const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const submitData = new FormData();

  // Only append a real file
  if (selectedFile) submitData.append('prod_image', selectedFile);

  // Append other fields
  Object.entries(formData).forEach(([key, value]) => {
    if (key === 'category_id') {
      // unwrap {value, label} if it's from react-select
      submitData.append('category_id', value?.value ?? value);
    } else if (key === 'product_type_id') {
      submitData.append('product_type_id', value?.value ?? value);
    } else if (key !== 'prod_image' && value != null) {
      submitData.append(key, value);
    }
  });

  console.log('Payload entries:', [...submitData.entries()]); // Debug

  const method = product ? 'PATCH' : 'POST';
  const safeEndpoint = endpoint || '/api/inventory/product/';
  const url = product ? `${safeEndpoint}${product.id}/` : safeEndpoint;

  // Single submitFormData call
  console.log('Selected file:', selectedFile);
  console.log('FormData entries:', [...submitData.entries()]);
  await submitFormData(
    url,
    submitData,
    () => {
      setFormData(emptyForm);
      setPreviewImage(null);
      setSelectedFile(null);
    },
    setLoading,
    setError,
    setSuccess,
    onSaved,
    method,
    true // isFormData
  );
};
