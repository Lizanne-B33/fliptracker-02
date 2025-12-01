import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../api/apiConfig';
import FastCreateForm from '../../components/inventory/FastCreateForm';

export default function FastAdd() {
  return (
    <div className="topParent">
      <section className="hero">
        <div className="container text-center py-5">
          <div className="row welcome-hero">
            <FastCreateForm />
          </div>
        </div>
      </section>
    </div>
  );
}
