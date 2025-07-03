
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { User, Home, MessageSquare, Settings, Star, MapPin, Phone, Mail } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+229 XX XX XX XX',
    address: 'Cotonou, Bénin',
    bio: 'Passionné par l\'immobilier béninois'
  });

  const handleSave = () => {
    setIsEditing(false);
    // Logique de sauvegarde ici
  };

  const renderProprietaireContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="w-5 h-5" />
            <span>Mes Propriétés</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Propriétés Actives</div>
            </div>
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Propriétés Louées</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">4</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">En Attente</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenus Mensuels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">2,450,000 CFA</div>
          <p className="text-sm text-gray-600 dark:text-gray-400">+12% par rapport au mois dernier</p>
        </CardContent>
      </Card>
    </div>
  );

  const renderLocataireContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Home className="w-5 h-5" />
            <span>Mon Logement Actuel</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <img 
              src="/placeholder.svg" 
              alt="Logement" 
              className="w-20 h-20 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold">Appartement 3 pièces</h3>
              <p className="text-gray-600 dark:text-gray-400">Cotonou, Akpakpa</p>
              <p className="text-lg font-bold text-green-600">450,000 CFA/mois</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="w-5 h-5" />
            <span>Mes Favoris</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 dark:text-gray-400">
            <Star className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>5 propriétés sauvegardées</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDefaultContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Bienvenue sur e-lo Bénin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold mb-2">Complétez votre profil</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Choisissez votre rôle pour accéder aux fonctionnalités adaptées
            </p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-benin-green hover:bg-benin-green/90">
                Devenir Propriétaire
              </Button>
              <Button variant="outline">
                Je suis Locataire
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* En-tête du profil */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-r from-benin-green to-benin-blue rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <h1 className="text-2xl font-bold">{user?.name}</h1>
                    <Badge className="bg-benin-green text-white capitalize">
                      {user?.role}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Phone className="w-4 h-4" />
                      <span>{profileData.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profileData.address}</span>
                    </div>
                  </div>
                </div>
                <Button 
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <Settings className="w-4 h-4" />
                  <span>Modifier</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Contenu spécifique au rôle */}
          {user?.role === 'proprietaire' && renderProprietaireContent()}
          {user?.role === 'locataire' && renderLocataireContent()}
          {user?.role === 'aucun' && renderDefaultContent()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
