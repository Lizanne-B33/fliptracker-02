import React, { useEffect } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { axiosInstance } from '../../api/apiConfig';
import { submitFormData } from '../../utils/formSubmit.js';
import { useFormState } from '../../hooks/useFormState';
import TextField from '../../components/formFields/TextField';
import TextAreaField from '../../components/formFields/TextAreaField';
import SelectField from '../../components/formFields/SelectField.jsx';
import NumberField from '../../components/formFields/NumberField.jsx';
import FileField from '../../components/formFields/FileField.jsx';
import { getFieldError } from '../../utils/errorHelpers';

const ProductFastForm = ({
  // Component Props
  Product,
  item,
  onSaved,
  fields,
  productTypes,
  endpoint,
  categories,
}) => {
  // Initial Form State
  const {
    formData,
    setFormData,
    loading,
    error,
    success,
    resetForm,
    setLoading,
    setError,
    setSuccess,
  } = useFormState({
    title: '',
    prod_image: '',
    cost: '',
    cost_unit: 'each',
    qty: 1,
    price: '',
    price_unit: 'each',
    category_id: '',
    product_type_id: '',
    brand: '',
    color: '',
    size: '',
    condition: 'undefined',
    status: 'acquired',
    ai_desc: '',
    fast_notes: '',
    user_desc: '',
    commit: 'choose...',
  });

  // Prefill when editing
  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        title: item.title,
        prod_image: item.prod_image,
        cost: item.cost,
        cost_unit: item.cost_unit,
        qty: item.qty,
        price: item.price,
        price_unit: item.price_unit,
        product_type_id: '', // used for filtering categories
        category_id: item.category.id,
        brand: item.brand,
        color: item.color,
        size: item.size,
        condition: item.condition,
        status: item.status,
        ai_desc: item.ai_desc,
        fast_notes: item.fast_notes,
        user_desc: item.user_desc,
        commit: item.commit,
      });
    } else {
      resetForm();
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Normalize the title to single capital letter then all lowercase if a title exists.
    // the ? checks to see if formData.title is truthy
    const normalizedName = formData.title
      ? formData.title.trim().charAt(0).toUpperCase() +
        formData.title.trim().slice(1).toLowerCase()
      : '';

    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });
      payload.set('title', normalizedName);

      if (item) {
        await axiosInstance.put(
          `/api/inventory/product_fast/${item.id}/`,
          payload
        );
      } else {
        await submitFormData(
          endpoint,
          payload,
          resetForm,
          setLoading,
          setError,
          setSuccess
        );
      }
      if (onSaved) onSaved();
    } catch (err) {
      setError(err);
    }
  };

  // Duck helped me with this code block.
  const calculateProposedPrice = () => {
    const cost = parseFloat(formData.cost);
    return cost * 4 * 0.75;
  };

  const calculateProfit = () => {
    const cost = parseFloat(formData.cost);
    return calculateProposedPrice() - cost;
  };

  return (
    <Form className="container mt-3 mb-3" onSubmit={handleSubmit}>
      <Row className="mb-3">
        <TextField
          label="Product Title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="enter title here."
          required
          maxLength={255}
          error={getFieldError(error, 'title')}
        />
        <SelectField
          label="Product Type"
          name="product_type_id"
          value={formData.product_type_id}
          onChange={handleChange}
          // Creates empty array if the timing is off on getting props.
          options={(productTypes || []).map((pt) => ({
            value: pt.id,
            label: pt.name,
          }))}
          placeholder="Select a Product Type"
          required
        />
        <SelectField
          label="Category"
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          // Creates empty array if the timing is off on getting props.
          options={(categories || [])
            .filter(
              (c) =>
                String(c.product_type?.id) === String(formData.product_type_id)
            )
            .map((c) => ({
              value: c.id,
              label: c.name,
            }))}
          error={
            getFieldError(error, 'category_id') ||
            (error?.non_field_errors?.[0] ?? null)
          }
          placeholder="Select a Category"
          required
        />
        <NumberField
          label="Cost"
          type="number"
          name="cost"
          value={formData.cost}
          onChange={handleChange}
          placeholder="Purchase Price"
          required
          min={0}
        />
        <NumberField
          label="Quantity"
          type="number"
          name="qty"
          value={formData.qty}
          onChange={handleChange}
          placeholder="Enter number purchased"
          required
          min={0}
        />
        <SelectField
          label="Cost Unit"
          name="cost_unit"
          value={formData.cost_unit}
          onChange={handleChange}
          required
        >
          <option value="each">Each</option>
          <option value="pair">Pair</option>
          <option value="set">Set</option>
        </SelectField>
        <SelectField
          label="Condition"
          name="condition_id"
          value={formData.condition_id}
          onChange={handleChange}
          required
        >
          <option value="undefined">Undefined</option>
          <option value="new">New</option>
          <option value="restored">Restored</option>
          <option value="best">Best</option>
          <option value="better">Better</option>
          <option value="good">Good</option>
        </SelectField>
        <FileField
          label="Product Image"
          type="file"
          name="prod_image"
          onChange={handleChange}
          required
        />
        <TextAreaField
          label="AI Description (Optional)"
          type="textarea"
          name="ai_desc"
          value={formData.ai_desc}
          onChange={handleChange}
          placeholder="Enter information copied from AI or other source"
          error={getFieldError(error, 'ai_desc')}
        />
        <TextAreaField
          label="Fast Notes (Optional)"
          type="textarea"
          name="fast_notes"
          value={formData.fast_notes}
          onChange={handleChange}
          placeholder="Enter information copied from AI or other source"
          error={getFieldError(error, 'fast_notes')}
        />
        <SelectField
          label="Commit Item?"
          name="commit"
          value={formData.commit}
          onChange={handleChange}
          required
        >
          <option value="choose...">Choose...</option>
          <option value="confirm">
            Yes, I want to save this item to inventory.
          </option>
          <option value="reset">
            No, I want to clear this item and start again.
          </option>
        </SelectField>
      </Row>
      <Row
        className="ft-proposedPrice"
        style={{ display: formData.commit !== 'choose...' ? 'block' : 'none' }}
      >
        <p>
          Proposed Price for this item(s) is {calculateProposedPrice()}.
          Assuming a 25% sales cost, your profit will be {calculateProfit()}.
        </p>
      </Row>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : item ? 'Update' : 'Create'}
      </Button>
      {success && <p style={{ color: 'green' }}>Saved successfully!</p>}
    </Form>
  );
};

export default ProductFastForm;
