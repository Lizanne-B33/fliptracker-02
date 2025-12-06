// Source:

import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../api/apiConfig';
import ProductTypeForm from '../../components/inventory/ProductTypeForm';
import ProductTypeList from '../../components/inventory/ProductTypeList';
import { fetchList } from '../../utils/fetchList';
console.log('fetchList is:', fetchList);

const ProductTypePage = () => {
  // State variables used to Toggle between new object and edited object.
  const [productTypes, setProductTypes] = useState([]);
  const [selected, setSelected] = useState(null);

  // initial load
  useEffect(() => {
    fetchList('/api/inventory/product_type/', setProductTypes);
  }, []);

  // refresh after create/update
  const handleRefresh = () => {
    fetchList('/api/inventory/product_type/', setProductTypes);
    // Returns to Create Mode.
    setSelected(null);
  };

  return (
    <div className="topParent">
      <section className="hero">
        <div className="container text-center py-5">
          <div className="row welcome-hero">
            {/* Passing a Parm selected (if create or update) and a list refresh. */}
            <ProductTypeForm productType={selected} onSaved={handleRefresh} />
          </div>
          <div className="row lists">
            {/* List of product types */}
            <ProductTypeList
              ProductType={productTypes}
              onSelect={setSelected}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProductTypePage;
