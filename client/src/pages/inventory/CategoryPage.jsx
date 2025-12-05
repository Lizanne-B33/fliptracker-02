import React from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../api/apiConfig';
import CategoryForm from '../../components/inventory/CategoryForm';

const CategoryPage = () => {
  const [productTypes, setProductTypes] = useState([]);
  React.useEffect(() => {
    axiosInstance
      .get('/api/inventory/product_type/')
      .then((res) => {
        console.log('Product types API response:', res.data);
        setProductTypes(res.data.results); //uses array
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="topParent">
      <section className="hero">
        <div className="container text-center py-5">
          <div className="row welcome-hero">
            <CategoryForm productTypes={productTypes} />
          </div>
        </div>
      </section>
    </div>
  );
};
export default CategoryPage;
