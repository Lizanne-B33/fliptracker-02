// Source: https://react-bootstrap.github.io/docs/forms/overview
// https://thelinuxcode.com/react-bootstrap-form-component-the-complete-guide/#google_vignette
// https://dev.to/jsha/cheat-sheet-for-react-bootstrap-layout-and-forms-5d75
// Idea to containerize components from Copilot.

import React from 'react';
import { Form } from 'react-bootstrap';

const FileField = ({ label, name, onChange, ...props }) => (
  <Form.Group className="mb-3" controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.Control type="file" name={name} onChange={onChange} {...props} />
  </Form.Group>
);

export default FileField;
