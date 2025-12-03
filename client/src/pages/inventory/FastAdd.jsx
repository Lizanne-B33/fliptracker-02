import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../api/apiConfig';
import NewFastForm from '../../components/inventory/NewFastForm';

export default function FastAdd() {
  return (
    <div className="topParent">
      <section className="hero">
        <div className="container text-center py-5">
          <div className="row welcome-hero">
            <NewFastForm />
          </div>
        </div>
      </section>
    </div>
  );
}
