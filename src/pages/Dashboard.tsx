
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import PropertyCard from '../components/PropertyCard';
import { Search, Filter, MapPin, Home, DollarSign, Calendar, TrendingUp, Users, Bell, Star } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: 'tous',
    priceRange: 'tous',
    location: 'tous'
  });

  // Données de démonstration enrichies
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
      type: 'Appartement',
      rating: 4.5,
      isNew: true,
      amenities: ['Climatisation', 'Parking', 'Sécurité']
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
      type: 'Villa',
      rating: 4.8,
      isNew: false,
      amenities: ['Jardin', 'Garage', 'Piscine', 'Sécurité']
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
      type: 'Studio',
      rating: 4.2,
      isNew: true,
      amenities: ['Meublé', 'Wifi', 'Climatisation']
    },
    {
      id: '4',
      title: 'Duplex avec terrasse',
      price: 580000,
      location: 'Calavi, Université',
      owner: 'Fatou Sossa',
      images: ['/placeholder.svg'],
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      type: 'Duplex',
      rating: 4.6,
      isNew: false,
      amenities: ['Terrasse', 'Parking', 'Proche université']
    }
  ];

  const filteredProperties = availableProperties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filters.type === 'tous' || property.type.toLowerCase() === filters.type;
    return matchesSearch && matchesType;
  });

  const recentActivities = [
    { type: 'new_property', message: 'Nouvelle villa disponible à Porto-Novo', time: '2h' },
    { type: 'price_update', message: 'Baisse de prix: Appartement Akpakpa (-50,000 CFA)', time: '4h' },
    { type: 'new_message', message: 'Nouveau message de Marie Adjovi', time: '6h' },
    { type: 'visit_scheduled', message: 'Visite programmée pour demain 14h', time: '8h' }
  ];

  const quickStats = [
    { 
      title: 'Propriétés Disponibles', 
      value: availableProperties.length, 
      icon: Home, 
      color: 'text-benin-green',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      change: '+3 cette semaine'
    },
    { 
      title: 'Prix Moyen', 
      value: '495K CFA', 
      icon: DollarSign, 
      color: 'text-benin-blue',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      change: '+2% ce mois'
    },
    { 
      title: 'Nouveautés', 
      value: '8', 
      icon: Calendar, 
      color: 'text-benin-yellow',
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
      change: 'Ajoutées cette semaine'
    },
    { 
      title: 'Villes Couvertes', 
      value: '12', 
      icon: MapPin, 
      color: 'text-benin-red',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      change: 'Dans tout le Bénin'
    }
  ];

  const popularLocations = [
    { name: 'Cotonou', count: 45, trend: '+15%' },
    { name: 'Porto-Novo', count: 28, trend: '+8%' },
    { name: 'Calavi', count: 22, trend: '+12%' },
    { name: 'Parakou', count: 18, trend: '+5%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* En-tête de bienvenue personnalisé */}
        <div className="mb-8 bg-gradient-to-r from-benin-green/10 to-benin-blue/10 rounded-2xl p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                Bienvenue, {user?.name} ! 🏠
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                Découvrez les meilleures offres de location au Bénin
              </p>
              <div className="flex items-center space-x-4 mt-4">
                <Badge variant="outline" className="text-benin-green border-benin-green">
                  ✨ Membre {user?.role}
                </Badge>
                <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Dernière connexion: Aujourd'hui</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-white dark:bg-gray-800 rounded-full p-6 shadow-lg">
                <TrendingUp className="w-12 h-12 text-benin-green" />
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques rapides améliorées */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-xs text-green-600">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Barre de recherche intelligente */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="w-5 h-5" />
                  <span>Recherche Intelligente</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Rechercher par lieu, type, prix... (ex: 'Appartement 3 pièces Cotonou moins de 500000')"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="text-lg h-12"
                    />
                  </div>
                  <Button className="bg-benin-green hover:bg-benin-green/90 h-12 px-8">
                    <Search className="w-4 h-4 mr-2" />
                    Rechercher
                  </Button>
                </div>
                
                {/* Filtres rapides améliorés */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { key: 'tous', label: 'Tous les types', count: availableProperties.length },
                    { key: 'appartement', label: 'Appartements', count: 2 },
                    { key: 'villa', label: 'Villas', count: 1 },
                    { key: 'studio', label: 'Studios', count: 1 },
                    { key: 'duplex', label: 'Duplex', count: 1 }
                  ].map((filter) => (
                    <Badge 
                      key={filter.key}
                      variant={filters.type === filter.key ? 'default' : 'secondary'}
                      className="cursor-pointer hover:shadow-md transition-shadow px-4 py-2"
                      onClick={() => setFilters({...filters, type: filter.key})}
                    >
                      {filter.label} ({filter.count})
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activités récentes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Activités Récentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.type === 'new_property' ? 'bg-green-500' :
                      activity.type === 'price_update' ? 'bg-blue-500' :
                      activity.type === 'new_message' ? 'bg-purple-500' : 'bg-orange-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500">Il y a {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Localités populaires */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Zones Populaires</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularLocations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                    <div>
                      <p className="font-medium text-sm">{location.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{location.count} offres</p>
                    </div>
                    <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                      {location.trend}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Liste des propriétés disponibles */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                Offres Disponibles ({filteredProperties.length})
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <div key={property.id} className="relative">
                  {property.isNew && (
                    <Badge className="absolute top-2 left-2 z-10 bg-green-500 text-white">
                      Nouveau
                    </Badge>
                  )}
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommandations personnalisées */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Recommandations pour vous</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Basé sur vos recherches</h4>
                <p className="text-sm text-blue-600 dark:text-blue-300">3 nouveaux appartements à Akpakpa correspondent à vos critères</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Prix attractifs</h4>
                <p className="text-sm text-green-600 dark:text-green-300">2 propriétés avec -15% sur le prix initial</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg">
                <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Tendances</h4>
                <p className="text-sm text-purple-600 dark:text-purple-300">Les villas à Calavi sont très demandées</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
