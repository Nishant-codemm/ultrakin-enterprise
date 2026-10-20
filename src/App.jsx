import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import LogoBar from './sections/LogoBar';
import WorkflowSpotlight from './sections/WorkflowSpotlight';
import FeaturesSection from './sections/FeaturesSection';
import BentoGrid from './sections/BentoGrid';
import SpineSection from './sections/SpineSection';
import IntegrationsSection from './sections/IntegrationsSection';
import SecuritySection from './sections/SecuritySection';
import TestimonialsSection from './sections/TestimonialsSection';
import PricingSection from './sections/PricingSection';
import FAQSection from './sections/FAQSection';
import CTASection from './sections/CTASection';
import Footer from './sections/Footer';
import EnterpriseDemoDrawer from './components/showcase/EnterpriseDemoDrawer';
import { WorkspaceProvider } from './context/WorkspaceContext';

export default function App() {
  return (
    <WorkspaceProvider>
      <div className="min-h-screen bg-[#07090E] text-[#F1F5F9] selection:bg-[#6366F1]/30 selection:text-[#C7D2FE] font-sans antialiased">
        <Navbar />
        <main id="main_content">
          <HeroSection />
          <LogoBar />
          <WorkflowSpotlight />
          <FeaturesSection />
          <BentoGrid />
          <SpineSection />
          <IntegrationsSection />
          <SecuritySection />
          <TestimonialsSection />
          <PricingSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
        <EnterpriseDemoDrawer />
      </div>
    </WorkspaceProvider>
  );
}
