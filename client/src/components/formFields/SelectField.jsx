// Source: https://react-bootstrap.github.io/docs/forms/overview
// https://thelinuxcode.com/react-bootstrap-form-component-the-complete-guide/#google_vignette
// https://dev.to/jsha/cheat-sheet-for-react-bootstrap-layout-and-forms-5d75
// Idea to containerize components from Copilot.

import React from 'react';
import { Form } from 'react-bootstrap';

const SelectField = ({
  label,
  name,
  value,
  options = [], // default to empty array if there are children.
  onChange,
  optionLabelKey = 'label',
  optionValueKey = 'value',
  error, //
  children, // allows children for static CHOICES
  ...props
}) => (
  <Form.Group className="mb-3" controlId={name}>
    {label && <Form.Label>{label}</Form.Label>}
    <Form.Select
      name={name}
      value={value}
      onChange={onChange}
      isInvalid={!!error}
      {...props}
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt[optionValueKey]} value={opt[optionValueKey]}>
          {opt[optionLabelKey]}
        </option>
      ))}
      {children}
    </Form.Select>
    {error && (
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    )}
  </Form.Group>
);

export default SelectField;
