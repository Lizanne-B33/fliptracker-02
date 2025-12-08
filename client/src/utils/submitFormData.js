import { axiosInstance } from '../api/apiConfig';

// A plain object comes in from the form with a dictionary of Key:Values.
// This object is given a name formData.
// The handle submit in the form calls this utility sending information from the form.
export const submitFormData = async (
  endpoint,
  formData,
  resetForm,
  setLoading,
  setError,
  setSuccess,
  refreshList,
  method = 'POST' // default for create, edit will pass in the PUT.
) => {
  // 1: Sets the user interface state.
  setLoading(true);
  setError(null);
  setSuccess(false);

  try {
    // 2: Debug logs to be removed later.
    // confirming that this is in fact an object.
    console.log('Incoming formData:', formData);
    console.log('Incoming formData type:', formData.constructor.name); // should log "Object"

    // 3: Build FormData payload from data sent in.
    // Iterates over each key:value pair in the object,
    // if the value is a file (image file) the filename is appended, otherwise a string.
    const payload = new FormData();

    for (const [key, value] of Object.entries(formData)) {
      console.log('Appending:', key, value);
      if (value instanceof File) {
        payload.append(key, value, value.name);
      } else {
        payload.append(key, value);
      }
    }

    console.log('Payload entries after append:', [...payload.entries()]);

    // 4: Sends payload to backend (Django )
    // Axios sends the FormData with correct headers, DRF sees the FK Ids.
    let response;
    if (method === 'PUT') {
      response = await axiosInstance.put(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    } else {
      response = await axiosInstance.post(endpoint, payload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }

    // 5. Handle success and or errors.
    console.log('Saved:', response.data);
    setSuccess(true);
    resetForm();

    if (typeof refreshList === 'function') {
      console.log('Calling refreshList...');
      await refreshList(); // e.g. re-fetch categories or product types
    }

    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      setError(err.response.data);
    } else {
      setError({ non_field_errors: ['Failed to save product.'] });
    }

    // 6: Cleanup. (spinner stops)
  } finally {
    setLoading(false);
  }
};
