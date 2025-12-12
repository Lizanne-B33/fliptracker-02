import React from 'react';

export default function HeroButtons() {
  return (
    <>
      <div className="btn-wrapper btn-outline-black-wrapper btn-wrapper-md">
        <h5> Don't wait! Register today, you will not be sorry!!!</h5>
        <a className="cta-btn" href="/auth/register">
          Register
        </a>
      </div>
    </>
  );
}
