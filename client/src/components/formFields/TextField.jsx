// Source: https://react-bootstrap.github.io/docs/forms/overview
// https://thelinuxcode.com/react-bootstrap-form-component-the-complete-guide/#google_vignette
// https://dev.to/jsha/cheat-sheet-for-react-bootstrap-layout-and-forms-5d75
// Idea to containerize components from Copilot.

import React from 'react';
import { Form } from 'react-bootstrap';

const TextField = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error, //accept error prop
  ...props
}) => (
  <Form.Group className="mb-3" controlId={name}>
    <Form.Control
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      isInvalid={!!error} // 👈 mark invalid if error exists
      {...props}
    />
    {error && (
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    )}
  </Form.Group>
);

export default TextField;
