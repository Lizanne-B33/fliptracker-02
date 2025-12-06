import React, { useState, useEffect } from 'react';
import { fetchList } from '../../utils/fetchList';
import CategoryForm from '../../components/inventory/CategoryForm';
import CategoryList from '../../components/inventory/CategoryList';

const CategoryPage = () => {
  // SET STATES
  const [productTypes, setProductTypes] = useState([]); // FK for categories
  const [categories, setCategories] = useState([]); // List of Categories
  const [selected, setSelected] = useState(null); // Default is Create Mode

  // initial Data Fetch - runs once when page opens
  useEffect(() => {
    fetchList('/api/inventory/category/', setCategories);
    fetchList('/api/inventory/product_type/', setProductTypes);
  }, []);

  // refresh after create/update -
  // runs after update to pull a new list of objects.
  // Returns button to create mode.
  const handleRefresh = () => {
    fetchList('/api/inventory/category/', setCategories);
    setSelected(null);
  };

  // JSX Layout
  return (
    <div className="topParent">
      <section className="hero">
        <div className="container text-center py-5">
          <h1 className="ft-bigtext mb-5">Category Management</h1>
          <hr />
          <div className="row welcome-hero">
            <CategoryForm // Form stuff
              category={selected} // Category being edited
              productTypes={productTypes} // FK options for dropdown
              onSaved={handleRefresh} // Refresh after save.
            />
          </div>
          <hr />
          <div className="row lists">
            <CategoryList // List Stuff
              items={categories} // List of categories
              onSelect={setSelected} // click --> selected
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
