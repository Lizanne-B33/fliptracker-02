// utils/formDebug.js
export const logFormData = (formData, product = null) => {
  console.log('Form opened with data:', formData);

  if (formData.prod_image) {
    if (formData.prod_image instanceof File) {
      console.log('Selected file:', {
        name: formData.prod_image.name,
        size: formData.prod_image.size,
        type: formData.prod_image.type,
      });
    } else if (typeof formData.prod_image === 'string') {
      console.log('Existing image path/URL:', formData.prod_image);
    } else {
      console.log('Unknown prod_image type:', formData.prod_image);
    }
  }

  if (product) {
    console.log('Product passed for edit:', product);
  }
};
