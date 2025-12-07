// Source: https://react-bootstrap.github.io/docs/forms/overview
// https://thelinuxcode.com/react-bootstrap-form-component-the-complete-guide/#google_vignette
// https://dev.to/jsha/cheat-sheet-for-react-bootstrap-layout-and-forms-5d75
// Idea to containerize components from Copilot.

import React from 'react';
import { Form } from 'react-bootstrap';

const SwitchField = ({ label, name, checked, onChange, ...props }) => (
  <Form.Group className="mb-3" controlId={name}>
    <Form.Check
      type="switch"
      label={label}
      name={name}
      checked={checked}
      onChange={onChange}
      {...props}
    />
  </Form.Group>
);
export default SwitchField;
