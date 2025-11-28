import React from 'react';
import HeroImage from '../components/home/HeroImage';
import HeroText from '../components/home//HeroText';
import HeroButtons from '../components/home/HeroButtons';

export default function Home() {
  return (
    <section className="hero">
      <div className="container text-center py-5">
        <div className="row welcome-hero">
          <HeroImage />
          <HeroText />
          <HeroButtons />
        </div>
      </div>
    </section>
  );
}
