import { useState, useEffect, useRef } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { axiosInstance } from '../../api/apiConfig';
import { submitFormData } from '../../utils/submitFormData';
import { useFormState } from '../../hooks/useFormState';
import TextField from '../formFields/TextField';
import FileField from '../formFields/FileField';
import { getFieldError } from '../../utils/errorHelpers';

const ProductForm = ({ product, onSaved, endpoint, onCancel }) => {
  const fileInputRef = useRef();
  const [previewImage, setPreviewImage] = useState(null);
  const [productTypes, setProductTypes] = useState([]);
  const [categories, setCategories] = useState([]);

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
    product_type_id: null,
    category_id: null,
    prod_image: null,
  });

  // Load product types
  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const res = await axiosInstance.get('/api/inventory/product_type/');
        setProductTypes(
          res.data.map((pt) => ({ value: pt.id, label: pt.name }))
        );
      } catch (err) {
        console.error('Error fetching product types:', err);
      }
    };
    fetchProductTypes();
  }, []);

  // Load categories when product_type_id changes
  useEffect(() => {
    if (!formData.product_type_id) {
      setCategories([]);
      setFormData((prev) => ({ ...prev, category_id: null }));
      return;
    }

    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get(
          `/api/inventory/category/?product_type=${formData.product_type_id}`
        );
        setCategories(res.data.map((c) => ({ value: c.id, label: c.name })));
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, [formData.product_type_id]);

  // Prefill form for edit
  useEffect(() => {
    if (!product) {
      resetForm();
      setPreviewImage(null);
      return;
    }

    const baseURL =
      process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

    setFormData({
      id: product.id,
      title: product.title || '',
      product_type_id: product.category?.product_type?.id || null,
      category_id: product.category?.id || null,
      prod_image: null, // new file only
    });

    if (product.prod_image) {
      setPreviewImage(`${baseURL}${product.prod_image}`);
    }
  }, [product, resetForm, setFormData]);

  // Handle text input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle react-select change
  const handleSelectChange = (selected, { name }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: selected ? selected.value : null,
    }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, prod_image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Compute selected options for react-select
  const selectedProductType =
    productTypes.find((pt) => pt.value === formData.product_type_id) || null;

  const selectedCategory =
    categories.find((c) => c.value === formData.category_id) || null;

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitFormData(
        product ? `${endpoint}${product.id}/` : endpoint,
        formData,
        resetForm,
        setLoading,
        setError,
        setSuccess,
        onSaved,
        product ? 'PATCH' : 'POST' // PATCH for edits
      );
    } catch (err) {
      setError(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="section">
        <Col xs={12}>
          <h5 className="ft-section-header">Basic Information</h5>
        </Col>

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

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Product Type</Form.Label>
            <Select
              name="product_type_id"
              value={selectedProductType}
              onChange={handleSelectChange}
              options={productTypes}
              isClearable
            />
            {getFieldError(error, 'product_type_id') && (
              <div className="text-danger">
                {getFieldError(error, 'product_type_id')}
              </div>
            )}
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Select
              name="category_id"
              value={selectedCategory}
              onChange={handleSelectChange}
              options={categories}
              isClearable
              isDisabled={!formData.product_type_id}
            />
            {getFieldError(error, 'category_id') && (
              <div className="text-danger">
                {getFieldError(error, 'category_id')}
              </div>
            )}
          </Form.Group>
        </Col>

        <Col md={6}>
          <FileField
            ref={fileInputRef}
            label="***Use this field to change image only."
            name="prod_image"
            onChange={handleFileChange}
          />
          {previewImage && (
            <div className="mt-2">
              <p className="text-muted">
                {formData.prod_image?.name || 'Current image:'}
              </p>
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxWidth: '200px', maxHeight: '200px' }}
              />
            </div>
          )}
        </Col>
      </Row>

      <Button type="submit" disabled={loading}>
        {loading ? 'Saving...' : product ? 'Update' : 'Create'}
      </Button>
      {onCancel && (
        <Button variant="secondary" className="ms-2" onClick={onCancel}>
          Cancel
        </Button>
      )}
      {success && <p style={{ color: 'green' }}>Product saved successfully!</p>}
    </Form>
  );
};

export default ProductForm;
