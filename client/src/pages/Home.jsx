import React from 'react';
import HeroImage from '../components/home/HeroImage';
import HeroText from '../components/home//HeroText';
import HeroButtons from '../components/home/HeroButtons';
import FeaturesSection from '../components/home/FeatureSection';
import '../styles/home.css';

export default function Home() {
  return (
    <div className="topParent">
      <section className="hero">
        <div className="container text-center py-5">
          <div className="row welcome-hero">
            <HeroImage />
            <HeroText />
            <HeroButtons />
          </div>
        </div>
      </section>
      <section className="functionCards">
        <FeaturesSection />
      </section>
    </div>
  );
}
