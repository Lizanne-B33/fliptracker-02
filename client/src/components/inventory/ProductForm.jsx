// src/components/inventory/ProductForm.jsx
import { useState, useEffect, useRef } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import Select from 'react-select';
import TextField from '../formFields/TextField';
import FileField from '../formFields/FileField';
import { fetchList } from '../../utils/fetchList';
import { submitFormData } from '../../utils/submitFormData';

const ProductForm = ({ product, endpoint, onSaved, onCancel }) => {
  const fileInputRef = useRef();
  const [formData, setFormData] = useState({
    title: '',
    product_type_id: null,
    category_id: null,
    prod_image: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [productTypeOptions, setProductTypeOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Load product types on mount
  useEffect(() => {
    const loadProductTypes = async () => {
      try {
        const data = await fetchList('/api/inventory/product_type/');
        setProductTypeOptions(
          data.results.map((pt) => ({ value: pt.id, label: pt.name }))
        );
      } catch (err) {
        console.error('Error fetching product types:', err);
      }
    };
    loadProductTypes();
  }, []);

  // Prefill form for edit
  useEffect(() => {
    if (!product) {
      setFormData({
        title: '',
        product_type_id: null,
        category_id: null,
        prod_image: null,
      });
      setPreviewImage(null);
      setCategoryOptions([]);
      return;
    }

    setFormData({
      title: product.title || '',
      product_type_id: product.category?.product_type?.id || null,
      category_id: product.category?.id || null,
      prod_image: null,
    });

    if (product.prod_image) {
      const baseURL =
        process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
      setPreviewImage(`${baseURL}${product.prod_image}`);
    }

    // Load categories filtered by product type
    if (product.category?.product_type?.id) {
      fetchList(
        `/api/inventory/category/?product_type=${product.category.product_type.id}`
      )
        .then((data) => {
          setCategoryOptions(
            data.results.map((cat) => ({ value: cat.id, label: cat.name }))
          );
        })
        .catch((err) => console.error('Error fetching categories:', err));
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductTypeChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      product_type_id: selected?.value || null,
      category_id: null,
    }));
    if (selected) {
      fetchList(`/api/inventory/category/?product_type=${selected.value}`)
        .then((data) => {
          setCategoryOptions(
            data.results.map((cat) => ({ value: cat.id, label: cat.name }))
          );
        })
        .catch((err) => console.error('Error fetching categories:', err));
    } else {
      setCategoryOptions([]);
    }
  };

  const handleCategoryChange = (selected) => {
    setFormData((prev) => ({
      ...prev,
      category_id: selected?.value || null,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, prod_image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = product ? 'PATCH' : 'POST';
    const url = product ? `${endpoint}${product.id}/` : endpoint;

    await submitFormData(
      url,
      formData,
      () =>
        setFormData({
          title: '',
          product_type_id: null,
          category_id: null,
          prod_image: null,
        }),
      setLoading,
      setError,
      setSuccess,
      onSaved,
      method
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </Col>
        <Col md={6}>
          <Select
            placeholder="Select Product Type"
            options={productTypeOptions}
            value={productTypeOptions.find(
              (opt) => opt.value === formData.product_type_id
            )}
            onChange={handleProductTypeChange}
          />
        </Col>
        <Col md={6} className="mt-3">
          <Select
            placeholder="Select Category"
            options={categoryOptions}
            value={categoryOptions.find(
              (opt) => opt.value === formData.category_id
            )}
            onChange={handleCategoryChange}
            isDisabled={!formData.product_type_id}
          />
        </Col>
        <Col md={6} className="mt-3">
          <FileField
            ref={fileInputRef}
            label="Change Image (optional)"
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
      {error && (
        <pre className="text-danger mt-2">{JSON.stringify(error, null, 2)}</pre>
      )}
      {success && <p className="text-success mt-2">Saved successfully!</p>}
    </form>
  );
};

export default ProductForm;
