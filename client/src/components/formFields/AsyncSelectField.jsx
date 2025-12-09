import React from 'react';
import { Form } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';

const AsyncSelectField = ({
  label,
  name,
  value,
  onChange,
  loadOptions,
  error,
  ...props
}) => (
  <Form.Group className="mb-3" controlId={name}>
    {label && <Form.Label>{label}</Form.Label>}
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      value={value}
      onChange={onChange}
      {...props}
    />
    {error && (
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    )}
  </Form.Group>
);

export default AsyncSelectField;
