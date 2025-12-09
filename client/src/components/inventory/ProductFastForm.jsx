import React, { useEffect, useRef } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { axiosInstance } from '../../api/apiConfig';
import { submitFormData } from '../../utils/submitFormData.js';
import { useFormState } from '../../hooks/useFormState';
import TextField from '../../components/formFields/TextField';
import TextAreaField from '../../components/formFields/TextAreaField';
import SelectField from '../../components/formFields/SelectField.jsx';
import AsyncSelectField from '../../components/formFields/AsyncSelectField.jsx';
import NumberField from '../../components/formFields/NumberField.jsx';
import FileField from '../../components/formFields/FileField.jsx';
import { getFieldError } from '../../utils/errorHelpers';
import { formatCurrency } from '../../utils/formatCurrency.js';

const ProductFastForm = ({ item, onSaved, endpoint }) => {
  const fileInputRef = useRef(null);
  //================================================
  // INITIAL STATE
  //================================================
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
    prod_image: null,
    cost: '',
    qty_unit: 'each',
    purch_qty: 1,
    price: '',
    product_type_id: '',
    category_id: '',
    condition: 'undefined',
    status: 'acquired',
    ai_desc: '',
    fast_notes: '',
    commit: 'choose...',
  });

  // Prefill when editing
  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id,
        title: item.title,
        prod_image: item.prod_image,
        cost: item.cost != null ? Number(item.cost) : '',
        purch_qty: item.purch_qty,
        qty_unit: item.qty_unit,
        product_type_id: item.product_type?.id ?? '',
        category_id: item.category?.id ?? '',
        condition: item.condition,
        status: item.status,
        ai_desc: item.ai_desc,
        fast_notes: item.fast_notes,
        commit: 'choose...',
      });
    } else {
      resetForm();
    }
  }, [item]);

  //================================================
  // CHANGE HANDLING
  //================================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'category_id' ? parseInt(value, 10) : value,
    }));
    if (name === 'commit' && value === 'reset') {
      resetForm();
    }
  };

  //================================================
  // SUBMIT HANDLING
  //================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== '') {
        if (key === 'product_type_id' || key === 'category_id') {
          payload.append(key, value?.value ?? '');
        } else {
          payload.append(key, value);
        }
      }
    });

    try {
      if (item) {
        await axiosInstance.put(
          `/api/inventory/product_fast/${item.id}/`,
          payload
        );
      } else {
        await submitFormData(
          endpoint,
          {
            ...formData,
            product_type_id: formData.product_type_id?.value ?? null,
            category_id: formData.category_id?.value ?? null,
          },
          resetForm,
          setLoading,
          setError,
          setSuccess
        );
      }

      // clear file input after successful submit
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setFormData((prev) => ({ ...prev, prod_image: null }));

      if (onSaved) onSaved();
    } catch (err) {
      setError(err);
    }
  };
  //================================================
  // BUSINESS LOGIC HELPERS
  //================================================
  const conditionFactors = {
    like_new: 1,
    restored: 0.95,
    used_excellent: 1,
    used_very_good: 0.95,
    used_good: 0.75,
    undefined: 1,
  };

  const calculateProposedPrice = () => {
    const cost = parseFloat(formData.cost);
    const factor = conditionFactors[formData.condition] ?? 1;
    return cost * 4 * factor;
  };

  const calculateProfit = () => {
    const cost = parseFloat(formData.cost);
    return calculateProposedPrice() * 0.75 - cost;
  };

  const calculateTotalProfit = () => {
    return calculateProfit() * formData.purch_qty;
  };

  //================================================
  // RENDERING
  //================================================
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
        <AsyncSelectField
          label="Product Type"
          name="product_type_id"
          value={formData.product_type_id} // now stores { value, label }
          onChange={(selected) =>
            setFormData((prev) => ({
              ...prev,
              product_type_id: selected, // store full object
            }))
          }
          loadOptions={(inputValue) =>
            axiosInstance
              .get('/api/inventory/product_type/', {
                params: { search: inputValue },
              })
              .then((res) => {
                const items = res.data.results ?? res.data;
                return items.map((pt) => ({ value: pt.id, label: pt.name }));
              })
          }
          placeholder="Select a Product Type"
          required
          error={getFieldError(error, 'product_type_id')}
        />
        <AsyncSelectField
          label="Category"
          name="category_id"
          value={formData.category_id} // now stores { value, label }
          onChange={(selected) =>
            setFormData((prev) => ({
              ...prev,
              category_id: selected, // store full object
            }))
          }
          loadOptions={(inputValue) =>
            axiosInstance
              .get('/api/inventory/category/', {
                params: {
                  product_type: formData.product_type_id?.value, // use ID from object
                  search: inputValue,
                },
              })
              .then((res) => {
                const items = res.data.results ?? res.data;
                return items.map((c) => ({ value: c.id, label: c.name }));
              })
          }
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
          value={formData.cost ?? ''} // never undefined
          onChange={handleChange}
          placeholder="Purchase Price"
          required
          min={0}
        />
        <NumberField
          label="Quantity"
          type="number"
          name="purch_qty"
          value={formData.purch_qty}
          onChange={handleChange}
          placeholder="Enter number purchased"
          required
          min={0}
        />
        <SelectField
          label="Quantity Unit"
          name="qty_unit"
          value={formData.qty_unit}
          onChange={handleChange}
          required
        >
          <option value="each">Each</option>
          <option value="pair">Pair</option>
          <option value="set">Set</option>
        </SelectField>
        <SelectField
          label="Condition"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          required
        >
          <option value="undefined">Undefined</option>
          <option value="like_new">Like New</option>
          <option value="restored">Restored</option>
          <option value="used_excellent">Used Excellent</option>
          <option value="used_very_good">Used Very Good</option>
          <option value="used_good">Used Good</option>
        </SelectField>
        <FileField
          ref={fileInputRef}
          label="Product Image"
          type="file"
          name="prod_image"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, prod_image: e.target.files[0] }))
          }
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
          placeholder="Enter your own notes. "
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
        style={{ display: formData.cost !== '' ? 'block' : 'none' }}
      >
        <p>
          Proposed Price per {formData.qty_unit} for this item is{' '}
          {formatCurrency(calculateProposedPrice())}.
        </p>
        <p>
          Assuming a 25% sales cost, your profit will be{' '}
          {formatCurrency(calculateProfit())} per {formData.qty_unit}.
        </p>
        <p>
          This could be a total profit of{' '}
          {formatCurrency(calculateTotalProfit())}.
        </p>
      </Row>
      <Button
        id="submitBtn"
        type="submit"
        disabled={loading || formData.commit !== 'confirm'}
      >
        {loading ? 'Saving...' : item ? 'Update' : 'Create'}
      </Button>
      {success && <p style={{ color: 'green' }}>Saved successfully!</p>}
    </Form>
  );
};

export default ProductFastForm;
