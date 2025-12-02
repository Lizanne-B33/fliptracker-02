<form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="title">Title*</label>
    <input
      type="text"
      id="title"
      name="title"
      onChange={handleChange}
      placeholder="Product Title"
      required
      minLength={20}
      maxLength={200}
    />
  </div>

  <div>
    <label htmlFor="quantity">Quantity*</label>
    <input
      type="number"
      id="quantity"
      name="quantity"
      onChange={handleChange}
      placeholder="Qty Purchased"
      required
      min={1}
    />
  </div>

  <div>
    <label htmlFor="quantity_units">Quantity Units*</label>
    <select
      id="quantity_units"
      name="quantity_units"
      onChange={handleChange}
      required
    >
      <option value="each">Each</option>
      <option value="pair">Pair</option>
      <option value="set">Set</option>
    </select>
  </div>

  <div>
    <label htmlFor="cost">Cost*</label>
    <input
      type="number"
      id="cost"
      name="cost"
      onChange={handleChange}
      placeholder="Purchase Price"
      required
      min={0}
    />
  </div>

  <div>
    <label htmlFor="image">Product Image*</label>
    <input
      type="file"
      id="image"
      name="image"
      onChange={handleChange}
      required
    />
  </div>

  <div>
    <label htmlFor="ai_description">AI Description (Optional)</label>
    <textarea
      id="ai_description"
      name="ai_description"
      onChange={handleChange}
      placeholder="AI Description"
    />
  </div>

  <div>
    <label htmlFor="fast_notes">Fast Notes (Optional)</label>
    <textarea
      id="fast_notes"
      name="fast_notes"
      onChange={handleChange}
      placeholder="Fast Notes"
    />
  </div>

  <div>
    <label htmlFor="save">Add item to inventory?</label>
    <select id="save" name="save" onChange={handleChange} required>
      <option value="save">Save</option>
      <option value="remove">Remove</option>
    </select>
  </div>

  <button type="submit" disabled={loading}>
    {loading ? 'Saving...' : 'Submit'}
  </button>

  {error && <p style={{ color: 'red' }}>{error}</p>}
  {success && <p style={{ color: 'green' }}>Product saved successfully!</p>}
</form>;
