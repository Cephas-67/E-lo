
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import PropertyCard from '../components/PropertyCard';
import { Search, Filter, MapPin, Home, DollarSign, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'tous',
    priceRange: 'tous',
    location: 'tous'
  });

  // Données de démonstration
  const availableProperties = [
    {
      id: '1',
      title: 'Appartement moderne 3 pièces',
      price: 450000,
      location: 'Cotonou, Akpakpa',
      owner: 'Jean Kouassi',
      images: ['/placeholder.svg'],
      bedrooms: 3,
      bathrooms: 2,
      area: 85,
      type: 'Appartement'
    },
    {
      id: '2',
      title: 'Villa familiale avec jardin',
      price: 750000,
      location: 'Porto-Novo, Centre-ville',
      owner: 'Marie Adjovi',
      images: ['/placeholder.svg'],
      bedrooms: 4,
      bathrooms: 3,
      area: 150,
      type: 'Villa'
    },
    {
      id: '3',
      title: 'Studio moderne meublé',
      price: 200000,
      location: 'Cotonou, Cadjehoun',
      owner: 'Paul Dossou',
      images: ['/placeholder.svg'],
      bedrooms: 1,
      bathrooms: 1,
      area: 35,
      type: 'Studio'
    }
  ];

  const filteredProperties = availableProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filters.type === 'tous' || property.type.toLowerCase() === filters.type;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête de bienvenue */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Bienvenue, {user?.name} ! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Découvrez les meilleures offres de location au Bénin
          </p>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Propriétés Disponibles</p>
                  <p className="text-2xl font-bold">{availableProperties.length}</p>
                </div>
                <Home className="w-8 h-8 text-benin-green" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Prix Moyen</p>
                  <p className="text-2xl font-bold">466K CFA</p>
                </div>
                <DollarSign className="w-8 h-8 text-benin-blue" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Nouvelles Offres</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Calendar className="w-8 h-8 text-benin-yellow" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Villes Couvertes</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <MapPin className="w-8 h-8 text-benin-red" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Barre de recherche intelligente */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>Recherche Intelligente</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <Input
                  placeholder="Rechercher par lieu, type, prix... (ex: 'Appartement 3 pièces Cotonou moins de 500000')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-lg"
                />
              </div>
              <Button className="bg-benin-green hover:bg-benin-green/90">
                <Search className="w-4 h-4 mr-2" />
                Rechercher
              </Button>
            </div>
            
            {/* Filtres rapides */}
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={filters.type === 'tous' ? 'default' : 'secondary'}
                className="cursor-pointer"
                onClick={() => setFilters({...filters, type: 'tous'})}
              >
                Tous
              </Badge>
              <Badge 
                variant={filters.type === 'appartement' ? 'default' : 'secondary'}
                className="cursor-pointer"
                onClick={() => setFilters({...filters, type: 'appartement'})}
              >
                Appartements
              </Badge>
              <Badge 
                variant={filters.type === 'villa' ? 'default' : 'secondary'}
                className="cursor-pointer"
                onClick={() => setFilters({...filters, type: 'villa'})}
              >
                Villas
              </Badge>
              <Badge 
                variant={filters.type === 'studio' ? 'default' : 'secondary'}
                className="cursor-pointer"
                onClick={() => setFilters({...filters, type: 'studio'})}
              >
                Studios
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Liste des propriétés disponibles */}
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Offres Disponibles ({filteredProperties.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
