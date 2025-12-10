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
import DateField from '../formFields/DateField.jsx';

<Form>
  <Row className="section basic-info">
    <Col className="basic-info-title col-12">
      <h5 className="ft-section-header"> Basic Information </h5>
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
    </Col>
    <Col className="col-12">
      <Row className="inner-section basic-info">
        <Col className="col-6 left-basic-info">
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
        </Col>
        <Col className="col-6 right-basic-info">
          <TextField
            id="status"
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="Select Status"
          />
          <DateField
            id="sold_date"
            label="Sold Date"
            type="date"
            value={formData.sold_date}
          />
        </Col>
      </Row>
    </Col>
  </Row>
  <Row className="section stock-info">
    <Col className="stock-info-title col-12">
      <h5 className="ft-section-header"> Stock Information & Pricing </h5>
    </Col>
    <Col className="col-12">
      <Row className="inner-section stock-info">
        <Col className="col-6 left-stock-info">
          <Row className="qty">
            <Col className="left-qty">
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
            <Col className="right-qty">
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
            value={formData.cost ?? ''} // never undefined
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
        <Col className="col-6 right-stock-info">
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
          <NumberField
            label="price"
            type="number"
            name="price"
            value={formData.price ?? ''} // never undefined
            onChange={handleChange}
            placeholder="Posting Price"
            required
            min={0}
          />
        </Col>
      </Row>
    </Col>
  </Row>
  <Row className="section posting-info">
    <Col className="posting-info-title col-12">
      <h5 className="ft-section-header"> Posting Information </h5>
    </Col>
    <Row className="inner-section posting-info">
      <Col className="col-6 left-posting-info">
        <h4>Notes from Fast Load</h4>
        <TextAreaField
          label="Fast Notes (Optional)"
          type="textarea"
          name="fast_notes"
          value={formData.fast_notes}
          onChange={handleChange}
          placeholder="Enter your own notes. "
          error={getFieldError(error, 'fast_notes')}
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
      </Col>
      <Col className="col-6 right-posting-info">
        <h4> Posting Description </h4>
        <TextAreaField
          label="Post Description"
          type="textarea"
          name="user_desc"
          value={formData.user_desc}
          onChange={handleChange}
          placeholder="Enter the text for your posting."
          error={getFieldError(error, 'user_desc')}
        />
      </Col>
    </Row>
  </Row>
  <Row className="section more-details">
    <Col className="more-details-title col-12">
      <h5 className="ft-section-header"> More Information </h5>
    </Col>
    <Col className="col-12">
      <Row className="inner-section more-info">
        <Col className="col-4 left-more-info">
          <TextField
            id="brand"
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Enter Brand if known."
          />
        </Col>
        <Col className="col-4 center-more-info">
          <TextField
            id="color"
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            placeholder="Enter primary color(s)"
          />
        </Col>
        <Col className="col-4 right-more-info">
          <TextField
            id="size"
            type="text"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="Enter size"
          />
        </Col>
      </Row>
    </Col>
  </Row>
</Form>;
