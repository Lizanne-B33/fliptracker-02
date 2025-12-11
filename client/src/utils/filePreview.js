// utils/filePreview.js

/**
 * Sets preview image and updates formData for a file input.
 * Handles both existing URL strings and newly selected File objects.
 *
 * @param {Event|File|string} fileOrEvent - File input change event, File object, or URL string
 * @param {function} setFormData - state setter for formData
 * @param {string} fieldName - field in formData (e.g., 'prod_image')
 * @param {function} setPreviewImage - state setter for preview image
 */
export const handleFilePreview = (
  fileOrEvent,
  setFormData,
  fieldName,
  setPreviewImage
) => {
  let file;

  if (fileOrEvent instanceof Event && fileOrEvent.target.files) {
    file = fileOrEvent.target.files[0];
    console.log('Selected file inside handleFilePreview:', file);
  } else if (fileOrEvent instanceof File) {
    file = fileOrEvent;
    console.log('Selected file object passed directly:', file);
  } else if (typeof fileOrEvent === 'string') {
    setFormData((prev) => ({ ...prev, [fieldName]: fileOrEvent }));
    setPreviewImage(fileOrEvent);
    return;
  }

  if (!file) return;

  setFormData((prev) => ({ ...prev, [fieldName]: file }));

  const reader = new FileReader();
  reader.onloadend = () => setPreviewImage(reader.result);
  reader.readAsDataURL(file);
};

export default handleFilePreview;
