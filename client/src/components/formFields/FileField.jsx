// FileField.jsx
// The element does not manage or change state.
// Only provides the boilerplate necessary to construct the object.
import React from 'react';
import { Form } from 'react-bootstrap';

const FileField = React.forwardRef(
  ({ label, name, onChange, ...props }, ref) => (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="file"
        name={name}
        onChange={(e) => {
          console.log('FileField onChange fired', e.target.files[0]);
          onChange && onChange(e); // <-- forward to parent
        }}
        ref={ref}
        {...props}
      />
    </Form.Group>
  )
);

export default FileField;
