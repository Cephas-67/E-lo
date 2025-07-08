import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Home, Users, MessageSquare, TrendingUp, Plus, Search, Filter, Eye, Heart, MapPin, Calendar, Star } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import BackButton from '../components/BackButton';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOptions, setFilterOptions] = useState({
    location: '',
    priceRange: '',
    propertyType: '',
  });
  const [properties, setProperties] = useState([
    { id: 1, name: 'Appartement Vue Mer', location: 'Cotonou', price: 500000, type: 'Appartement' },
    { id: 2, name: 'Villa avec Piscine', location: 'Porto-Novo', price: 1200000, type: 'Villa' },
    { id: 3, name: 'Studio Moderne', location: 'Cotonou', price: 300000, type: 'Studio' },
  ]);
  const [analytics, setAnalytics] = useState({
    views: 1234,
    bookmarks: 456,
    messages: 78,
    trending: 12,
  });

  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Déconnexion réussie!",
        description: "Vous avez été déconnecté avec succès.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur de déconnexion",
        description: "Impossible de vous déconnecter pour le moment. Veuillez réessayer.",
      });
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOptions({ ...filterOptions, [e.target.name]: e.target.value });
  };

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    property.location.toLowerCase().includes(filterOptions.location.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <BackButton to="/" />
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Tableau de bord
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Bienvenue, {user?.name || 'Utilisateur'}! Voici un aperçu de votre activité.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>Vues</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {analytics.views}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nombre total de vues de vos propriétés
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>Favoris</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {analytics.bookmarks}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nombre de fois où vos propriétés ont été ajoutées aux favoris
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>Messages</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {analytics.messages}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nombre de nouveaux messages reçus
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <span>Tendances</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {analytics.trending}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Nombre de propriétés en tendance
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Properties List */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Vos propriétés
              </h2>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une propriété
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Rechercher une propriété..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>

              <Button variant="ghost">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
            </div>

            {/* Filter Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Localisation
                </label>
                <Input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Toutes les localisations"
                  value={filterOptions.location}
                  onChange={handleFilterChange}
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Gamme de prix
                </label>
                <Input
                  type="text"
                  id="priceRange"
                  name="priceRange"
                  placeholder="Tous les prix"
                  value={filterOptions.priceRange}
                  onChange={handleFilterChange}
                  className="mt-1"
                />
              </div>
            </div>

            {/* Properties List */}
            <div className="space-y-4">
              {filteredProperties.map(property => (
                <Card key={property.id}>
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      {property.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      Localisation: {property.location}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Prix: {property.price}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Type: {property.type}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Actions rapides
            </h2>
            <div className="space-y-4">
              <Button className="w-full" variant="secondary">
                <Home className="h-4 w-4 mr-2" />
                Ajouter une propriété
              </Button>
              <Button className="w-full" variant="secondary">
                <Users className="h-4 w-4 mr-2" />
                Gérer les utilisateurs
              </Button>
              <Button className="w-full" variant="secondary">
                <MessageSquare className="h-4 w-4 mr-2" />
                Consulter les messages
              </Button>
              <Button className="w-full" variant="secondary">
                <TrendingUp className="h-4 w-4 mr-2" />
                Voir les statistiques
              </Button>
              <Button className="w-full" onClick={handleLogout} variant="destructive">
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
