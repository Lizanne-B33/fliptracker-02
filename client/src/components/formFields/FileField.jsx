// src/components/formFields/FileField.jsx
import React from 'react';
import { Form } from 'react-bootstrap';

/**
 * FileField - reusable file input
 *
 * Props:
 * - label: string, label above the field
 * - name: string, field name
 * - onChange: function, called when a file is selected
 * - ref: optional ref to access the input programmatically
 * - ...props: any other props to pass to Form.Control
 */
const FileField = React.forwardRef(
  ({ label, name, onChange, ...props }, ref) => (
    <Form.Group className="mb-3" controlId={name}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        type="file"
        name={name}
        onChange={onChange}
        ref={ref}
        {...props}
      />
    </Form.Group>
  )
);

export default FileField;
