// Source: https://react-bootstrap.github.io/docs/forms/overview
// https://thelinuxcode.com/react-bootstrap-form-component-the-complete-guide/#google_vignette
// https://dev.to/jsha/cheat-sheet-for-react-bootstrap-layout-and-forms-5d75
// Idea to containerize components from Copilot.

import React from 'react';
import { Form } from 'react-bootstrap';

const CheckboxField = ({ label, id, name, onChange, ...props }) => (
  <Form.Check
    type="checkbox"
    id={id}
    checked={Checked}
    onChange={onChange}
    {...props}
  />
);
export default CheckboxField;
