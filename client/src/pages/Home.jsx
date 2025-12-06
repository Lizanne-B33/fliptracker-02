import React, { useEffect } from 'react';
import HeroImage from '../components/home/HeroImage';
import HeroText from '../components/home/HeroText';
import HeroButtons from '../components/home/HeroButtons';
import FeaturesSection from '../components/home/FeatureSection';
import FeatureAccordion from '../components/home/FeatureAccordion';
import UserProfile from '../components/UserProfile';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/home.css';
import '../styles/global.css';

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionExpired = location.state?.sessionExpired;

  // Clear the state after showing once
  useEffect(() => {
    if (sessionExpired) {
      // Replace current history entry with same path but no state
      navigate(location.pathname, { replace: true });
    }
  }, [sessionExpired, location.pathname, navigate]);

  return (
    <main className="topParent">
      <section className="userProfile">
        <UserProfile />
      </section>
      <section className="hero">
        <div className="container text-center py-5">
          <div className="row welcome-hero">
            <HeroImage />
            {sessionExpired && (
              <div className="alert alert-warning mt-3">
                ⚠️ Your session expired. Please log in again to continue.
              </div>
            )}
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
    </main>
  );
}
