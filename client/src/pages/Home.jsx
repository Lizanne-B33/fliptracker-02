import React from 'react';
import HeroImage from '../components/home/HeroImage';
import HeroText from '../components/home/HeroText';
import HeroButtons from '../components/home/HeroButtons';
import FeaturesSection from '../components/home/FeatureSection';
import FeatureAccordion from '../components/home/FeatureAccordion';
import UserProfile from '../components/UserProfile';
import '../styles/home.css';

export default function Home() {
  return (
    <main className="topParent">
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

      <section className="mobile_accordion">
        <FeatureAccordion />
      </section>

      {/* Canary: show user profile if logged in */}
      <section className="userProfile">
        <UserProfile />
      </section>
    </main>
  );
}
