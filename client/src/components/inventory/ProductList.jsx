// src/components/inventory/ProductList.jsx
import React from 'react';

const ProductList = ({ items, onSelect }) => {
  if (!items || items.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((product) => (
          <tr key={product.id}>
            <td>{product.title}</td>
            <td>${product.price}</td>
            <td>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onSelect(product)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductList;
