import React, { useEffect, useRef } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
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
import DateField from '../../components/formFields/DateField.jsx';

const ProductForm = ({ item, onSaved, endpoint }) => {
  console.log('ProductForm props:', { item, onSaved, endpoint });
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
    category_id: null,
    cost: '',
    purch_qty: 1,
    sold_qty: '',
    qty_unit: 'each',
    price: '',
    ai_desc: '',
    user_desc: '',
    fast_notes: '',
    brand: '',
    color: '',
    size: '',
    condition: 'undefined',
    status: 'acquired',
    sold_date: '',
    commit: 'choose...',
    product_type_id: item?.category?.product_type
      ? {
          value: item.category.product_type.id,
          label: item.category.product_type.name,
        }
      : null,
  });

  // Prefill when editing
  useEffect(() => {
    if (!item) {
      resetForm();
      return;
    }

    setFormData({
      id: item.id ?? '',
      title: item.title ?? '',
      category_id: item.category
        ? { value: item.category.id, label: item.category.name }
        : null,
      product_type_id: item?.category?.product_type
        ? {
            value: item.category.product_type.id,
            label: item.category.product_type.name,
          }
        : null,
      cost: item.cost != null ? Number(item.cost) : '',
      purch_qty: item.purch_qty ?? '',
      sold_qty: item.sold_qty ?? '',
      qty_unit: item.qty_unit ?? '',
      price: item.price ?? '',
      ai_desc: item.ai_desc ?? '',
      user_desc: item.user_desc ?? '',
      fast_notes: item.fast_notes ?? '',
      brand: item.brand ?? '',
      color: item.color ?? '',
      size: item.size ?? '',
      condition: item.condition ?? '',
      status: item.status ?? '',
      commit: 'choose...',
      prod_image: null, // NEVER preload files
    });
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

    try {
      const method = item ? 'PUT' : 'POST';
      const endpointUrl = item
        ? `/api/inventory/product/${item.id}/`
        : endpoint;

      await submitFormData(
        endpointUrl,
        formData, // plain object, not FormData
        resetForm,
        setLoading,
        setError,
        setSuccess,
        onSaved, // or refreshList if you want to re-fetch
        method
      );

      // clear file input after successful submit
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setFormData((prev) => ({ ...prev, prod_image: null }));
    } catch (err) {
      console.error('Submit failed:', err);
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

  function FormSection({ title, children, className }) {
    return (
      <Row className={`section ${className || ''}`}>
        <Col xs={12}>
          <h5 className="ft-section-header">{title}</h5>
        </Col>
        <Col xs={12}>{children}</Col>
      </Row>
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      {/* Basic Information */}
      <FormSection title="Basic Information" className="text-start">
        <Row>
          <Col md={6}>
            <TextField
              label="Product Title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title here."
              required
              maxLength={255}
              error={getFieldError(error, 'title')}
            />
          </Col>
          <Col md={1}>
            <img
              src={item?.prod_image || '/media/images/placeholder.jpeg'}
              alt="Product"
              className="thumbnail"
              style={{
                maxWidth: '150px',
                display: 'block',
                marginBottom: '10px',
              }}
            />
          </Col>
          <Col md={5}>
            <FileField
              ref={fileInputRef}
              label="***Use this field to change image only."
              name="prod_image"
              onChange={(e) => {
                console.log('Selected file:', e.target.files[0]);
                setFormData((prev) => ({
                  ...prev,
                  prod_image: e.target.files[0],
                }));
              }}
            />
            {formData.prod_image && (
              <div className="mt-1 text-muted">
                Selected: {formData.prod_image.name}
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <AsyncSelectField
              label="Product Type"
              name="product_type_id"
              value={formData.product_type_id}
              onChange={(selected) =>
                setFormData((prev) => ({
                  ...prev,
                  product_type_id: selected,
                }))
              }
              loadOptions={(inputValue) =>
                axiosInstance
                  .get('/api/inventory/product_type/', {
                    params: { search: inputValue },
                  })
                  .then((res) => {
                    const items = res.data.results ?? res.data;
                    return items.map((pt) => ({
                      value: pt.id,
                      label: pt.name,
                    }));
                  })
              }
              placeholder="Select a Product Type"
              required
              error={getFieldError(error, 'product_type_id')}
            />
            <AsyncSelectField
              label="Category"
              name="category_id"
              value={formData.category_id}
              onChange={(selected) =>
                setFormData((prev) => ({ ...prev, category_id: selected }))
              }
              loadOptions={(inputValue) =>
                axiosInstance
                  .get('/api/inventory/category/', {
                    params: {
                      product_type: formData.product_type_id?.value,
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
          </Col>
          <Col md={6}>
            <SelectField
              label="Product Status"
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="acquired">Acquired</option>
              <option value="ready_to_list">Ready to List</option>
              <option value="listed">Listed</option>
              <option value="sold">Sold</option>
              <option value="removed">Removed</option>
            </SelectField>
            {formData.status === 'sold' && (
              <DateField
                label="Sold Date"
                type="date"
                value={formData.sold_date}
                onChange={handleChange}
                readOnly={false}
              />
            )}
          </Col>
        </Row>
      </FormSection>

      {/* Stock Information & Pricing */}
      <FormSection title="Stock Information & Pricing" className="text-start">
        <Row>
          <Col md={6}>
            <Row>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
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
              </Col>
            </Row>
            <NumberField
              label="Cost"
              type="number"
              name="cost"
              value={formData.cost ?? ''}
              onChange={handleChange}
              placeholder="Purchase Price"
              required
              min={0}
            />
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
          </Col>
          <Col md={6}>
            {formData.cost !== '' && (
              <div className="ft-proposedPrice mb-3">
                <p>
                  Proposed Price per {formData.qty_unit} is{' '}
                  {formatCurrency(calculateProposedPrice())}.
                </p>
                <p>
                  Assuming 25% sales cost, profit will be{' '}
                  {formatCurrency(calculateProfit())} per {formData.qty_unit}.
                </p>
                <p>
                  Total profit could be {formatCurrency(calculateTotalProfit())}
                  .
                </p>
              </div>
            )}
            <NumberField
              label="Price"
              type="number"
              name="price"
              value={formData.price ?? ''}
              onChange={handleChange}
              placeholder="Posting Price"
              required
              min={0}
            />
          </Col>
        </Row>
      </FormSection>

      {/* Posting Information */}
      <FormSection title="Posting Information">
        <Row>
          <Col md={6}>
            <h4>Notes from Fast Load</h4>
            <TextAreaField
              label="Fast Notes (Optional)"
              name="fast_notes"
              value={formData.fast_notes}
              onChange={handleChange}
              placeholder="Enter your own notes."
              error={getFieldError(error, 'fast_notes')}
            />
            <TextAreaField
              label="AI Description (Optional)"
              name="ai_desc"
              value={formData.ai_desc}
              onChange={handleChange}
              placeholder="Enter information copied from AI or other source"
              error={getFieldError(error, 'ai_desc')}
            />
          </Col>
          <Col md={6}>
            <h4>Posting Description</h4>
            <TextAreaField
              label="Post Description"
              name="user_desc"
              value={formData.user_desc}
              onChange={handleChange}
              placeholder="Enter the text for your posting."
              error={getFieldError(error, 'user_desc')}
            />
          </Col>
        </Row>
      </FormSection>

      {/* More Information */}
      <FormSection title="More Information">
        <Row>
          <Col md={4}>
            <TextField
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter Brand if known."
            />
          </Col>
          <Col md={4}>
            <TextField
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="Enter primary color(s)"
            />
          </Col>
          <Col md={4}>
            <TextField
              name="size"
              value={formData.size}
              onChange={handleChange}
              placeholder="Enter size"
            />
          </Col>
        </Row>
      </FormSection>
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
export default ProductForm;
