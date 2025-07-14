
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface HeroSectionProps {
  onAuthClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onAuthClick }) => {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-benin-green/5 via-benin-blue/5 to-benin-yellow/5"></div>
      
      {/* Floating elements - Hidden on small screens */}
      <div className="hidden xl:block absolute top-20 left-10 w-20 h-20 bg-benin-green/10 rounded-full animate-float"></div>
      <div className="hidden xl:block absolute top-40 right-20 w-16 h-16 bg-benin-blue/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="hidden xl:block absolute bottom-40 left-20 w-12 h-12 bg-benin-yellow/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      <div className="hidden xl:block absolute bottom-20 right-40 w-24 h-24 bg-benin-red/10 rounded-full animate-float" style={{ animationDelay: '6s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-8 sm:py-12 lg:py-20">
        <div className="max-w-5xl mx-auto animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 lg:mb-8 leading-tight">
            <span className="gradient-text block">Trouvez votre</span>
            <span className="text-foreground block my-2">maison idéale</span>
            <span className="gradient-text block">au Bénin</span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 lg:mb-12 max-w-3xl mx-auto leading-relaxed">
            La plateforme de référence pour la location immobilière au Bénin. 
            Des milliers de propriétés vous attendent dans tout le pays.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto mb-8 lg:mb-12 animate-scale-in">
            <div className="bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl lg:rounded-3xl shadow-2xl p-4 lg:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <Input
                  placeholder="Ville ou quartier..."
                  className="h-12 lg:h-14 text-base lg:text-lg border-border/30 focus:border-benin-green bg-background/50"
                />
                <Input
                  type="number"
                  placeholder="Budget max (CFA)"
                  className="h-12 lg:h-14 text-base lg:text-lg border-border/30 focus:border-benin-blue bg-background/50"
                />
              </div>
              <Button className="w-full h-12 lg:h-14 bg-gradient-to-r from-benin-green to-benin-blue hover:from-benin-green/90 hover:to-benin-blue/90 text-white text-base lg:text-lg font-semibold rounded-xl lg:rounded-2xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg">
                🔍 Rechercher votre propriété idéale
              </Button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center items-center animate-fade-in max-w-2xl mx-auto">
            <Button
              onClick={onAuthClick}
              size="lg"
              className="bg-gradient-to-r from-benin-green to-benin-blue hover:from-benin-green/90 hover:to-benin-blue/90 text-white px-8 lg:px-12 py-4 lg:py-5 text-lg lg:text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl w-full sm:w-auto min-w-[200px]"
            >
              ✨ Commencer maintenant
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-border hover:border-benin-green text-foreground hover:text-benin-green hover:bg-benin-green/5 px-8 lg:px-12 py-4 lg:py-5 text-lg lg:text-xl font-semibold rounded-full transition-all duration-300 transform hover:scale-105 w-full sm:w-auto min-w-[200px]"
            >
              🏠 Découvrir nos services
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16 lg:mt-20 animate-fade-in">
            <div className="text-center p-4 lg:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 hover:bg-card/70 transition-all duration-300">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2 lg:mb-3">500+</div>
              <div className="text-sm lg:text-base text-muted-foreground font-medium">Propriétés</div>
            </div>
            <div className="text-center p-4 lg:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 hover:bg-card/70 transition-all duration-300">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2 lg:mb-3">50+</div>
              <div className="text-sm lg:text-base text-muted-foreground font-medium">Villes</div>
            </div>
            <div className="text-center p-4 lg:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 hover:bg-card/70 transition-all duration-300">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2 lg:mb-3">1000+</div>
              <div className="text-sm lg:text-base text-muted-foreground font-medium">Clients satisfaits</div>
            </div>
            <div className="text-center p-4 lg:p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 hover:bg-card/70 transition-all duration-300">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2 lg:mb-3">24/7</div>
              <div className="text-sm lg:text-base text-muted-foreground font-medium">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
