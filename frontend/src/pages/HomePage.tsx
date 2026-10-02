import { useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import AboutSection from '../components/home/AboutSection';
import FounderSection from '../components/home/FounderSection';
import BusinessesSection from '../components/home/BusinessesSection';
import SelectedConstructionSection from '../components/home/SelectedConstructionSection';
import ValuesSection from '../components/home/ValuesSection';
import InquirySection from '../components/home/InquirySection';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Ravisha Groups 2 | Construction & Cinema Production';
  }, []);

  // Handle hash navigation on load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1C1F2E]">
      <Navbar />
      <main style={{ paddingTop: 0 }}>
        <HeroSection />
        <FounderSection />
        <BusinessesSection />
        <SelectedConstructionSection />
        <AboutSection />
        <ValuesSection />
        <InquirySection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
