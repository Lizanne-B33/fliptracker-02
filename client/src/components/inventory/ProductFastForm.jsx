import React, { useEffect } from 'react';
import { Row, Form, Button } from 'react-bootstrap';
import { axiosInstance } from '../../api/apiConfig';
import { submitFormData } from '../../utils/formSubmit.js';
import { useFormState } from '../../hooks/useFormState';
import TextField from '../../components/formFields/TextField';
import SelectField from '../../components/formFields/SelectField.jsx';
import { getFieldError } from '../../utils/errorHelpers';

const ProductFastForm = ({ Product, item, onSaved, fields }) => {
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
        brand: '',
        color: '',
        size: '',
        condition: 'undefined',
        status: 'acquired',
        ai_desc: '',
        fast_notes: '',
        user_desc: '',
        commit: 'choose...', // if you still want this field
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

        // Normalize the title to single capital letter then all lowercase.
        const normalizedName =
            formData.title.trim().charAt(0).toUpperCase() +
            formData.title.trim().slice(1).toLowercase();

        try {
            const payload = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                payload.append(key, value);
                payload.append(title, normalizedName);
            });

            if (item) {
                await axiosInstance.put(
                    `/api/inventory/product/'${product.id}/`,
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

    return (
        <Form onSubmit={handleSubmit}>
            {/* Render TextField, SelectField, etc. based on `fields` */
                <Form className="container mt-3 mb-3" onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <TextField
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Item Title"
                            required
                            maxLength={255}
                            error={getFieldError(error, 'title')}
                        />
                        <SelectField
                            label="Category"
                            name="category_id"
                            value={formData.category_id}
                            onChange={handleChange}
                            options={productTypes.map((c) => ({
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
                    </Row>



      }
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Saving...' : item ? 'Update' : 'Create'}
                    </Button>
                    {success && <p style={{ color: 'green' }}>Saved successfully!</p>}
                </Form>
  );
};

            export default ProductFastForm;
