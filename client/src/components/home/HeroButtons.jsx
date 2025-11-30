import React from 'react';

export default function HeroButtons() {
  return (
    <>
      <div className="btn-wrapper btn-primary-wrapper btn-wrapper-md">
        <a className="cta-btn" href="#">
          TODO - contact button
        </a>
      </div>
      <div className="btn-wrapper btn-outline-black-wrapper btn-wrapper-md">
        <a className="cta-btn" href="/auth/register">
          Register
        </a>
      </div>
    </>
  );
}
