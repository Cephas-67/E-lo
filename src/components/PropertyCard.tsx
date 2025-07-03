
import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Heart } from 'lucide-react';

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  owner: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <Card className="property-card overflow-hidden group cursor-pointer">
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
            >
              ←
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/70"
            >
              →
            </button>
          </>
        )}

        {/* Image Indicators */}
        {property.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {property.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-benin-green text-white font-bold text-sm px-3 py-1">
            {formatPrice(property.price)} CFA/mois
          </Badge>
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-800 font-medium">
            {property.type}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-benin-blue transition-colors">
              {property.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 flex items-center space-x-1">
              <span>📍</span>
              <span>{property.location}</span>
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <span>🛏️</span>
                <span>{property.bedrooms}</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>🚿</span>
                <span>{property.bathrooms}</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>📐</span>
                <span>{property.area}m²</span>
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-benin-yellow rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {property.owner.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {property.owner}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Propriétaire</p>
                </div>
              </div>
              
              <button 
                onClick={handleLike}
                className={`relative p-2 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 ${
                  isLiked 
                    ? 'bg-red-50 dark:bg-red-900/20' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Heart 
                  className={`w-5 h-5 transition-all duration-300 ${
                    isLiked 
                      ? 'fill-red-500 text-red-500 animate-pulse' 
                      : 'text-gray-400 hover:text-red-400'
                  }`}
                />
                {isLiked && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="w-full h-full rounded-full bg-red-500/20 animate-ping"></div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
