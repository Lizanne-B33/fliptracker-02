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
