//this gets errors that have been converted nicely by the serializer to show up
//correctly on the front end.
// utils/errorHelpers.js
export const getFieldError = (error, field) => {
  if (!error) return null;
  if (error[field]) return error[field][0];
  if (field === 'name' && error.non_field_errors) {
    return error.non_field_errors[0];
  }
  return null;
};
