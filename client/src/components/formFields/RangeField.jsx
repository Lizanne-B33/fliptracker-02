// Source: https://react-bootstrap.github.io/docs/forms/overview
// https://thelinuxcode.com/react-bootstrap-form-component-the-complete-guide/#google_vignette
// https://dev.to/jsha/cheat-sheet-for-react-bootstrap-layout-and-forms-5d75
// Idea to containerize components from Copilot.

const RangeField = ({ label, name, min, max, step, ...props }) => (
  <Form.Group className="mb-3" controlId={name}>
    <Form.Label>{label}</Form.Label>
    <Form.Range
      name={name}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      {...props}
    />
  </Form.Group>
);
export default SwitchField;
