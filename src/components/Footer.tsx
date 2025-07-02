
import React from 'react';

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
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
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
              {['📘', '📷', '🐦', '💼'].map((icon, index) => (
                <button
                  key={index}
                  className="w-10 h-10 bg-gray-800 hover:bg-benin-green rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  {icon}
                </button>
              ))}
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
        <div className="bg-gradient-to-r from-benin-green/10 to-benin-blue/10 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <h4 className="text-2xl font-bold mb-2">Restez informé</h4>
            <p className="text-gray-400 mb-6">
              Recevez les dernières offres et actualités immobilières du Bénin
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-benin-green focus:border-transparent"
              />
              <button className="bg-gradient-to-r from-benin-green to-benin-blue hover:from-benin-green/90 hover:to-benin-blue/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                S'abonner
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} e-lo Bénin. Tous droits réservés.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Plateforme immobilière certifiée au Bénin
              </p>
            </div>
            
            <div className="flex space-x-6 text-sm">
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
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-benin-green/5 rounded-full -mb-16 -ml-16"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-benin-blue/5 rounded-full -mb-12 -mr-12"></div>
    </footer>
  );
};

export default Footer;
