
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { X, Search, MapPin, Home } from 'lucide-react';

interface MapViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const MapView: React.FC<MapViewProps> = ({ isOpen, onClose }) => {
  const [searchLocation, setSearchLocation] = useState('');

  const properties = [
    { id: 1, name: 'Appartement 3 pièces', location: 'Akpakpa', price: '450,000 CFA', lat: 6.3333, lng: 2.4167 },
    { id: 2, name: 'Villa moderne', location: 'Calavi', price: '800,000 CFA', lat: 6.3500, lng: 2.3500 },
    { id: 3, name: 'Studio meublé', location: 'Cadjehoun', price: '250,000 CFA', lat: 6.3167, lng: 2.3833 }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-5xl h-[80vh] flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="w-5 h-5" />
            <span>Carte des Propriétés</span>
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 flex">
          {/* Barre de recherche */}
          <div className="w-80 border-r border-gray-200 dark:border-gray-700 p-4 flex flex-col">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher une localisation..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="space-y-2 overflow-y-auto">
              <h3 className="font-medium text-sm text-gray-600 dark:text-gray-400 mb-3">
                Propriétés disponibles
              </h3>
              {properties.map((property) => (
                <div key={property.id} className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-benin-green/20 rounded-lg flex items-center justify-center">
                      <Home className="w-5 h-5 text-benin-green" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{property.name}</h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {property.location}
                      </p>
                      <p className="text-sm font-semibold text-benin-green mt-1">
                        {property.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Zone de carte */}
          <div className="flex-1 relative bg-gray-100 dark:bg-gray-800 rounded-lg m-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                  Carte Google Maps
                </h3>
                <p className="text-sm text-gray-500 max-w-md">
                  Pour intégrer Google Maps, vous devez obtenir une clé API Google Maps et l'ajouter à votre projet.
                  Les propriétés seront affichées avec des marqueurs interactifs.
                </p>
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    💡 <strong>Pour les développeurs :</strong> Ajoutez votre clé API Google Maps 
                    dans les variables d'environnement pour activer la carte interactive.
                  </p>
                </div>
              </div>
            </div>

            {/* Simulation de marqueurs */}
            <div className="absolute top-20 left-20 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg">
              1
            </div>
            <div className="absolute top-32 right-32 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg">
              2
            </div>
            <div className="absolute bottom-24 left-1/3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg">
              3
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapView;
