
import React from 'react';
import { Facebook, Instagram, Linkedin, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'Propriétés': [
      'Villas à louer',
      'Appartements',
      'Maisons familiales',
      'Studios',
      'Bureaux'
    ],
    'Services': [
      'Recherche avancée',
      'Gestion locative',
      'Support juridique',
      'Évaluation',
      'Conseils'
    ],
    'Localités': [
      'Cotonou',
      'Porto-Novo',
      'Parakou',
      'Abomey-Calavi',
      'Bohicon'
    ],
    'Support': [
      'Centre d\'aide',
      'Contact',
      'FAQ',
      'Documentation',
      'Signaler un problème'
    ]
  };

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12 mb-12 lg:mb-16 justify-items-start">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-2 w-full">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-benin-green to-benin-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">e</span>
              </div>
              <div>
                <h3 className="text-xl font-bold gradient-text">e-lo Bénin</h3>
                <p className="text-xs text-gray-400">Location Immobilière</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              La plateforme de référence pour la location immobilière au Bénin. 
              Trouvez votre maison idéale ou mettez votre propriété en location facilement.
            </p>
            
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://wa.me/22900000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-lg mb-4 text-benin-green">{title}</h4>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-benin-green/10 to-benin-blue/10 rounded-xl lg:rounded-2xl p-6 lg:p-8 mb-8 lg:mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4">Restez informé</h4>
            <p className="text-gray-400 mb-4 lg:mb-6 text-sm lg:text-base">
              Recevez les dernières offres et actualités immobilières du Bénin
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-2.5 lg:py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-benin-green focus:border-transparent text-sm lg:text-base"
              />
              <button className="bg-gradient-to-r from-benin-green to-benin-blue hover:from-benin-green/90 hover:to-benin-blue/90 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 text-sm lg:text-base">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 lg:pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 gap-4">
            <div className="text-center lg:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} e-lo Bénin. Tous droits réservés.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Plateforme immobilière certifiée au Bénin
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 lg:gap-6 text-xs lg:text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Politique de confidentialité
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-20 lg:w-32 h-20 lg:h-32 bg-benin-green/5 rounded-full -mb-10 lg:-mb-16 -ml-10 lg:-ml-16"></div>
      <div className="absolute bottom-0 right-0 w-16 lg:w-24 h-16 lg:h-24 bg-benin-blue/5 rounded-full -mb-8 lg:-mb-12 -mr-8 lg:-mr-12"></div>
    </footer>
  );
};

export default Footer;
