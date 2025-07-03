
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
import ChatWidget from '../components/ChatWidget';
import AIExplorer from '../components/AIExplorer';

const Index = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isAIExplorerOpen, setIsAIExplorerOpen] = useState(false);

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
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Navigation 
            onAuthClick={handleAuthClick} 
            onChatToggle={handleChatToggle}
            onAIToggle={handleAIToggle}
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
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default Index;
