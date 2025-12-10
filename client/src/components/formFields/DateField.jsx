// Source: https://react-bootstrap.github.io/docs/forms/overview
// https://thelinuxcode.com/react-bootstrap-form-component-the-complete-guide/#google_vignette
// https://dev.to/jsha/cheat-sheet-for-react-bootstrap-layout-and-forms-5d75
// Idea to containerize components from Copilot.

import React from 'react';
import { Form } from 'react-bootstrap';

function DateField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  readOnly = false,
  plaintext = false,
}) {
  return (
    <Form.Group controlId={id}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        plaintext={plaintext}
      />
    </Form.Group>
  );
}
export default DateField;
