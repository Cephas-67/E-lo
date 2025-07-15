
import React from 'react';
import { Card, CardContent } from './ui/card';

const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: '🔍',
      title: 'Recherche Avancée',
      description: 'Trouvez rapidement la propriété idéale grâce à nos filtres intelligents et notre système de géolocalisation.',
      color: 'benin-green'
    },
    {
      icon: '🏠',
      title: 'Gestion Locative',
      description: 'Interface complète pour propriétaires : gestion des baux, suivi des paiements et communication avec les locataires.',
      color: 'benin-blue'
    },
    {
      icon: '💼',
      title: 'Accompagnement Juridique',
      description: 'Support juridique complet pour vos contrats de location et résolution de conflits éventuels.',
      color: 'benin-yellow'
    },
    {
      icon: '📱',
      title: 'Application Mobile',
      description: 'Accédez à toutes nos fonctionnalités depuis votre smartphone, avec notifications en temps réel.',
      color: 'benin-red'
    },
    {
      icon: '🛡️',
      title: 'Sécurité Garantie',
      description: 'Vérification des propriétaires et des locataires, avec système d\'assurance pour votre tranquillité.',
      color: 'benin-green'
    },
    {
      icon: '💬',
      title: 'Support 24/7',
      description: 'Notre équipe d\'experts est disponible en permanence pour répondre à toutes vos questions.',
      color: 'benin-blue'
    }
  ];

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900 dark:text-white">Nos </span>
            <span className="gradient-text">Services</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Une gamme complète de services pour faciliter votre expérience immobilière au Bénin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-10 justify-items-center max-w-7xl mx-auto">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 mb-6 text-3xl bg-${service.color}/10 rounded-full group-hover:bg-${service.color}/20 transition-colors duration-300`}>
                  {service.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-benin-green transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="mt-6">
                  <div className={`w-12 h-1 bg-gradient-to-r from-${service.color} to-${service.color}/50 mx-auto rounded-full group-hover:w-16 transition-all duration-300`}></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 sm:mt-16 animate-fade-in px-4">
          <div className="bg-gradient-to-r from-benin-green/10 to-benin-blue/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
              Prêt à commencer votre recherche ?
            </h3>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers d'utilisateurs qui font confiance à e-lo Bénin pour leurs besoins immobiliers
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button className="bg-gradient-to-r from-benin-green to-benin-blue hover:from-benin-green/90 hover:to-benin-blue/90 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
                Commencer maintenant
              </button>
              <button className="border-2 border-benin-green text-benin-green hover:bg-benin-green hover:text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold transition-all duration-300 w-full sm:w-auto">
                En savoir plus
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
