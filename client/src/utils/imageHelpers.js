// src/utils/imageHelpers.js

/**
 * Returns a full URL for a product image or placeholder
 */
export const getProductImageURL = (
  imagePath,
  placeholder = '/images/placeholder_ax3Vakt.jpeg'
) => {
  const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
  if (!imagePath) return placeholder;
  return imagePath.startsWith('http') ? imagePath : `${baseURL}${imagePath}`;
};

/**
 * Handles file selection for previews and FormData storage
 * @param {File} file - Selected file from input
 * @param {function} setPreviewImage - Sets preview URL
 * @param {function} setSelectedFile - Stores actual File for submission
 */
export const handleProductImageFile = (
  file,
  setPreviewImage,
  setSelectedFile
) => {
  if (!file) return;

  // Store the real File for submission
  setSelectedFile(file);

  // Create preview URL
  const reader = new FileReader();
  reader.onloadend = () => setPreviewImage(reader.result);
  reader.readAsDataURL(file);
};
