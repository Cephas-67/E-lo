
import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import { Button } from './ui/button';

const MOCK_PROPERTIES = [
  {
    id: '1',
    title: 'Villa moderne à Calavi',
    price: 250000,
    location: 'Calavi, Littoral',
    owner: 'Adjovi Mensah',
    images: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=600&h=400&fit=crop'
    ],
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    type: 'Villa'
  },
  {
    id: '2',
    title: 'Appartement standing Cotonou',
    price: 180000,
    location: 'Ganhi, Cotonou',
    owner: 'Kossou Pierre',
    images: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop'
    ],
    bedrooms: 2,
    bathrooms: 1,
    area: 85,
    type: 'Appartement'
  },
  {
    id: '3',
    title: 'Maison familiale Abomey-Calavi',
    price: 150000,
    location: 'Godomey, Abomey-Calavi',
    owner: 'Ahounou Marie',
    images: [
      'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop'
    ],
    bedrooms: 4,
    bathrooms: 3,
    area: 140,
    type: 'Maison'
  },
  {
    id: '4',
    title: 'Studio moderne Porto-Novo',
    price: 80000,
    location: 'Centre-ville, Porto-Novo',
    owner: 'Dossou Jean',
    images: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop'
    ],
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    type: 'Studio'
  },
  {
    id: '5',
    title: 'Villa avec piscine Seme-Kpodji',
    price: 400000,
    location: 'Seme-Kpodji, Ouémé',
    owner: 'Akpovi Sylvie',
    images: [
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=600&h=400&fit=crop'
    ],
    bedrooms: 5,
    bathrooms: 4,
    area: 200,
    type: 'Villa'
  },
  {
    id: '6',
    title: 'Duplex résidentiel Parakou',
    price: 200000,
    location: 'Centre, Parakou',
    owner: 'Baba Moussa',
    images: [
      'https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=600&h=400&fit=crop',
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop'
    ],
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    type: 'Entrer/Coucher'
  }
];

const PropertiesSection: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const filterOptions = [
    { value: 'all', label: 'Toutes les propriétés' },
    { value: 'Villa', label: 'Villas' },
    { value: 'Appartement', label: 'Appartements' },
    { value: 'Maison', label: 'Maisons' },
    { value: 'Studio', label: 'Studios' },
    { value: 'Entrer/Coucher', label: 'Entrer/Coucher' }
  ];

  const filteredProperties = filter === 'all' 
    ? MOCK_PROPERTIES 
    : MOCK_PROPERTIES.filter(property => property.type === filter);

  const visibleProperties = filteredProperties.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <section id="proprietes" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Nos propriétés</span>
            <span className="text-gray-900 dark:text-white"> disponibles</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez notre sélection de propriétés de qualité dans les meilleures localités du Bénin
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-scale-in">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? "default" : "outline"}
              onClick={() => {
                setFilter(option.value);
                setVisibleCount(6);
              }}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                filter === option.value
                  ? 'bg-gradient-to-r from-benin-green to-benin-blue text-white'
                  : 'border-gray-300 hover:border-benin-green hover:text-benin-green'
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {visibleProperties.map((property, index) => (
            <div
              key={property.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PropertyCard property={property} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < filteredProperties.length && (
          <div className="text-center animate-fade-in">
            <Button
              onClick={loadMore}
              size="lg"
              variant="outline"
              className="border-2 border-benin-green text-benin-green hover:bg-benin-green hover:text-white px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Voir plus de propriétés ({filteredProperties.length - visibleCount} restantes)
            </Button>
          </div>
        )}

        {/* No results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Aucune propriété trouvée
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Essayez un autre filtre ou revenez plus tard pour de nouvelles annonces.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesSection;
