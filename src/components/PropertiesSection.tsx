
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
    <section id="proprietes" className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6">
            <span className="gradient-text">Nos propriétés</span>
            <span className="text-foreground"> disponibles</span>
          </h2>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Découvrez notre sélection de propriétés de qualité dans les meilleures localités du Bénin
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 lg:gap-4 mb-12 lg:mb-16 animate-scale-in">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? "default" : "outline"}
              onClick={() => {
                setFilter(option.value);
                setVisibleCount(6);
              }}
              className={`rounded-full px-4 lg:px-6 py-2 lg:py-3 text-sm lg:text-base font-medium transition-all duration-300 hover:scale-105 ${
                filter === option.value
                  ? 'bg-gradient-to-r from-benin-green to-benin-blue text-white shadow-lg'
                  : 'border-border hover:border-benin-green hover:text-benin-green hover:bg-benin-green/5'
              }`}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 xl:gap-10 mb-12 lg:mb-16">
          {visibleProperties.map((property, index) => (
            <div
              key={property.id}
              className="animate-fade-in group"
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
              className="border-2 border-benin-green text-benin-green hover:bg-benin-green hover:text-white px-8 lg:px-12 py-3 lg:py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              📋 Voir plus de propriétés ({filteredProperties.length - visibleCount} restantes)
            </Button>
          </div>
        )}

        {/* No results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-16 lg:py-20 animate-fade-in">
            <div className="text-8xl lg:text-9xl mb-6">🏠</div>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Aucune propriété trouvée
            </h3>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Essayez un autre filtre ou revenez plus tard pour de nouvelles annonces.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesSection;
