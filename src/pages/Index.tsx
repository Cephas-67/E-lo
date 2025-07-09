
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import PropertiesSection from '../components/PropertiesSection';
import ServicesSection from '../components/ServicesSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import ChatWidget from '../components/ChatWidget';
import AIExplorer from '../components/AIExplorer';
import RentalRequestForm from '../components/RentalRequestForm';
import RentalOfferForm from '../components/RentalOfferForm';
import MapView from '../components/MapView';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAIExplorerOpen, setIsAIExplorerOpen] = useState(false);
  const [isRentalRequestOpen, setIsRentalRequestOpen] = useState(false);
  const [isRentalOfferOpen, setIsRentalOfferOpen] = useState(false);
  const [isMapViewOpen, setIsMapViewOpen] = useState(false);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleAuthClose = () => {
    setIsAuthModalOpen(false);
  };

  const handleChatToggle = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  const handleAIToggle = () => {
    setIsAIExplorerOpen(!isAIExplorerOpen);
  };

  const handleAIClose = () => {
    setIsAIExplorerOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation 
        onAuthClick={handleAuthClick} 
        onChatToggle={handleChatToggle}
        onAIToggle={handleAIToggle}
        onRentalRequest={() => setIsRentalRequestOpen(true)}
        onRentalOffer={() => setIsRentalOfferOpen(true)}
        onMapView={() => setIsMapViewOpen(true)}
      />
      
      <main>
        <HeroSection onAuthClick={handleAuthClick} />
        <PropertiesSection />
        <ServicesSection />
        <ContactSection />
      </main>
      
      <Footer />
      
      <AuthModal isOpen={isAuthModalOpen} onClose={handleAuthClose} />
      <ChatWidget 
        isOpen={isChatOpen} 
        onClose={handleChatClose} 
        onToggle={handleChatToggle}
      />
      <AIExplorer 
        isOpen={isAIExplorerOpen} 
        onClose={handleAIClose}
      />
      <RentalRequestForm 
        isOpen={isRentalRequestOpen} 
        onClose={() => setIsRentalRequestOpen(false)}
      />
      <RentalOfferForm 
        isOpen={isRentalOfferOpen} 
        onClose={() => setIsRentalOfferOpen(false)}
      />
      <MapView 
        isOpen={isMapViewOpen} 
        onClose={() => setIsMapViewOpen(false)}
      />
    </div>
  );
};

export default Index;
