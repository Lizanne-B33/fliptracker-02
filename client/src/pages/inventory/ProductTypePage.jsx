import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../api/apiConfig';
import ProductTypeForm from '../../components/inventory/ProductTypeForm';

const ProductTypePage = () => {
  return (
    <div className="topParent">
      <section className="hero">
        <div className="container text-center py-5">
          <div className="row welcome-hero">
            <ProductTypeForm />
          </div>
        </div>
      </section>
    </div>
  );
};
export default ProductTypePage;
