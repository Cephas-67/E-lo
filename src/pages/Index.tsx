
import React, { useState } from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { AuthProvider } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import PropertiesSection from '../components/PropertiesSection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthClose = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation onAuthClick={handleAuthClick} />
          
          <main>
            <HeroSection onAuthClick={handleAuthClick} />
            <PropertiesSection />
            <ServicesSection />
            <ContactSection />
          </main>
          
          <Footer />
          
          <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthClose} />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Index;
