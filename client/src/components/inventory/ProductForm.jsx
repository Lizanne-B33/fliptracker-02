// src/components/inventory/ProductForm.jsx
import { useState, useEffect, useRef } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import TextField from '../formFields/TextField';
import FileField from '../formFields/FileField';
import NumberField from '../formFields/NumberField';
import TextAreaField from '../formFields/TextAreaField';
import SelectField from '../formFields/SelectField';
import { getFieldError } from '../../utils/errorHelpers';
import { fetchList } from '../../utils/fetchList';
import { submitFormData } from '../../utils/submitFormData';
import { formatCurrency } from '../../utils/formatCurrency';
import {
  getProductImageURL,
  handleProductImageFile,
} from '../../utils/imageHelpers';

const ProductForm = ({ product, endpoint, onSaved, onCancel }) => {
  const fileInputRef = useRef();

  const emptyForm = {
    title: '',
    category_id: null,
    status: '',
    purch_qty: '',
    qty_unit: '',
    cost: '',
    condition: 'undefined',
    price: '',
    user_desc: '',
    ai_desc: '',
    fast_notes: '',
    sold_date: '',
  };

  const [formData, setFormData] = useState(emptyForm);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [productTypeOptions, setProductTypeOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Fetch product types on mount
  useEffect(() => {
    fetchList('/api/inventory/product_type/')
      .then((data) =>
        setProductTypeOptions(
          data.results.map((pt) => ({ value: pt.id, label: pt.name }))
        )
      )
      .catch((err) => console.error('Error fetching product types:', err));
  }, []);

  // Prefill form when editing
  useEffect(() => {
    if (!product) {
      setFormData(emptyForm);
      setPreviewImage(null);
      setSelectedFile(null);
      setCategoryOptions([]);
      return;
    }

    setFormData({
      title: product.title || '',
      category_id: product.category?.id || null,
      status: product.status || '',
      purch_qty: product.purch_qty || '',
      qty_unit: product.qty_unit || '',
      cost: product.cost || '',
      condition: product.condition || 'undefined',
      price: product.price || '',
      user_desc: product.user_desc || '',
      ai_desc: product.ai_desc || '',
      fast_notes: product.fast_notes || '',
      sold_date: product.sold_date || '',
    });

    setPreviewImage(getProductImageURL(product.prod_image));
    setSelectedFile(null);

    if (product.category?.product_type?.id) {
      fetchList(
        `/api/inventory/category/?product_type=${product.category.product_type.id}`
      )
        .then((data) =>
          setCategoryOptions(
            data.results.map((c) => ({ value: c.id, label: c.name }))
          )
        )
        .catch((err) => console.error('Error fetching categories:', err));
    }
  }, [product]);

  // Handle simple input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (selected) => {
    setFormData((prev) => ({ ...prev, category_id: selected?.value || null }));
  };

  const handleProductTypeChange = (selected) => {
    setFormData((prev) => ({ ...prev, category_id: null }));
    if (selected) {
      fetchList(`/api/inventory/category/?product_type=${selected.value}`)
        .then((data) =>
          setCategoryOptions(
            data.results.map((c) => ({ value: c.id, label: c.name }))
          )
        )
        .catch((err) => console.error('Error fetching categories:', err));
    } else {
      setCategoryOptions([]);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleProductImageFile(file, setPreviewImage, setSelectedFile);
  };

  // Pricing calculations
  const conditionFactors = {
    like_new: 1,
    restored: 0.95,
    used_excellent: 1,
    used_very_good: 0.95,
    used_good: 0.75,
    undefined: 1,
  };

  const calculateProposedPrice = () => {
    const cost = parseFloat(formData.cost) || 0;
    return cost * 4 * (conditionFactors[formData.condition] || 1);
  };

  const calculateProfit = () =>
    calculateProposedPrice() * 0.75 - (parseFloat(formData.cost) || 0);
  const calculateTotalProfit = () =>
    (parseFloat(formData.purch_qty) || 0) * calculateProfit();

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const submitData = new FormData();

    // Only append a real file
    if (selectedFile) submitData.append('prod_image', selectedFile);

    // Append other fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'category_id') submitData.append('category', value);
      else if (key !== 'prod_image' && value != null)
        submitData.append(key, value);
    });

    console.log('Payload entries:', [...submitData.entries()]); // Debug

    const method = product ? 'PATCH' : 'POST';
    const safeEndpoint = endpoint || '/api/inventory/product/';
    const url = product ? `${safeEndpoint}${product.id}/` : safeEndpoint;

    // Single submitFormData call
    console.log('Selected file:', selectedFile);
    console.log('FormData entries:', [...submitData.entries()]);
    await submitFormData(
      url,
      submitData,
      () => {
        setFormData(emptyForm);
        setPreviewImage(null);
        setSelectedFile(null);
      },
      setLoading,
      setError,
      setSuccess,
      onSaved,
      method,
      true // isFormData
    );
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Basic Information */}
      <Row className="ft-section-header">
        <h4>Basic Information</h4>
      </Row>
      <Row>
        <Col md={6}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Form.Group controlId="product_type">
            <Form.Label>Product Type</Form.Label>
            <Select
              value={
                productTypeOptions.find(
                  (opt) => opt.value === product?.category?.product_type?.id
                ) || null
              }
              onChange={handleProductTypeChange}
              options={productTypeOptions}
              placeholder="Select Product Type"
            />
          </Form.Group>
          <Form.Group controlId="category_id">
            <Form.Label>Category</Form.Label>
            <Select
              value={
                categoryOptions.find(
                  (opt) => opt.value === formData.category_id
                ) || null
              }
              onChange={handleCategoryChange}
              options={categoryOptions}
              placeholder="Select Category"
              isDisabled={!categoryOptions.length}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <FileField
            ref={fileInputRef}
            label="Replace Image"
            name="prod_image"
            onChange={handleFileChange}
          />
          {previewImage && (
            <div className="mt-2">
              <p className="text-muted">
                {selectedFile ? selectedFile.name : 'Current image:'}
              </p>
              <img
                src={previewImage}
                alt="Preview"
                style={{
                  maxWidth: '200px',
                  maxHeight: '200px',
                  objectFit: 'contain',
                  borderRadius: '15px',
                }}
              />
            </div>
          )}
        </Col>
      </Row>

      {/* Stock Info & Pricing */}
      <Row className="ft-section-header">
        <h4>Stock Information & Pricing</h4>
      </Row>
      <Row>
        <Col md={6}>
          <Row>
            <Col md={6}>
              <NumberField
                label="Quantity"
                name="purch_qty"
                value={formData.purch_qty}
                onChange={handleChange}
                min={0}
                required
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
          <Row>
            <Col md={6}>
              <NumberField
                label="Cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                min={0}
                required
              />
            </Col>
            <Col md={6}>
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
          </Row>
        </Col>
        <Col md={6}>
          {formData.cost && (
            <div className="ft-proposedPrice mb-3">
              <p>
                Proposed Price per {formData.qty_unit} is{' '}
                <strong>{formatCurrency(calculateProposedPrice())}</strong>.
                Profit per {formData.qty_unit}:{' '}
                {formatCurrency(calculateProfit())}. Total:{' '}
                {formatCurrency(calculateTotalProfit())}.
              </p>
            </div>
          )}
          <NumberField
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min={0}
            required
          />
        </Col>
      </Row>

      {/* Descriptions */}
      <Row className="ft-section-header">
        <h4>Posting Information</h4>
      </Row>
      <Row>
        <Col md={4}>
          <TextAreaField
            label="Post Description"
            name="user_desc"
            value={formData.user_desc}
            onChange={handleChange}
            placeholder="Enter the text for your posting."
            error={getFieldError(error, 'user_desc')}
          />
        </Col>
        <Col md={4}>
          <TextAreaField
            label="AI Description"
            name="ai_desc"
            value={formData.ai_desc}
            onChange={handleChange}
            placeholder="Optional AI info"
            error={getFieldError(error, 'ai_desc')}
          />
        </Col>
        <Col md={4}>
          <TextAreaField
            label="Fast Notes"
            name="fast_notes"
            value={formData.fast_notes}
            onChange={handleChange}
            placeholder="Optional notes"
            error={getFieldError(error, 'fast_notes')}
          />
        </Col>
      </Row>

      {/* Buttons */}
      <Row className="mt-3">
        <Col>
          <Button type="submit" disabled={loading}>
            {product ? 'Update' : 'Create'}
          </Button>{' '}
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        </Col>
      </Row>

      {/* Error / Success */}
      {error && (
        <pre className="text-danger mt-2">{JSON.stringify(error, null, 2)}</pre>
      )}
      {success && <p className="text-success mt-2">Saved successfully!</p>}
    </Form>
  );
};

export default ProductForm;
