// Source: https://react-bootstrap.github.io/docs/forms/overview
// https://thelinuxcode.com/react-bootstrap-form-component-the-complete-guide/#google_vignette
// https://dev.to/jsha/cheat-sheet-for-react-bootstrap-layout-and-forms-5d75
// Idea to containerize components from Copilot.

import React from 'react';
import { Form } from 'react-bootstrap';

const RadioField = ({ label, id, name, value, onChange, ...props }) => (
  <Form.Check
    type="radio"
    id={id}
    name={name}
    value={value}
    label={label}
    onChange={onChange}
    {...props}
  />
);
export default RadioField;
