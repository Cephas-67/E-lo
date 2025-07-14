
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeroSectionProps {
  onAuthClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onAuthClick }) => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-benin-green/10 via-benin-blue/10 to-benin-yellow/10"></div>
      
      {/* Floating elements - Hidden on mobile */}
      <div className="hidden md:block absolute top-20 left-10 w-20 h-20 bg-benin-green/20 rounded-full animate-float"></div>
      <div className="hidden md:block absolute top-40 right-20 w-16 h-16 bg-benin-blue/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="hidden md:block absolute bottom-40 left-20 w-12 h-12 bg-benin-yellow/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      <div className="hidden md:block absolute bottom-20 right-40 w-24 h-24 bg-benin-red/20 rounded-full animate-float" style={{ animationDelay: '6s' }}></div>

      <div className="container mx-auto px-4 xs:px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="gradient-text">Trouvez votre</span>
            <br />
            <span className="text-gray-900 dark:text-white">maison idéale</span>
            <br />
            <span className="gradient-text">au Bénin</span>
          </h1>
          
          <p className="text-lg xs:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
            La plateforme de référence pour la location immobilière au Bénin. 
            Des milliers de propriétés vous attendent dans tout le pays.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-6 sm:mb-8 animate-scale-in px-4">
            <div className="flex flex-col gap-3 sm:gap-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-2xl">
              <Input
                placeholder="Ville ou quartier..."
                className="w-full border-none focus:ring-0 text-base sm:text-lg"
              />
              <Input
                type="number"
                placeholder="Budget max (CFA)"
                className="w-full border-none focus:ring-0 text-base sm:text-lg"
              />
              <Button className="bg-gradient-to-r from-benin-green to-benin-blue hover:from-benin-green/90 hover:to-benin-blue/90 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-base sm:text-lg font-medium rounded-lg sm:rounded-xl transition-all duration-300 transform hover:scale-105 w-full">
                Rechercher
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-in px-4">
            <Button
              onClick={onAuthClick}
              size="lg"
              className="bg-gradient-to-r from-benin-green to-benin-blue hover:from-benin-green/90 hover:to-benin-blue/90 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
            >
              Commencer maintenant
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 dark:border-gray-600 hover:border-benin-green text-gray-700 dark:text-gray-300 hover:text-benin-green px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              Découvrir nos services
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 animate-fade-in px-4">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 sm:mb-2">500+</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Propriétés</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 sm:mb-2">50+</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Villes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 sm:mb-2">1000+</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Clients satisfaits</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold gradient-text mb-1 sm:mb-2">24/7</div>
              <div className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
