import React from 'react';

export default function HeroImage() {
  return (
    <div className="hero-img">
      <img
        className="hero-logo me-3"
        src="/images/logo/FT_logo_1920_transp.png"
        alt="FlipTrackr Logo"
        style={{ maxWidth: '392px', aspectRatio: '1/1' }}
      />
    </div>
  );
}
